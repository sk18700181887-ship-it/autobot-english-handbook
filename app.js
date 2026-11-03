import { missions } from './curriculum.js';
import { assessAnswer, normalize } from './answer-engine.js';

const $ = selector => document.querySelector(selector);
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icon = id => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const characters = [
  { id: 'bumblebee', name: '大黄蜂', en: 'Bumblebee', note: '你的活力口语搭档', color: '#ffd34e', portrait: '#f4dda0', pitch: 1.12 },
  { id: 'optimus', name: '擎天柱', en: 'Optimus Prime', note: '勇敢开口，队长陪着你', color: '#95d5e5', portrait: '#c3d9df', pitch: .83 },
  { id: 'jazz', name: '爵士', en: 'Jazz', note: '轻松聊聊，一起找点乐趣', color: '#bbdfc6', portrait: '#d0e0d2', pitch: 1.02 },
  { id: 'ironhide', name: '铁皮', en: 'Ironhide', note: '稳稳练习，一起完成任务', color: '#f7ad8f', portrait: '#e5d0c2', pitch: .88 },
];
const storageKey = 'autobot-speaking-club-v1';
const defaults = { mission: missions[0].id, character: 'bumblebee', completed: [], days: {}, counts: { total: 0, voice: 0, choice: 0, typed: 0 }, settings: { auto: true, chinese: true, choices: true, rate: .9 } };
let persistenceWarning = false;
function readProgress() {
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey));
    if (!raw || typeof raw !== 'object') return structuredClone(defaults);
    const result = structuredClone(defaults);
    if (missions.some(m => m.id === raw.mission)) result.mission = raw.mission;
    if (characters.some(c => c.id === raw.character)) result.character = raw.character;
    if (Array.isArray(raw.completed)) result.completed = [...new Set(raw.completed.filter(id => missions.some(m => m.id === id)))];
    for (const [key, count] of Object.entries(raw.days || {})) if (/^\d{4}-\d{2}-\d{2}$/.test(key) && Number.isSafeInteger(count) && count >= 0) result.days[key] = count;
    for (const key of Object.keys(result.counts)) if (Number.isSafeInteger(raw.counts?.[key]) && raw.counts[key] >= 0) result.counts[key] = raw.counts[key];
    for (const key of ['auto', 'chinese', 'choices']) if (typeof raw.settings?.[key] === 'boolean') result.settings[key] = raw.settings[key];
    if ([.75, .9, 1].includes(raw.settings?.rate)) result.settings.rate = raw.settings.rate;
    return result;
  } catch { return structuredClone(defaults); }
}
const progress = readProgress();
let mission = missions.find(m => m.id === progress.mission);
let character = characters.find(c => c.id === progress.character);
let phase = 'idle';
let roundIndex = 0;
let childName = '';
let history = [];
let lastAnswer = '';
let recognition = null;
let recognitionToken = 0;
let micTimer = null;
let speechToken = 0;
let speechTimer = null;
let activeAudio = null;
let toastTimer = null;
let voices = [];
const synthesis = window.speechSynthesis;
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let audioManifest = {};
const audioReady = fetch('./audio/manifest.json').then(response => response.ok ? response.json() : {}).then(value => { audioManifest = value; }).catch(() => {});

