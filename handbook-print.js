import { handbookWeeks, handbookMeta, handbookWordBank, handbookParentPhrases } from './handbook-data.js';

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, letter => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[letter]));
const stageNames = { 1: '认识我的伙伴', 2: '聊聊我的世界', 3: '小队一起出发' };
const speakers = { bumblebee: '大黄蜂', optimus: '擎天柱', child: '小队长 · 你' };
const pageFooter = (page, label) => `<footer class="page-footer"><span>AUTOBOT ENGLISH ADVENTURES · ${escapeHTML(label)}</span><b>${String(page).padStart(2, '0')} / 16</b></footer>`;
const pageEyebrow = title => `<div class="page-eyebrow"><span>汽车人英语冒险手册</span><span>${escapeHTML(title)}</span></div>`;
const dailyChecks = () => `<div class="daily-checks"><b>本周一起玩过</b>${['一', '二', '三', '四', '五', '六', '日'].map(day => `<span><i></i>周${day}</span>`).join('')}<small>勾选参与，不用全勤</small></div>`;

function cover() {
  return `<section class="book-page cover-page" aria-label="封面">
    ${pageEyebrow('亲子共学 · 6 岁 · 12 周')}
    <div class="cover-kicker">YOUR FIRST AUTOBOT ADVENTURE</div>
    <h1>拆一拆，<br>说英语。</h1>
    <p class="cover-subtitle">和大黄蜂、擎天柱一起，<br>把每天的小事变成一场英语冒险。</p>
    <div class="cover-characters"><div class="character-orbit"></div><img src="./assets/bumblebee.png" alt="大黄蜂电影造型"><img src="./assets/optimus.png" alt="擎天柱电影造型"><span class="character-label bee">BUMBLEBEE<br><b>热情的搭档</b></span><span class="character-label prime">OPTIMUS PRIME<br><b>可靠的伙伴</b></span></div>
    <div class="cover-stats"><div><b>12</b><span>个主题场景</span></div><div><b>89</b><span>项周词汇</span></div><div><b>15<span>分钟</span></b><span>每天轻松共学</span></div></div>
    <div class="owner-line">小队长的名字 <span></span>　出发日期 <span></span></div>
    <div class="cover-promise"><b>一个词、一句短话、一次挥手，都算勇敢表达。</b><span>听一听 · 拍一拍 · 看 3D · 玩实物 · 一起说</span></div>
    ${pageFooter(1, '6 岁亲子共学 / 电子 + 纸上双版本')}
  </section>`;
}

function guide() {
  return `<section class="book-page guide-page" aria-label="家长指引">
    ${pageEyebrow('PARENT FIELD GUIDE')}
    <div class="section-kicker">给陪伴的你</div><h2>我们一起玩，<br>英语就有了用处。</h2>
    <p class="intro-copy">孩子可以当队长，也可以选一位伙伴来扮演。家长负责示范和回应，不急着追问“记住了吗”。每次选三个词、一条句式就够了。</p>
    <h3 class="section-heading">每天 15 分钟的轻松顺序</h3>
    <div class="routine-list">${handbookMeta.weeklyRoutine.map((step, i) => `<div class="routine-item"><b>${String(i + 1).padStart(2, '0')}</b><span class="time">${escapeHTML(step.time)}</span><div><strong>${escapeHTML(step.title)}</strong><p>${escapeHTML(step.description)}</p></div></div>`).join('')}</div>
    <div class="guide-grid">${handbookMeta.parentGuide.map(tip => `<article><h4>${escapeHTML(tip.title)}</h4><p>${escapeHTML(tip.text)}</p></article>`).join('')}</div>
    <div class="source-note"><b>这本手册从哪里来？</b><p>${escapeHTML(handbookMeta.sourceNote)}</p><p>纸上手册提供完整课程；互动版可点词听音、播放节奏和操作 3D。页面入口：handbook.html?week=1。3D 为教学场景中的伙伴，眼 / 耳 / 嘴在头部整体中观察；交通课程用玩具补充，不含车型自动变形。</p></div>
    ${pageFooter(2, '你可以重复一周，也可以先选最喜欢的一周')}
  </section>`;
}

