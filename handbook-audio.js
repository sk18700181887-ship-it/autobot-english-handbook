/**
 * Local English audio and a small, original call-and-response rhythm.
 * No sound starts before speak() or startChant() is called by the page.
 * Every action returns a promise and can be cancelled with stop().
 */
export function createHandbookAudio({ onState = () => {}, onBeat = () => {}, onLine = () => {}, onError = () => {} } = {}) {
  const scope = typeof window !== 'undefined' ? window : globalThis;
  const synthesis = scope.speechSynthesis;
  const AudioContext = scope.AudioContext || scope.webkitAudioContext;
  const canSpeak = Boolean(synthesis && scope.SpeechSynthesisUtterance);
  const canPlay = typeof scope.Audio === 'function';
  const normalize = (text) => String(text || '').toLowerCase().replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();
  let currentState = 'idle';
  let generation = 0;
  let current = null;
  let disposed = false;
  let context = null;
  let master = null;
  let localClips = 0;

  function notify(callback, value) {
    try { callback(value); } catch (error) { console.error('Handbook audio callback failed.', error); }
  }

  function setState(state, message) {
    currentState = state;
    if (!disposed) notify(onState, { state, message });
  }

  async function readManifest(relative) {
    const base = new URL(relative, import.meta.url);
    const controller = typeof scope.AbortController === 'function' ? new scope.AbortController() : null;
    let timer;
    try {
      const request = Promise.resolve().then(async () => {
        const response = await scope.fetch(new URL('manifest.json', base), controller ? { signal: controller.signal } : {});
        if (!response.ok) return new Map();
        const data = await response.json();
        return new Map(Object.entries(data).filter(([, file]) => typeof file === 'string'
          && /^[a-zA-Z0-9_-]+\.(mp3|wav|ogg|m4a)$/i.test(file))
          .map(([text, file]) => [normalize(text), new URL(file, base).href]));
      });
      const timeout = new Promise((resolve) => {
        timer = scope.setTimeout(() => { controller?.abort(); resolve(new Map()); }, 4000);
      });
      return await Promise.race([request, timeout]);
    } catch { return new Map(); }
    finally { scope.clearTimeout(timer); }
  }

  // Optional handbook recordings override the reusable course recordings.
  const manifestPromise = Promise.all(['./audio/', './robot-lab-audio/', './handbook-audio/'].map(readManifest))
    .then((manifests) => {
      const manifest = new Map();
      for (const source of manifests) for (const [text, url] of source) manifest.set(text, url);
      localClips = manifest.size;
      return manifest;
    });

  function valid(run) { return !disposed && current === run && run.token === generation && !run.done; }

  function finish(run, result) {
    if (run.done) return;
    run.done = true;
    for (const cleanup of [...run.cleanups]) {
      try { cleanup(); } catch { /* A stopped browser audio node can already be closed. */ }
    }
    run.cleanups.clear();
    if (current === run) current = null;
    run.resolve(result);
  }

  function begin(kind) {
    generation += 1;
    if (current) finish(current, { status: 'cancelled' });
    let resolve;
    const run = { token: generation, kind, done: false, cleanups: new Set(), promise: new Promise((done) => { resolve = done; }), resolve };
    current = run;
    return run;
  }

  function fail(run, code, message) {
    if (!valid(run)) return;
    finish(run, { status: 'error', code });
    if (!disposed && run.token === generation) {
      setState('idle', message);
      notify(onError, { code, message });
    }
  }

  function completed(run, message) {
    if (!valid(run)) return;
    finish(run, { status: 'ended' });
    if (!disposed && run.token === generation) setState('idle', message);
  }

  function wait(run, duration) {
    return new Promise((resolve) => {
      let timer;
      const done = () => { scope.clearTimeout(timer); run.cleanups.delete(done); resolve(); };
      run.cleanups.add(done);
      timer = scope.setTimeout(done, duration);
    });
  }

  async function playLocal(run, url, slow) {
    return new Promise((resolve) => {
      const audio = new scope.Audio(url);
      let loadTimer, endTimer;
      let settled = false;
      const done = (status) => {
        if (settled) return;
        settled = true;
        scope.clearTimeout(loadTimer);
        scope.clearTimeout(endTimer);
        audio.onplaying = audio.onended = audio.onerror = null;
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
        run.cleanups.delete(cancel);
        resolve({ status, source: 'local' });
      };
      const cancel = () => done('cancelled');
      run.cleanups.add(cancel);
      audio.preload = 'auto';
      audio.playbackRate = slow ? 0.78 : 1;
      audio.preservesPitch = true;
      audio.volume = 0.95;
      audio.onplaying = () => {
        scope.clearTimeout(loadTimer);
        const duration = Number.isFinite(audio.duration) ? audio.duration / audio.playbackRate : 30;
        endTimer = scope.setTimeout(() => done('fallback'), Math.min(90000, Math.max(15000, (duration + 5) * 1000)));
      };
      audio.onended = () => done('ended');
      audio.onerror = () => done('fallback');
      loadTimer = scope.setTimeout(() => done('fallback'), 6500);
      try { Promise.resolve(audio.play()).catch(() => done('fallback')); }
      catch { done('fallback'); }
    });
  }

  function pickEnglishVoice() {
    try {
      const voices = synthesis.getVoices().filter((voice) => /^en([_-]|$)/i.test(voice.lang));
      return voices.find((voice) => voice.localService && /^en[-_]US$/i.test(voice.lang))
        || voices.find((voice) => voice.localService) || voices[0] || null;
    } catch { return null; }
  }

  async function playSynthesis(run, text, slow) {
    if (!canSpeak) return { status: 'error', code: 'speech-unavailable' };
    let voice = pickEnglishVoice();
    if (!voice) {
      voice = await new Promise((resolve) => {
        let timer;
        let settled = false;
        const done = (value) => {
          if (settled) return;
          settled = true;
          scope.clearTimeout(timer);
          synthesis.removeEventListener?.('voiceschanged', changed);
          run.cleanups.delete(cancel);
          resolve(value);
        };
        const cancel = () => done(null);
        const changed = () => { const available = pickEnglishVoice(); if (available) done(available); };
        run.cleanups.add(cancel);
        synthesis.addEventListener?.('voiceschanged', changed);
        timer = scope.setTimeout(() => done(pickEnglishVoice()), 1200);
      });
    }
    if (!valid(run)) return { status: 'cancelled' };
    if (!voice) return { status: 'error', code: 'english-voice-unavailable' };
    return new Promise((resolve) => {
      const utterance = new scope.SpeechSynthesisUtterance(text);
      let startTimer, endTimer;
      let settled = false;
      const done = (status, code) => {
        if (settled) return;
        settled = true;
        scope.clearTimeout(startTimer);
        scope.clearTimeout(endTimer);
        utterance.onstart = utterance.onend = utterance.onerror = null;
        if (status !== 'ended') synthesis.cancel();
        run.cleanups.delete(cancel);
        resolve({ status, code, source: 'synthesis' });
      };
      const cancel = () => done('cancelled');
      run.cleanups.add(cancel);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.rate = slow ? 0.72 : 0.88;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onstart = () => {
        scope.clearTimeout(startTimer);
        endTimer = scope.setTimeout(() => done('error', 'speech-timeout'), Math.min(90000, Math.max(15000, text.length * 180 + 5000)));
      };
      utterance.onend = () => done('ended');
      utterance.onerror = (event) => done('error', event.error || 'speech-failed');
      startTimer = scope.setTimeout(() => done('error', 'speech-timeout'), 6500);
      try { synthesis.speak(utterance); synthesis.resume(); }
      catch { done('error', 'speech-failed'); }
    });
  }

  async function playPhrase(run, text, { slow = false } = {}) {
    const manifest = await manifestPromise;
    if (!valid(run)) return { status: 'cancelled' };
    const url = manifest.get(normalize(text));
    if (url && canPlay) {
      const result = await playLocal(run, url, slow);
      if (!valid(run) || result.status !== 'fallback') return result;
    }
    if (!valid(run)) return { status: 'cancelled' };
    return playSynthesis(run, text, slow);
  }

  const speechError = '这台设备暂时无法播放英语读音，请检查声音，或在有英语语音的 Chrome / Edge 中打开；也可以由家长带读。';

  function speak(text, { slow = false } = {}) {
    if (disposed) return Promise.resolve({ status: 'disposed' });
    const phrase = String(text || '').trim();
    if (!phrase) return Promise.resolve({ status: 'empty' });
    const run = begin('speak');
    setState('speaking', slow ? '慢慢听，再跟着说。' : '先听一听，再跟着说。');
    void (async () => {
      const result = await playPhrase(run, phrase, { slow });
      if (!valid(run)) return;
      if (result.status === 'ended') completed(run, '轮到你啦，开口说一遍。');
      else fail(run, result.code || 'speech-failed', speechError);
    })().catch(() => fail(run, 'speech-failed', speechError));
    return run.promise;
  }

  function ensureContext() {
    if (!context) {
      context = new AudioContext();
      master = context.createGain();
      master.gain.value = 0.085;
      master.connect(context.destination);
    }
    return context.resume();
  }

  function tone(run, { frequency, duration, volume, type = 'sine', endFrequency = frequency }) {
    if (!valid(run) || !context || context.state !== 'running') return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), now + duration);
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(volume, now + 0.006);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(envelope);
    envelope.connect(master);
    const cancel = () => {
      try { oscillator.stop(); } catch { /* An ended oscillator is already stopped. */ }
      oscillator.disconnect(); envelope.disconnect();
      run.cleanups.delete(cancel);
    };
    run.cleanups.add(cancel);
    oscillator.onended = cancel;
    oscillator.start(now);
    oscillator.stop(now + duration + 0.015);
  }

  function playBeat(run, beat, phase, lineIndex) {
    // A soft kick, wooden tick and four-note pentatonic motif. Voice stays in front.
    const level = phase === 'listen' ? 0.38 : 0.72;
    if (beat === 0 || beat === 2) tone(run, { frequency: 120, endFrequency: 48, duration: 0.16, volume: level * 0.6 });
    else tone(run, { frequency: 650, endFrequency: 320, duration: 0.055, volume: level * 0.16, type: 'triangle' });
    tone(run, { frequency: 1500, endFrequency: 900, duration: 0.027, volume: level * 0.055 });
    if (phase === 'echo') {
      const notes = [329.63, 392, 440, 523.25];
      tone(run, { frequency: notes[(beat + lineIndex) % notes.length], duration: 0.2, volume: 0.12, type: 'triangle' });
    }
  }

  async function bar(run, { bpm, barIndex, phase, lineIndex }) {
    const beatMs = 60000 / bpm;
    const now = () => scope.performance?.now() ?? Date.now();
    const started = now();
    for (let beat = 0; beat < 4; beat += 1) {
      if (!valid(run)) return;
      playBeat(run, beat, phase, lineIndex);
      notify(onBeat, { beat, bar: barIndex, phase, lineIndex });
      if (!valid(run)) return;
      // Measure against the bar's start so callback work does not accumulate drift.
      await wait(run, Math.max(0, started + (beat + 1) * beatMs - now()));
    }
  }

  function startChant({ lines = [], bpm = 84 } = {}) {
    if (disposed) return Promise.resolve({ status: 'disposed' });
    const phrases = lines.map((line) => typeof line === 'string' ? { en: line, zh: '' } : { ...line, en: String(line?.en || '').trim() })
      .filter((line) => line.en);
    if (!phrases.length) return Promise.resolve({ status: 'empty' });
    const run = begin('chant');
    const tempo = Math.max(72, Math.min(96, Number(bpm) || 84));
    setState('chanting', '跟着四拍走：先听伙伴说，再轮到你。');
    if (!AudioContext) {
      fail(run, 'rhythm-unavailable', '当前浏览器无法播放节奏伴奏，可以点击单词听读。');
      return run.promise;
    }
    // Resume in the click handler, before waiting for manifests or voices.
    let resume;
    try { resume = ensureContext(); }
    catch { fail(run, 'rhythm-unavailable', '节奏没有启动，请检查设备声音后再试。'); return run.promise; }
    void (async () => {
      await resume;
      if (!valid(run)) return;
      if (context.state !== 'running') { fail(run, 'rhythm-unavailable', '请再点一次节奏按钮，允许浏览器播放声音。'); return; }
      for (let index = 0; index < phrases.length; index += 1) {
        if (!valid(run)) return;
        const line = phrases[index];
        notify(onLine, { index, line, phase: 'listen' });
        if (!valid(run)) return;
        setState('chanting', `先听第 ${index + 1} 句，轻轻拍拍手。`);
        const [speech] = await Promise.all([
          playPhrase(run, line.en, { slow: true }),
          bar(run, { bpm: tempo, barIndex: index * 2, phase: 'listen', lineIndex: index }),
        ]);
        if (!valid(run)) return;
        if (speech.status !== 'ended') { fail(run, speech.code || 'speech-failed', speechError); return; }
        // The echo bar begins only when the real recording / utterance has ended.
        notify(onLine, { index, line, phase: 'echo' });
        if (!valid(run)) return;
        setState('chanting', `轮到你说第 ${index + 1} 句，跟着四拍说一遍。`);
        await bar(run, { bpm: tempo, barIndex: index * 2 + 1, phase: 'echo', lineIndex: index });
      }
      completed(run, '这一轮完成啦！和伙伴击个掌。');
    })().catch(() => fail(run, 'rhythm-failed', '声音暂时没有播放出来，请检查设备音量后再点一次。'));
    return run.promise;
  }

  function stop() {
    if (disposed) return;
    generation += 1;
    if (current) finish(current, { status: 'cancelled' });
    setState('idle', '已暂停，准备好了再继续。');
  }

  const hidden = () => { if (scope.document?.hidden) stop(); };
  const leave = () => stop();
  scope.document?.addEventListener('visibilitychange', hidden);
  scope.addEventListener?.('pagehide', leave);

  function dispose() {
    if (disposed) return;
    stop();
    disposed = true;
    scope.document?.removeEventListener('visibilitychange', hidden);
    scope.removeEventListener?.('pagehide', leave);
    if (context) void context.close().catch(() => {});
    context = master = null;
  }

  return Object.freeze({
    speak, startChant, stop, dispose,
    get state() { return currentState; },
    get available() { return Object.freeze({ speech: canPlay || canSpeak, rhythm: Boolean(AudioContext), localClips }); },
  });
}