function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function saveProgress() {
  try { localStorage.setItem(storageKey, JSON.stringify(progress)); }
  catch {
    if (!persistenceWarning) { persistenceWarning = true; toast('浏览器暂时无法保存进度，本次仍可继续练习。'); }
  }
}
function toast(message) {
  clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 5000);
}
function template(value, chinese = false) {
  return String(value).replaceAll('{character}', chinese ? character.name : character.en).replaceAll('{name}', childName || (chinese ? '小伙伴' : 'partner')).replaceAll('{answer}', lastAnswer);
}
function recordingText(value) {
  return String(value).replaceAll('{character}', character.en).replaceAll('{name}', 'partner').replaceAll('{answer}', lastAnswer);
}
function currentRound() { return mission.rounds[roundIndex]; }
function renderNavigation() {
  const titles = ['认识汽车人', '和汽车人一起生活', '一起出任务'];
  const html = [1, 2, 3].map(stage => `<div class="nav-stage">0${stage} / ${titles[stage - 1]}</div>${missions.filter(m => m.stage === stage).map(m => {
    const done = progress.completed.includes(m.id);
    return `<button class="mission-link ${m.id === mission.id ? 'active' : ''} ${done ? 'completed' : ''}" data-mission="${m.id}" ${m.id === mission.id ? 'aria-current="step"' : ''}><span class="mission-index">${done ? '✓' : String(m.week).padStart(2, '0')}</span><span><span class="mission-name">${m.title}</span><span class="mission-english">${m.englishTitle}</span></span>${done ? '<span class="mission-check" aria-label="已完成">✦</span>' : ''}</button>`;
  }).join('')}`).join('');
  $('#mission-nav').innerHTML = html; $('#mobile-mission-nav').innerHTML = html;
  $('#map-count').textContent = `${progress.completed.length} / 12`;
  $('#today-count').textContent = progress.days[today()] || 0;
}
function renderPartners() {
  $('#partners').innerHTML = characters.map(c => `<button class="partner-option" data-character="${c.id}" aria-label="${c.name}" aria-pressed="${c.id === character.id}" style="--portrait-bg:${c.portrait}"><span class="partner-portrait"><img src="./assets/${c.id}.png" alt="" width="1024" height="1536"></span><span><b>${c.name}</b><small>${c.en.toUpperCase()}</small></span><span class="partner-selected" aria-hidden="true"></span></button>`).join('');
  $('#partner-en').textContent = character.en.toUpperCase(); $('#partner-name').textContent = character.name;
  $('#partner-note').textContent = character.note; $('#hero-image').src = `./assets/${character.id}.png`; $('#hero-image').alt = character.name;
  $('#character-stage').style.setProperty('--accent', character.color);
  $('#start span').textContent = `和${character.name}开始`;
  $('#robot-lab-entry').href = `./robot-lab.html?character=${character.id === 'optimus' ? 'optimus' : 'bumblebee'}`;
  $('#greeting').textContent = `Hello, friend!`;
}
const sceneColors = ['#b8a65d', '#4eb6be', '#8ba9d2', '#b0b59a', '#d2aa76', '#83c7b9', '#b2b67c', '#98a7cb', '#a3b9ae', '#6f9fb4', '#caac8b', '#d2b35f'];
function renderMission() {
  $('#mission-pill').textContent = `${String(mission.week).padStart(2, '0')} · ${mission.title}`;
  $('#stage-number').textContent = `MISSION ${String(mission.week).padStart(2, '0')}`;
  $('#scene-icon').textContent = mission.icon; $('#scene-title').textContent = mission.title;
  $('#character-stage').style.setProperty('--scene-glow', sceneColors[mission.week - 1]);
  $('#mission-intro').textContent = mission.intro;
  $('#character-stage').setAttribute('aria-label', `${character.name} · ${mission.scene}`);
  $('#power-words').innerHTML = mission.words.map(w => `<button class="word-button" data-word="${esc(w.en)}" aria-label="听单词 ${esc(w.en)}，${esc(w.zh)}"><b>${esc(w.en)}</b><span>${esc(w.zh)}</span></button>`).join('');
  renderNavigation();
}
function renderSettings() {
  document.body.classList.toggle('no-chinese', !progress.settings.chinese);
  document.body.classList.toggle('no-choices', !progress.settings.choices);
  for (const key of ['auto', 'chinese', 'choices']) $(`#setting-${key}`).checked = progress.settings[key];
  $('#setting-rate').value = String(progress.settings.rate);
}
function setPhase(newPhase) {
  phase = newPhase;
  $('#welcome').hidden = phase !== 'idle';
  $('#exercise').hidden = !['asking', 'feedback'].includes(phase);
  $('#completion').hidden = phase !== 'complete';
  $('#answer-area').hidden = phase !== 'asking'; $('#feedback').hidden = phase !== 'feedback';
  $('#restart').hidden = phase === 'idle';
  updateCharacterStatus();
}
function updateCharacterStatus(speaking = false) {
  $('#character-stage').classList.toggle('speaking', speaking);
  $('#partner-state').textContent = speaking ? `${character.name}正在说话` : recognition ? '正在听你说话' : phase === 'idle' ? '等待你的呼叫' : phase === 'complete' ? '任务完成，击个掌吧' : phase === 'feedback' ? '听到你的想法啦' : '轮到你啦，慢慢说';
  $('#global-stop').hidden = !speaking; $('#stop-speech').hidden = !speaking;
}
function stopSpeech() {
  speechToken++; clearTimeout(speechTimer); synthesis?.cancel();
  if (activeAudio) { const audio = activeAudio; activeAudio = null; audio.onplaying = audio.onended = audio.onerror = null; audio.pause(); audio.removeAttribute('src'); audio.load(); }
  updateCharacterStatus();
}
function refreshVoices() { voices = synthesis?.getVoices() || []; }
async function speak(text, slow = false, assetText = text) {
  stopRecognition(); stopSpeech();
  const token = speechToken;
  await audioReady;
  if (token !== speechToken) return;
  let usedFallback = false;
  const playNative = () => {
    if (token !== speechToken || usedFallback) return;
    usedFallback = true;
    refreshVoices();
    const englishVoices = voices.filter(v => /^en[-_]/i.test(v.lang));
    const voice = englishVoices.find(v => /en[-_]US/i.test(v.lang)) || englishVoices[0];
    if (!synthesis || !window.SpeechSynthesisUtterance || !voice) { updateCharacterStatus(); toast('这句暂时不能朗读，可以听题目和示范，再继续回答。'); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; utterance.voice = voice;
    utterance.rate = slow ? .65 : progress.settings.rate; utterance.pitch = character.pitch;
    utterance.onstart = () => { if (token === speechToken) { clearTimeout(speechTimer); updateCharacterStatus(true); } };
    utterance.onend = () => { if (token === speechToken) updateCharacterStatus(); };
    utterance.onerror = event => {
      if (token !== speechToken) return;
      clearTimeout(speechTimer); updateCharacterStatus();
      if (!['canceled', 'interrupted'].includes(event.error)) toast('这次朗读没有播放成功，可以再点“再听一遍”。');
    };
    try {
      synthesis.speak(utterance);
      speechTimer = setTimeout(() => {
        if (token === speechToken && !synthesis.speaking) { stopSpeech(); toast('设备语音还未就绪，可以再点一次朗读，或先继续回答。'); }
      }, 5000);
    } catch { updateCharacterStatus(); toast('朗读暂时不可用，可以继续回答。'); }
  };
  const file = audioManifest[assetText];
  if (!file) { playNative(); return; }
  const audio = new Audio(`./audio/${file}`); activeAudio = audio;
  audio.playbackRate = slow ? .78 : progress.settings.rate / .9;
  audio.preservesPitch = true;
  audio.onplaying = () => { if (token === speechToken) updateCharacterStatus(true); };
  audio.onended = () => { if (token === speechToken) { activeAudio = null; updateCharacterStatus(); } };
  audio.onerror = () => { if (token === speechToken) { activeAudio = null; playNative(); } };
  try { await audio.play(); }
  catch (error) {
    if (token !== speechToken || usedFallback) return;
    activeAudio = null; updateCharacterStatus();
    if (error.name === 'NotAllowedError') toast('点一下“再听一遍”，就能听伙伴说话啦。');
    else if (error.name !== 'AbortError') playNative();
  }
}
function voiceStatus(text) { $('#voice-status').textContent = text; }
function stopRecognition() {
  recognitionToken++; clearTimeout(micTimer);
  const old = recognition; recognition = null;
  if (old) { old.onresult = old.onerror = old.onend = old.onstart = null; try { old.abort(); } catch { /* Already stopped. */ } }
  $('#mic').classList.remove('listening'); $('#mic-label').textContent = Recognition ? '点一下，开口说' : '用英文打字回答';
  $('#mic').setAttribute('aria-pressed', 'false'); updateCharacterStatus();
}
function micError(code) {
  const messages = {
    'not-allowed': '麦克风没有获准使用。请在浏览器地址栏允许权限，或用点选、打字回答。',
    'service-not-allowed': '浏览器暂时无法使用语音服务，先用点选或打字回答吧。',
    'audio-capture': '没有找到可用的麦克风，先用点选或打字回答吧。',
    'network': '语音服务暂时连不上，先用点选或打字回答吧。',
    'no-speech': '这次还没听到声音。再试一次，或选一句回答都可以。',
    'language-not-supported': '浏览器暂不支持英语识别，请用点选或打字回答。',
    'aborted': '已停止聆听，可以再试一次。',
  };
  return messages[code] || '这次没有听清，可以再试一次，或选一句、打字回答。';
}
function toggleMicrophone() {
  if (phase !== 'asking') return;
  if (recognition) { const old = recognition; try { old.stop(); } catch { stopRecognition(); } voiceStatus('正在整理你说的话…'); return; }
  if (!Recognition) { voiceStatus('这个浏览器暂不支持语音识别，可以点选或打字回答。'); $('#answer-input').focus(); return; }
  stopSpeech(); stopRecognition(); $('#answer-error').hidden = true;
  const token = recognitionToken;
  const capturedRound = currentRound().id;
  const instance = new Recognition(); recognition = instance;
  instance.lang = 'en-US'; instance.interimResults = true; instance.continuous = false; instance.maxAlternatives = 1;
  let received = false; let hadError = false;
  const isCurrent = () => recognitionToken === token && phase === 'asking' && currentRound().id === capturedRound;
  instance.onstart = () => {
    if (!isCurrent()) return;
    $('#mic').classList.add('listening'); $('#mic-label').textContent = '正在听，点此结束'; $('#mic').setAttribute('aria-pressed', 'true');
    voiceStatus('轮到你说啦，我在听…'); updateCharacterStatus();
  };
  instance.onresult = event => {
    if (!isCurrent()) return;
    let interim = ''; let final = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) final += event.results[i][0].transcript;
      else interim += event.results[i][0].transcript;
    }
    if (interim) voiceStatus(`听到：“${interim}”…`);
    if (final.trim()) { received = true; $('#answer-input').value = final.trim(); stopRecognition(); submitAnswer(final, 'voice'); }
  };
  instance.onerror = event => {
    if (!isCurrent()) return;
    hadError = true; stopRecognition(); voiceStatus(micError(event.error));
  };
  instance.onend = () => {
    if (!isCurrent()) return;
    stopRecognition(); if (!received && !hadError) voiceStatus(micError('no-speech'));
  };
  voiceStatus('正在打开麦克风，请允许浏览器使用麦克风…');
  try {
    instance.start();
    micTimer = setTimeout(() => { if (isCurrent()) { stopRecognition(); voiceStatus('这次聆听结束了，可以再试一次，或点选、打字回答。'); } }, 18000);
  } catch { stopRecognition(); voiceStatus('麦克风暂时无法启动，请用点选或打字回答。'); }
}
function renderRound() {
  const round = currentRound();
  $('#round-label').textContent = `对话 ${roundIndex + 1} / ${mission.rounds.length}`;
  $('#round-dots').innerHTML = mission.rounds.map((_, index) => `<i class="${index < roundIndex ? 'done' : index === roundIndex ? 'current' : ''}"></i>`).join('');
  $('#speaker-label').textContent = `${character.en.toUpperCase()} SAYS`;
  $('#prompt').textContent = template(round.prompt); $('#prompt-zh').textContent = template(round.zh, true);
  $('#hint').textContent = template(round.hint, true);
  $('#answer-choices').innerHTML = round.choices.map((choice, index) => `<button class="answer-choice" data-choice="${index}">${esc(template(choice))}</button>`).join('');
  $('#answer-input').value = ''; $('#answer-error').hidden = true;
  $('#answer-input').placeholder = round.kind === 'name' ? '输入英文昵称就好，例如 Alex…' : '也可以在这里输入英文…';
  $('#turn-label').textContent = '听一听，再回答';
  voiceStatus(Recognition ? '也可以选一句，或在下面打字回答。' : '这个浏览器暂不支持语音识别，可以点选或打字回答。');
  $('#mic-label').textContent = Recognition ? '点一下，开口说' : '用英文打字回答';
}
function askRound() {
  stopRecognition(); stopSpeech(); setPhase('asking'); renderRound();
  history.push({ role: character.name, text: template(currentRound().prompt), assetText: recordingText(currentRound().prompt) });
  if (progress.settings.auto) speak(template(currentRound().prompt), false, recordingText(currentRound().prompt));
}
function startMission() {
  stopRecognition(); stopSpeech(); roundIndex = 0; history = []; lastAnswer = '';
  renderMission(); askRound();
}
function submitAnswer(text, mode) {
  if (phase !== 'asking') return;
  stopRecognition(); stopSpeech();
  const round = currentRound(); const result = assessAnswer(round, text);
  if (!result.accepted) {
    $('#answer-error').textContent = result.reason; $('#answer-error').hidden = false;
    $('#turn-label').textContent = '慢慢来，再试试';
    voiceStatus(mode === 'voice' ? `刚刚听到：“${result.answer || text}”。也可以修改下方文字后发送。` : '跟着提示试试，选一句回答也可以。');
    return;
  }
  if (result.name) childName = result.name;
  lastAnswer = result.answer;
  progress.counts.total++; progress.counts[mode]++;
  const key = today(); progress.days[key] = (progress.days[key] || 0) + 1;
  const dates = Object.keys(progress.days).sort(); dates.slice(0, Math.max(0, dates.length - 90)).forEach(date => delete progress.days[date]);
  saveProgress(); renderNavigation();
  history.push({ role: '你', text: result.answer });
  const reply = template(round.followup); const replyZh = template(round.followupZh, true);
  history.push({ role: character.name, text: reply, assetText: recordingText(round.followup) });
  $('#child-answer').textContent = result.answer;
  $('#answer-mode').textContent = ({ voice: '语音回答', typed: '文字回答', choice: '点选回答 · 也可以再跟着读一遍' })[mode];
  $('#feedback-en').textContent = reply; $('#feedback-zh').textContent = replyZh;
  $('#next span').textContent = roundIndex === mission.rounds.length - 1 ? '领取任务徽章' : '下一句';
  $('#turn-label').textContent = '听到你的想法啦';
  updateSceneFromAnswer(result.answer); setPhase('feedback');
  if (progress.settings.auto) speak(reply, false, recordingText(round.followup));
}
function updateSceneFromAnswer(answer) {
  const colorMap = { red: '#df785f', blue: '#68a8d6', yellow: '#d8b94f', green: '#64b89b', black: '#6c8d99', white: '#b7d4cf', silver: '#acc8d8', orange: '#df9d63', purple: '#a295c5', pink: '#d89baa' };
  if (mission.id === 'colors') {
    const clauses = answer.split(/[,.!?;\n]+|\b(?:but|however|instead)\b/i).map(normalize).filter(clause => !/\b(?:not|no|never|without|neither|nor)\b/.test(clause));
    const chosen = Object.entries(colorMap).find(([word]) => clauses.some(clause => (` ${clause} `).includes(` ${word} `)));
    if (chosen) $('#character-stage').style.setProperty('--scene-glow', chosen[1]);
  }
  if (mission.id === 'numbers') $('#scene-icon').textContent = '⭐';
}
function finishMission() {
  stopRecognition(); stopSpeech();
  if (!progress.completed.includes(mission.id)) progress.completed.push(mission.id);
  saveProgress(); renderNavigation(); setPhase('complete');
  $('#completion-description').textContent = `你和${character.name}完成了 ${mission.rounds.length} 轮互动。“${mission.title}”徽章已点亮！`;
  $('#earned-words').innerHTML = mission.words.slice(0, 6).map(word => `<span>${esc(word.en)}</span>`).join('');
  const finalMission = mission.week === missions.length;
  $('#next-mission').innerHTML = `${finalMission ? '回到第一个任务' : '继续下一个任务'} ${icon('arrow')}`;
  if (progress.settings.auto) speak('Mission complete! High five, partner!');
}
function chooseMission(id, start = false) {
  const nextMission = missions.find(m => m.id === id); if (!nextMission) return;
  stopRecognition(); stopSpeech(); mission = nextMission; progress.mission = id; saveProgress();
  roundIndex = 0; history = []; lastAnswer = ''; renderMission(); setPhase('idle');
  if ($('#map-dialog').open) $('#map-dialog').close();
  if (start) startMission();
}
function chooseCharacter(id) {
  const nextCharacter = characters.find(c => c.id === id); if (!nextCharacter || id === character.id) return;
  stopRecognition(); stopSpeech(); character = nextCharacter; progress.character = id; saveProgress(); renderPartners();
  $('#character-stage').setAttribute('aria-label', `${character.name} · ${mission.scene}`);
  if (phase === 'asking') {
    renderRound();
    // The last entry is the current unanswered prompt. Keep it aligned with the new companion.
    if (history.length) history[history.length - 1] = { role: character.name, text: template(currentRound().prompt), assetText: recordingText(currentRound().prompt) };
    if (progress.settings.auto) speak(template(currentRound().prompt), false, recordingText(currentRound().prompt));
  }
  if (phase === 'complete') $('#completion-description').textContent = `“${mission.title}”徽章已点亮。也可以和${character.name}重新聊一遍！`;
}
function openDialog(id) {
  const wasListening = Boolean(recognition); stopRecognition(); stopSpeech();
  if (wasListening) voiceStatus('聆听已暂停，关掉窗口后可以再点麦克风。');
  $(id).showModal();
}
function renderHistory() {
  const box = $('#history-list'); box.replaceChildren();
  if (!history.length) { const p = document.createElement('p'); p.className = 'dialog-intro'; p.textContent = '还没有开始对话。呼叫伙伴，聊上第一句吧！'; box.append(p); return; }
  history.forEach((entry, index) => {
    const item = document.createElement('div'); item.className = `history-item ${entry.role === '你' ? 'user' : ''}`;
    const role = document.createElement('span'); role.className = 'history-role'; role.textContent = entry.role;
    const text = document.createElement('p'); text.textContent = entry.text;
    item.append(role, text);
    if (entry.role !== '你') { const play = document.createElement('button'); play.className = 'text-button'; play.textContent = '听一听 ↗'; play.dataset.history = String(index); item.append(play); }
    box.append(item);
  });
}