function weekPage(week) {
  return `<section class="book-page week-page" style="--week-accent:${escapeHTML(week.accent || '#947446')}" aria-label="第 ${week.id} 周 ${escapeHTML(week.title)}">
    ${pageEyebrow(`STAGE ${week.stage} / ${stageNames[week.stage]}`)}
    <header class="week-heading"><div class="week-number"><span>WEEK</span>${String(week.id).padStart(2, '0')}</div><div><p class="section-kicker">${escapeHTML(week.scene)}</p><h2>${escapeHTML(week.title)}</h2><p class="english-title">${escapeHTML(week.englishTitle)}</p></div><span class="week-icon">${escapeHTML(week.icon)}</span></header>
    <div class="scene-copy">${escapeHTML(week.sceneDescription)}</div>
    <div class="goal-line"><b>这周试试看</b><span>${escapeHTML(week.goal)}</span></div>
    <div class="lesson-grid">
      <article class="lesson-box words-box"><h3><span>01</span> 词语工具箱 <small>每天任选 3 个</small></h3><div class="print-words">${week.words.map(word => `<div><b lang="en">${escapeHTML(word.en)}</b><span>${escapeHTML(word.zh)}</span></div>`).join('')}</div></article>
      <article class="lesson-box patterns-box"><h3><span>02</span> 今天说一句 <small>原计划重点句式</small></h3><div class="print-patterns">${week.patterns.map(pattern => `<div><b lang="en">${escapeHTML(pattern.en)}</b><p>${escapeHTML(pattern.zh)}</p></div>`).join('')}</div></article>
    </div>
    <article class="dialogue-section"><h3><span>03</span> 三个伙伴来对话 <small>家长演机器人，孩子说自己的台词</small></h3><div class="print-dialogue">${week.dialogue.map(line => `<div class="dialogue-line ${line.speaker}"><span class="speaker">${speakers[line.speaker]}</span><b lang="en">${escapeHTML(line.en)}</b><p>${escapeHTML(line.zh)}</p></div>`).join('')}</div></article>
    <div class="lesson-grid rhythm-lab-grid">
      <article class="lesson-box chant-box"><h3><span>04</span> 拍拍手，跟着说 <small>${week.chant.bpm} BPM · 可关闭</small></h3><div class="beat-dots"><i></i><i></i><i></i><i></i><span>拍四下，听一句，再试一句</span></div>${week.chant.lines.map(line => `<div class="chant-line"><b lang="en">${escapeHTML(line.en)}</b><span>${escapeHTML(line.zh)}</span></div>`).join('')}</article>
      <article class="lesson-box lab-box"><h3><span>05</span> 3D 伙伴任务</h3><p class="lab-character">${week.lab.character === 'optimus' ? '擎天柱' : '大黄蜂'} · ${({ show: '找一找', explode: '拆一拆', assemble: '合起来' })[week.lab.action]}</p><b class="lab-prompt" lang="en">${escapeHTML(week.lab.prompt)}</b><p>${escapeHTML(week.lab.zh)}</p><span class="lab-entry">互动版打开本周，跟随“3D 伙伴任务”操作。</span></article>
    </div>
    <article class="offline-mission"><div class="mission-label">离开屏幕<br><b>一起玩</b></div><div><h3>${escapeHTML(week.mission.title)}</h3><p>${escapeHTML(week.mission.instruction)}</p><p class="success-line"><i></i>${escapeHTML(week.mission.success)}</p></div></article>
    <div class="parent-notes"><p><b>给家长</b> ${escapeHTML(week.parentTip)}</p><p><b>旧词再见面</b> ${escapeHTML(week.review)}</p></div>
    ${dailyChecks()}
    ${pageFooter(week.id + 2, '愿意听、愿意指、愿意说，都是参与')}
  </section>`;
}

