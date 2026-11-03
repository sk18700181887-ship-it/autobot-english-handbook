/** Small, finite scene props for each week. Speech and the real 3D model stay owned by the handbook. */
export function createScenePlay({ host, onSpeak = () => {}, onModelAction = () => {}, onCharacter = () => {} } = {}) {
  if (!host || typeof host.replaceChildren !== 'function') throw new TypeError('createScenePlay requires a host element.');
  const doc = host.ownerDocument;
  const view = doc.defaultView;
  let root = null;
  let disposed = false;
  const timers = new Set();
  const animationTimers = new WeakMap();
  const reducedMotion = () => Boolean(view?.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  const call = (callback, ...args) => {
    try { const result = callback(...args); if (result && typeof result.catch === 'function') result.catch(() => {}); }
    catch { /* The parent page owns its speech/model error messages. */ }
  };
  const el = (tag, className, text) => {
    const node = doc.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function later(action, delay) {
    const timer = view.setTimeout(() => { timers.delete(timer); if (!disposed) action(); }, delay);
    timers.add(timer);
    return timer;
  }
  function clearTimers() { for (const timer of timers) view.clearTimeout(timer); timers.clear(); }
  function speak(text) { call(onSpeak, text); }

  function render(week) {
    if (disposed || !week) return;
    clearTimers();
    root = el('section', 'scene-play');
    root.setAttribute('aria-label', `第 ${week.id} 周场景小道具`);
    const heading = el('div', 'scene-play-heading');
    heading.append(el('h3', 'scene-play-title', '场景小道具'), el('span', 'scene-play-subtitle', week.title || '和伙伴玩一玩'));
    const board = el('div', 'scene-play-board');
    const stage = el('div', 'scene-play-stage');
    const choices = el('div', 'scene-play-choices');
    const caption = el('p', 'scene-play-caption');
    caption.setAttribute('role', 'status');
    caption.setAttribute('aria-live', 'polite');
    board.append(stage, choices);
    root.append(heading, board, caption);
    host.replaceChildren(root);
    const words = week.words || [];
    const word = (en, fallbackZh = '') => words.find((item) => item.en.toLowerCase() === en.toLowerCase()) || { en, zh: fallbackZh };
    const display = (glyph, label = '') => { stage.replaceChildren(el('span', 'scene-play-glyph', glyph)); if (label) stage.append(el('span', 'scene-play-stage-label', label)); };
    const select = (button, group = 'main') => {
      for (const item of choices.querySelectorAll('button[data-group]')) {
        if (item.dataset.group !== group) continue;
        const selected = item === button;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      }
    };
    const chip = (item, action, { glyph = '', group = 'main' } = {}) => {
      const button = el('button', 'scene-play-chip');
      button.type = 'button';
      button.dataset.group = group;
      button.setAttribute('aria-pressed', 'false');
      if (glyph) button.append(el('span', 'scene-play-chip-icon', glyph));
      const text = el('span', 'scene-play-chip-text');
      text.append(el('strong', '', item.en), el('small', '', item.zh || ''));
      button.append(text);
      button.addEventListener('click', () => { if (!disposed && button.isConnected) action(button); });
      choices.append(button);
      return button;
    };
    const animateCar = (car, duration) => {
      const previous = animationTimers.get(car);
      if (previous) { view.clearTimeout(previous); timers.delete(previous); animationTimers.delete(car); }
      car.classList.remove('is-moving');
      if (reducedMotion()) return;
      car.style.setProperty('--scene-play-duration', `${duration}ms`);
      void car.offsetWidth;
      car.classList.add('is-moving');
      animationTimers.set(car, later(() => { car.classList.remove('is-moving'); animationTimers.delete(car); }, duration + 40));
    };

    switch (Number(week.id)) {
      case 1: {
        display('🤝', '选一位伙伴');
        for (const [character, name, glyph, greeting] of [
          ['bumblebee', '大黄蜂', '🐝', "Hi! I'm Bumblebee."],
          ['optimus', '擎天柱', '🚛', "Hello! I'm Optimus."],
        ]) {
          chip({ en: character === 'bumblebee' ? 'Bumblebee' : 'Optimus', zh: name }, (button) => {
            select(button); display(glyph, name); call(onCharacter, character); speak(greeting);
            caption.textContent = `向${name}挥挥手，也说一句 hello。`;
          }, { glyph });
        }
        caption.textContent = '选伙伴、挥挥手，听一句问好。';
        break;
      }
      case 2: {
        stage.classList.add('scene-play-armor-stage');
        const armor = el('div', 'scene-play-armor');
        armor.setAttribute('aria-label', '可以换颜色的小装甲道具');
        stage.append(armor, el('span', 'scene-play-stage-label', '装甲色卡'));
        const colors = { red: '#ba4b3c', blue: '#3b6488', yellow: '#ddb751', green: '#4b7552', black: '#2c3130', white: '#f8f5e9', silver: '#aeb5b6' };
        for (const item of words) {
          const button = chip(item, (selected) => {
            select(selected); armor.style.setProperty('--scene-play-armor', colors[item.en] || '#ddb751');
            call(onModelAction, 'assemble'); speak(item.en); caption.textContent = `${item.zh}装甲小道具，再在伙伴身上找找同样的颜色。`;
          });
          button.style.setProperty('--scene-play-swatch', colors[item.en] || '#ddb751');
          button.classList.add('scene-play-color-chip');
        }
        caption.textContent = '点色卡换小装甲颜色，再转一转伙伴找同色。';
        break;
      }
      case 3: {
        let count = 3;
        stage.classList.add('scene-play-count-stage');
        const number = el('output', 'scene-play-count-number', '3');
        number.setAttribute('aria-label', '积木数量');
        const blocks = el('div', 'scene-play-blocks');
        for (let index = 0; index < 10; index += 1) blocks.append(el('span', 'scene-play-block'));
        stage.append(number, blocks);
        const update = () => {
          number.textContent = String(count);
          [...blocks.children].forEach((block, index) => block.classList.toggle('is-lit', index < count));
          minus.disabled = count === 1; plus.disabled = count === 10;
          caption.textContent = `${count} 块积木，点一块、数一声，也可以用自己的积木跟着摆。`;
        };
        const minus = chip({ en: '−', zh: '少一块' }, () => { count = Math.max(1, count - 1); update(); speak(words[count - 1]?.en || 'one'); });
        const plus = chip({ en: '+', zh: '多一块' }, () => { count = Math.min(10, count + 1); update(); speak(words[count - 1]?.en || 'ten'); });
        minus.setAttribute('aria-label', '减少一块积木'); plus.setAttribute('aria-label', '增加一块积木');
        const replay = chip({ en: '🔊', zh: '数一数' }, () => speak(words[count - 1]?.en || 'three'));
        replay.setAttribute('aria-label', '听当前积木数量的英文');
        update();
        break;
      }
      case 4: {
        stage.classList.add('scene-play-car-stage');
        const track = el('div', 'scene-play-mini-road');
        const car = el('span', 'scene-play-size-car', '🚙');
        track.append(car); stage.append(track);
        for (const en of ['big', 'small', 'fast', 'slow']) {
          const item = word(en);
          chip(item, (button) => {
            select(button, en === 'big' || en === 'small' ? 'size' : 'speed');
            if (en === 'big' || en === 'small') car.style.fontSize = en === 'big' ? '44px' : '25px';
            else animateCar(car, en === 'fast' ? 700 : 2400);
            speak(item.en); caption.textContent = `${item.zh}，看看小车发生了什么，再说一遍 ${item.en}。`;
          }, { group: en === 'big' || en === 'small' ? 'size' : 'speed' });
        }
        caption.textContent = '选大车、小车；再选快或慢，让小车走一小段。';
        break;
      }
      case 5: {
        const icons = { mommy: '👩', daddy: '👨', grandma: '👵', grandpa: '👴', baby: '👶', family: '🏡' };
        display('🏡', '我的家庭小队');
        for (const item of words) chip(item, (button) => {
          select(button); display(icons[item.en] || '🏡', item.zh); speak(item.en);
          caption.textContent = `这是你选的${item.zh}称呼卡，也可以想一位照顾你的人。`;
        });
        caption.textContent = '选你想介绍的家人称呼，不需要填写姓名。';
        break;
      }
      case 6: {
        const parts = { head: 'head', arm: 'arms', hand: 'hands', leg: 'legs', eye: 'head', ear: 'head', mouth: 'head' };
        const icons = { head: '🤖', arm: '💪', hand: '✋', leg: '🦵', eye: '👁️', ear: '👂', mouth: '👄' };
        display('🤖', '指一指部位');
        for (const item of words) chip(item, (button) => {
          select(button); display(icons[item.en] || '🤖', item.zh); call(onModelAction, 'show', parts[item.en] || 'head'); speak(item.en);
          caption.textContent = ['eye', 'ear', 'mouth'].includes(item.en)
            ? `先找到伙伴的头部，再指指你自己的${item.zh}。`
            : `找到伙伴的${item.zh}，也指指你自己的${item.zh}。`;
        });
        caption.textContent = '点部位看伙伴；眼睛、耳朵和嘴巴在头部。';
        break;
      }
      case 7: {
        const icons = { milk: '🥛', water: '💧', egg: '🥚', rice: '🍚', apple: '🍎', banana: '🍌', bread: '🍞', yummy: '😋' };
        const plate = el('div', 'scene-play-plate');
        plate.setAttribute('aria-label', '你摆放的食物盘');
        const foods = new Map();
        stage.append(plate, el('span', 'scene-play-stage-label', '给伙伴摆一盘'));
        for (const item of words) chip(item, (button) => {
          if (foods.has(item.en)) foods.delete(item.en); else foods.set(item.en, icons[item.en] || '🍽️');
          plate.replaceChildren(...[...foods.values()].map((glyph) => el('span', '', glyph)));
          const selected = foods.has(item.en); button.classList.toggle('is-selected', selected); button.setAttribute('aria-pressed', String(selected));
          speak(item.en); caption.textContent = `${item.zh}，听完也说一遍；再点同一张可以拿下来。`;
        });
        caption.textContent = '点食物放进小盘子，挑你今天想要的就好。';
        break;
      }
      case 8: {
        const icons = { happy: '😊', sad: '😢', angry: '😠', scared: '😟', tired: '😴', brave: '🦁', sunny: '☀️', rainy: '🌧️' };
        display('💚', '每种感受都可以');
        for (const item of words) chip(item, (button) => {
          select(button); display(icons[item.en] || '💚', item.zh); speak(item.en);
          caption.textContent = ['sunny', 'rainy'].includes(item.en) ? `今天的天气也可以说：${item.en}。` : `你选了“${item.zh}”。每种心情都可以被听见，也可以先不说。`;
        });
        caption.textContent = '选心情或天气，没有标准答案，也可以先看看。';
        break;
      }
      case 9: {
        stage.classList.add('scene-play-position-stage');
        const box = el('div', 'scene-play-position-box', 'box');
        const car = el('span', 'scene-play-position-car', '🚗');
        stage.dataset.position = 'in'; stage.append(box, car);
        for (const en of ['in', 'on', 'under']) {
          const item = word(en);
          const button = chip(item, (selected) => {
            select(selected); stage.dataset.position = en; speak(item.en);
            caption.textContent = `小车在盒子${item.zh}，和家长拿真盒子再摆一次。`;
          });
          if (en === 'in') select(button);
        }
        caption.textContent = '点位置，把小车放到盒子里、上面或下面。';
        break;
      }
      case 10: {
        stage.classList.add('scene-play-routes');
        const routes = {};
        for (const [id, zh, glyph] of [['road', '公路', '🛣️'], ['water', '水面', '🌊'], ['sky', '天空', '☁️'], ['rail', '铁轨', '🛤️']]) {
          const route = el('div', 'scene-play-route');
          const vehicle = el('span', 'scene-play-route-vehicle', glyph);
          route.append(vehicle, el('span', 'scene-play-route-label', zh)); stage.append(route); routes[id] = { route, vehicle, glyph };
        }
        const vehicles = { car: ['road', '🚗'], truck: ['road', '🚚'], bus: ['road', '🚌'], bike: ['road', '🚲'], plane: ['sky', '✈️'], train: ['rail', '🚂'], boat: ['water', '⛵'], toy: ['road', '🧸'] };
        for (const item of words) chip(item, (button) => {
          select(button);
          for (const route of Object.values(routes)) { route.route.classList.remove('is-selected'); route.vehicle.textContent = route.glyph; }
          const [routeId, glyph] = vehicles[item.en] || ['road', '🚗'];
          routes[routeId].route.classList.add('is-selected'); routes[routeId].vehicle.textContent = glyph;
          speak(item.en); caption.textContent = item.en === 'toy' ? '玩具也能去旅行，你可以为它想一条新路线。' : `${item.zh}出发了！听一听它的英文，再用玩具走一趟。`;
        });
        caption.textContent = '选交通工具，看它去哪里旅行；想象也可以有新路线。';
        break;
      }
      case 11: {
        stage.classList.add('scene-play-car-stage');
        const road = el('div', 'scene-play-mini-road');
        const car = el('span', 'scene-play-mission-car', '🚕');
        const lamp = el('span', 'scene-play-help-lamp', '🤝');
        lamp.setAttribute('aria-label', '合作指示灯');
        road.append(car); stage.append(road, lamp);
        let drivingTimer;
        for (const en of ['go', 'wait', 'help']) {
          const item = word(en);
          chip(item, (button) => {
            select(button);
            if (drivingTimer) { view.clearTimeout(drivingTimer); timers.delete(drivingTimer); }
            if (en === 'go') {
              car.classList.remove('is-going'); car.style.transform = ''; void car.offsetWidth;
              if (reducedMotion()) car.style.transform = 'translateX(48px)';
              else {
                car.classList.add('is-going');
                drivingTimer = later(() => { car.classList.remove('is-going'); car.style.transform = 'translateX(44px)'; }, 2400);
              }
              caption.textContent = '准备好就出发，车只走一小段；你也可以随时喊停。';
            } else if (en === 'wait') {
              const position = view.getComputedStyle(car).transform;
              car.classList.remove('is-going'); car.style.transform = position === 'none' ? '' : position;
              caption.textContent = '小车停下来等你。准备好以后再出发也可以。';
            } else {
              const position = view.getComputedStyle(car).transform;
              car.classList.remove('is-going'); car.style.transform = position === 'none' ? '' : position;
              lamp.classList.add('is-lit'); call(onModelAction, 'assemble');
              caption.textContent = '合作小灯亮了，和家长一起帮伙伴合起来。';
            }
            speak(item.en);
          });
        }
        caption.textContent = 'go 出发，wait 等一等；需要帮忙时就点 help。';
        break;
      }
      case 12: {
        const stars = el('div', 'scene-play-stars');
        for (let index = 0; index < 3; index += 1) stars.append(el('span', 'scene-play-star', '★'));
        stage.append(stars, el('span', 'scene-play-stage-label', '愿意试试就很棒'));
        const oldWords = [{ en: 'hello', zh: '向伙伴问好' }, { en: 'yellow', zh: '找到黄色' }, { en: 'one', zh: '数一数' }];
        oldWords.forEach((item, index) => {
          chip(item, (button) => {
            button.classList.add('is-selected'); button.setAttribute('aria-pressed', 'true');
            stars.children[index].classList.add('is-lit'); speak('Mission complete!');
            caption.textContent = '这颗星送给愿意尝试的你，随时都可以回来再玩。';
          });
        });
        caption.textContent = '任选一个熟悉的小任务，给自己的尝试点亮一颗星。';
        break;
      }
      default: {
        display('🧩', '选一张词卡');
        for (const item of words) chip(item, (button) => { select(button); speak(item.en); caption.textContent = `${item.en} · ${item.zh}`; });
        caption.textContent = '点词卡听一听，再和伙伴说一遍。';
      }
    }
  }

  function dispose() { if (disposed) return; disposed = true; clearTimers(); root?.remove(); root = null; }
  return Object.freeze({ render, dispose });
}