$('#start').addEventListener('click', startMission);
$('#restart').addEventListener('click', startMission);
$('#practice-again').addEventListener('click', startMission);
$('#next').addEventListener('click', () => { if (phase !== 'feedback') return; if (roundIndex + 1 === mission.rounds.length) finishMission(); else { roundIndex++; askRound(); } });
$('#next-mission').addEventListener('click', () => chooseMission(missions[mission.week % missions.length].id, true));
$('#partners').addEventListener('click', event => { const button = event.target.closest('[data-character]'); if (button) chooseCharacter(button.dataset.character); });
for (const nav of ['#mission-nav', '#mobile-mission-nav']) $(nav).addEventListener('click', event => { const button = event.target.closest('[data-mission]'); if (button) chooseMission(button.dataset.mission); });
$('#answer-choices').addEventListener('click', event => { const button = event.target.closest('[data-choice]'); if (button) submitAnswer(template(currentRound().choices[Number(button.dataset.choice)]), 'choice'); });
$('#answer-form').addEventListener('submit', event => { event.preventDefault(); submitAnswer($('#answer-input').value, 'typed'); });
$('#mic').addEventListener('click', toggleMicrophone);
$('#replay').addEventListener('click', () => speak(template(currentRound().prompt), false, recordingText(currentRound().prompt)));
$('#slow-replay').addEventListener('click', () => speak(template(currentRound().prompt), true, recordingText(currentRound().prompt)));
$('#sample-play').addEventListener('click', () => speak(template(currentRound().sample), true, recordingText(currentRound().sample)));
$('#stop-speech').addEventListener('click', stopSpeech); $('#global-stop').addEventListener('click', stopSpeech);
$('#power-words').addEventListener('click', event => { const button = event.target.closest('[data-word]'); if (button) speak(button.dataset.word, true); });
$('#parent-open').addEventListener('click', () => {
  $('#parent-stats').textContent = `已点亮 ${progress.completed.length} / 12 枚任务徽章 · 累计互动 ${progress.counts.total} 轮（语音 ${progress.counts.voice}、点选 ${progress.counts.choice}、文字 ${progress.counts.typed}）`;
  openDialog('#parent-dialog');
});
$('#map-open').addEventListener('click', () => openDialog('#map-dialog'));
$('#history-open').addEventListener('click', () => { renderHistory(); openDialog('#history-dialog'); });
$('#history-list').addEventListener('click', event => { const button = event.target.closest('[data-history]'); if (button) { const entry = history[Number(button.dataset.history)]; speak(entry.text, false, entry.assetText); } });
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('[data-close]').addEventListener('click', () => { stopSpeech(); dialog.close(); });
  dialog.addEventListener('cancel', stopSpeech);
  dialog.addEventListener('click', event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) { stopSpeech(); dialog.close(); } });
}
for (const key of ['auto', 'chinese', 'choices']) $(`#setting-${key}`).addEventListener('change', event => {
  progress.settings[key] = event.target.checked; if (key === 'auto' && !event.target.checked) stopSpeech(); renderSettings(); saveProgress();
});
$('#setting-rate').addEventListener('change', event => { progress.settings.rate = Number(event.target.value); saveProgress(); });
if (synthesis) { refreshVoices(); synthesis.addEventListener('voiceschanged', refreshVoices); }
document.addEventListener('visibilitychange', () => { if (document.hidden) { stopRecognition(); stopSpeech(); } });
window.addEventListener('pagehide', () => { stopRecognition(); stopSpeech(); });
renderSettings(); renderPartners(); renderMission(); setPhase('idle');