function bankPage() {
  return `<section class="book-page bank-page" aria-label="完整扩展词库">
    ${pageEyebrow('BONUS WORD TOOLBOX')}
    <div class="section-kicker">不需要背的词语工具箱</div><h2>故事还可以这样继续。</h2>
    <p class="intro-copy">这里保留原计划的 9 组、81 项扩展词库。它与每周的 89 项词汇有重合，也有额外词。家长根据正在玩的场景任选三个，不把它变成额外作业。</p>
    <div class="bank-grid">${handbookWordBank.map(group => `<article class="bank-group"><h3>${escapeHTML(group.title)}</h3>${group.words.map(word => `<div><b lang="en">${escapeHTML(word.en)}</b><span>${escapeHTML(word.zh)}</span></div>`).join('')}</article>`).join('')}</div>
    <div class="bank-tip"><b>把词放进一件小事里</b><p>“Yellow!” 选一辆黄色车；“Help!” 请伙伴帮忙；“Turn!” 让玩具转个弯。说出了想法，语言就完成了一次任务。</p></div>
    ${pageFooter(15, '扩展词按来源保留，按孩子的兴趣选用')}
  </section>`;
}

function passportPage() {
  const essential = [
    ['Autobots, roll out!', '汽车人，出发！'], ['Transform!', '变形！'], ["What's the mission?", '今天的任务是什么？'], ['Yes, Captain!', '是，队长！'], ['Your turn.', '轮到你了。'], ["That's OK.", '没关系。'], ['Help me!', '帮帮我！'], ["Let's try again.", '我们再试试。'], ['Good job, Bumblebee!', '干得好，大黄蜂！'], ['Mission complete!', '任务完成！'], ["Let's say it together.", '我们一起说。'], ['Say it in Chinese.', '用中文说也可以。']
  ];
  const sourcePhrases = new Map(handbookParentPhrases.flatMap(group => group.phrases).map(phrase => [phrase.en, phrase.zh]));
  return `<section class="book-page passport-page" aria-label="我的冒险护照和家长口令">
    ${pageEyebrow('MY ADVENTURE PASSPORT')}
    <div class="section-kicker">参与留下印记，不必打分</div><h2>这是我们的冒险护照。</h2>
    <p class="intro-copy">一起玩过就画一颗星；想重复一周，也可以再画一颗。记录好奇心、选择和表达，不用追求全勤或独自完成。</p>
    <div class="passport-grid">${handbookWeeks.map(week => `<div><span>WEEK ${String(week.id).padStart(2, '0')}</span><b>${escapeHTML(week.title)}</b><i>☆ ☆ ☆</i></div>`).join('')}</div>
    <h3 class="section-heading">家长口袋话术 · 先用熟这 12 句</h3>
    <div class="pocket-phrases">${essential.map(([en, fallback]) => `<div><b lang="en">${escapeHTML(en)}</b><span>${escapeHTML(sourcePhrases.get(en) || fallback)}</span></div>`).join('')}</div>
    <p class="pocket-note">互动手册的家长页保留原计划全部 6 组、63 条话术；想要更多表达时，再任选一条加入。</p>
    <div class="keepsake"><h3>我最想再玩的任务是：</h3><div></div><h3>伙伴听见我说：</h3><div></div><p>小队长签名：________________　陪伴者签名：________________</p></div>
    ${pageFooter(16, 'See you on our next adventure! / 下一段冒险再见')}
  </section>`;
}

document.querySelector('#print-book').innerHTML = cover() + guide() + handbookWeeks.map(weekPage).join('') + bankPage() + passportPage();
document.querySelector('#print-button').addEventListener('click', () => window.print());
document.documentElement.dataset.bookReady = 'true';
