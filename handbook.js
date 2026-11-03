import {handbookWeeks,handbookMeta,handbookWordBank,handbookParentPhrases} from './handbook-data.js';
import {createHandbookAudio} from './handbook-audio.js';
import {createScenePlay} from './handbook-play.js';

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const key='autobot-junior-handbook-v1';
const stageNames={1:'认识汽车人',2:'队长的日常',3:'一起出任务'};
const steps=['words','chant','talk','mission'];
const stepTitles=['听一听，就能开始。','拍拍手，轮到你啦。','和伙伴，说一说。','小队长，出发吧。'];
const characterNames={bumblebee:'大黄蜂',optimus:'擎天柱',child:'小队长（你）'};
const partNames={head:'头部',chest:'胸甲',arms:'双臂',hands:'双手',legs:'双腿',feet:'双脚'};
const wordParts={head:'head',eye:'head',eyes:'head',ear:'head',ears:'head',mouth:'head',chest:'chest',arm:'arms',arms:'arms',hand:'hands',hands:'hands',leg:'legs',legs:'legs',foot:'feet',feet:'feet'};
const colors={red:'#c35743',blue:'#527ca1',yellow:'#eabe40',green:'#658761',black:'#333f3b',white:'#fffcf1',silver:'#a7b1b0'};
const sceneCodes=['base','garage','city','garage','base','garage','forest','forest','base','city','rescue','celebration'];
const pictures={hello:'👋',hi:'👋',bye:'👋',name:'🏷️',robot:'🤖',friend:'🤝',big:'🐘',small:'🐭',long:'📏',short:'✏️',tall:'🦒',fast:'⚡',slow:'🐢',happy:'😊',sad:'😢',angry:'😠',tired:'🥱',hungry:'🍽️',thirsty:'🥤',scared:'😟',mom:'👩',dad:'👨',mother:'👩',father:'👨',brother:'👦',sister:'👧',baby:'👶',family:'🏠',head:'🤖',hand:'✋',arm:'💪',leg:'🦵',eye:'👁️',ear:'👂',mouth:'👄',apple:'🍎',banana:'🍌',water:'💧',milk:'🥛',bread:'🍞',rice:'🍚',egg:'🥚',eat:'🍽️',drink:'🥤',in:'📦',on:'⬆️',under:'⬇️',here:'📍',there:'👉',box:'📦',table:'🪑',bed:'🛏️',car:'🚗',truck:'🚚',bus:'🚌',bike:'🚲',plane:'✈️',train:'🚂',boat:'⛵',toy:'🧸',go:'🚦',come:'👋',look:'👀',wait:'✋',help:'🤝',ready:'⚡',again:'↻',can:'✦',try:'💪',strong:'💪',hero:'🛡️','good job':'⭐',mission:'🗺️',complete:'🏁',one:'1',two:'2',three:'3',four:'4',five:'5',six:'6',seven:'7',eight:'8',nine:'9',ten:'10',love:'❤️',like:'❤️',food:'🍽️'};
let saved;
try{saved=JSON.parse(localStorage.getItem(key)||'{}');}catch{saved={};}
if(!saved||typeof saved!=='object'||Array.isArray(saved))saved={};
const state={days:{},missions:[],lastWeek:1,offsets:{}};
for(const week of handbookWeeks){state.days[week.id]=Array.from({length:7},(_,i)=>saved.days?.[week.id]?.[i]===true);state.offsets[week.id]=Number.isInteger(saved.offsets?.[week.id])?Math.max(0,saved.offsets[week.id])%week.words.length:0;}
state.missions=Array.isArray(saved.missions)?saved.missions.filter(id=>handbookWeeks.some(w=>w.id===id)):[];
state.lastWeek=handbookWeeks.some(w=>w.id===saved.lastWeek)?saved.lastWeek:1;
let activeWeek,activeStep='words',activeCharacter='bumblebee',sequence=0,toastTimer,modelWordTimer;
let labReady=false,labTransportReady=false,queuedConfiguration=null,modelTimeout;
let modelIntent={part:null,action:'assemble'};
const visited=new Set();

function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch{showToast('浏览器暂时不能保存进度，仍然可以继续玩。');}}
function showToast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,4200);}
function resetRhythm(){for(const dot of $$('#beat-dots i'))dot.classList.remove('is-beat');for(const line of $$('.chant-line'))line.classList.remove('is-current');$('#rhythm-phase').textContent='准备好小手了吗？';}
const audio=createHandbookAudio({
  onState:({state:audioState,message})=>{
    $('#sound-bar').hidden=audioState==='idle';$('#sound-message').textContent=message||'伙伴正在说…';
    $('#chant-play').textContent=audioState==='chanting'?'■ 停一停':'♫ 开始节奏跟读';
    $('#chant-play').setAttribute('aria-pressed',String(audioState==='chanting'));
    if(audioState!=='chanting')resetRhythm();
  },
  onBeat:({beat})=>{for(const [index,dot] of $$('#beat-dots i').entries())dot.classList.toggle('is-beat',index===beat);},
  onLine:({index,line,phase})=>{for(const [i,node] of $$('.chant-line').entries())node.classList.toggle('is-current',i===index);$('#rhythm-phase').textContent=phase==='echo'?'到你啦！留四拍给你。':'听伙伴示范一句';$('#sound-message').textContent=(phase==='echo'?'到你啦 · ':'伙伴示范 · ')+line.en;},
  onError:event=>showToast(typeof event==='string'?event:event.message||'声音暂时没播放，请再点一次，也可以和大人一起读。'),
});
function stopAll(){sequence++;audio.stop();for(const line of $$('.dialogue-line'))line.classList.remove('is-current');$('#dialogue-play').textContent='▶ 听一段示范';resetRhythm();}
async function say(text,{slow=false}={}){stopAll();return audio.speak(text,{slow});}

function renderMap(){
  $('#week-map').innerHTML=handbookWeeks.map((week,index)=>`${index%4===0?`<div class="stage-label">0${week.stage} · ${stageNames[week.stage]}</div>`:''}<button class="week-link" data-week="${week.id}" aria-current="${week.id===activeWeek?.id?'page':'false'}"><span class="week-index">${String(week.id).padStart(2,'0')}</span><span><b>${escape(week.title)}</b><small>${escape(week.englishTitle)}</small></span><span class="week-done" aria-label="${state.days[week.id].some(Boolean)||state.missions.includes(week.id)?'本周有足迹':'尚未记录'}">${state.days[week.id].some(Boolean)||state.missions.includes(week.id)?'✦':''}</span></button>`).join('');
  const count=handbookWeeks.filter(week=>state.days[week.id].some(Boolean)||state.missions.includes(week.id)).length;
  $('#completed-label').textContent=`${count} / 12 周有足迹`;$('#book-progress').value=count;
}
function renderDays(){
  $('#day-stars').innerHTML=state.days[activeWeek.id].map((done,i)=>`<button class="day-star" data-day="${i}" aria-pressed="${done}" aria-label="第${i+1}天${done?'已练习，点击取消':'未记录，点击点亮'}">${done?'★':'☆'}<span>${i+1}</span></button>`).join('');
}
function picture(word){const color=colors[word];if(color)return `<span class="word-pic"><span style="display:block;width:30px;height:30px;border-radius:50%;background:${color};box-shadow:inset -3px -4px 0 #00000010,0 0 0 1px #69756220"></span></span>`;return `<span class="word-pic" aria-hidden="true">${escape(pictures[word]||'✦')}</span>`;}
function renderWords(){
  const words=activeWeek.words,offset=state.offsets[activeWeek.id];
  const today=Array.from({length:Math.min(3,words.length)},(_,i)=>words[(offset+i)%words.length]);
  $('#today-words').innerHTML=today.map(word=>`<button class="word-card" data-word="${escape(word.en)}" aria-label="听 ${escape(word.en)}，${escape(word.zh)}"><span class="word-sound" aria-hidden="true">♪</span>${picture(word.en)}<b>${escape(word.en)}</b><small>${escape(word.zh)}</small></button>`).join('');
  $('#all-words').innerHTML=words.map(word=>`<button class="word-chip" data-word="${escape(word.en)}">${escape(word.en)}<small>${escape(word.zh)}</small></button>`).join('');
  $('#word-count').textContent=`${words.length} 个词 · 慢慢认识`;
}
function postModel(message){$('#lesson-model').contentWindow?.postMessage(message,location.origin);}
function configureModel({part=modelIntent.part,action=modelIntent.action}={}){
  modelIntent={part,action};
  const message={type:'handbook:configure',character:activeCharacter,part,action,scene:sceneCodes[activeWeek.id-1]};
  labReady=false;
  if(labTransportReady){queuedConfiguration=null;postModel(message);}else queuedConfiguration=message;
}
function setCharacter(character,{configure=true}={}){
  if(!['bumblebee','optimus'].includes(character))return;
  const changed=activeCharacter!==character;activeCharacter=character;
  for(const button of $$('[data-character]'))button.setAttribute('aria-pressed',String(button.dataset.character===character));
  if(configure){if(changed)$('#model-pending').hidden=false;configureModel();}
}
function modelAction(action,part){if(!labReady){showToast('伙伴还在就位，稍等一下就能玩。');return;}modelIntent={part:part??null,action:action==='reset'?'assemble':action};postModel({type:'handbook:action',action,part});}
function selectWord(word){
  for(const button of $$('[data-word]'))button.classList.toggle('is-active',button.dataset.word===word);
  if(wordParts[word]){configureModel({part:wordParts[word],action:'show'});}
  else if(colors[word])configureModel({action:'assemble'});
  void say(word,{slow:true});
}
const scenePlay=createScenePlay({host:$('#scene-play'),onSpeak:text=>say(text,{slow:true}),onModelAction:modelAction,onCharacter:character=>setCharacter(character)});
function setStep(step,{focus=false}={}){
  if(!steps.includes(step))return;stopAll();activeStep=step;visited.add(`${activeWeek.id}:${step}`);
  for(const name of steps){const active=name===step;const tab=$(`#tab-${name}`);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;tab.classList.toggle('is-done',visited.has(`${activeWeek.id}:${name}`)&&!active);$(`#panel-${name}`).hidden=!active;}
  const index=steps.indexOf(step);$('#activity-title').textContent=stepTitles[index];$('#step-count').textContent=`0${index+1} / 04`;$('#step-back').disabled=index===0;
  $('#step-next').textContent=index===3?'下一周 →':`去${['听单词','拍手唱','说一说','出任务'][index+1]} →`;$('#step-next').disabled=index===3&&activeWeek.id===12;
  if(focus)$(`#tab-${step}`).focus();
}
function renderWeek(id,{push=false}={}){
  const week=handbookWeeks.find(item=>item.id===Number(id))||handbookWeeks[0];activeWeek=week;modelIntent={part:week.lab.part,action:week.lab.action};stopAll();state.lastWeek=week.id;save();
  $('#chapter-number').textContent=`WEEK ${String(week.id).padStart(2,'0')}`;$('#chapter-stage').textContent=stageNames[week.stage];$('#chapter-title').innerHTML=`${escape(week.title)}<span>${escape(week.englishTitle)}</span>`;$('#chapter-goal').textContent=week.goal;
  $('#scene-title').textContent=week.scene?.split(/[·｜|]/)[0]||week.title;
  $('#scene-tag').textContent=`AUTOBOT FIELD TRIP / ${String(week.id).padStart(2,'0')}`;$('#scene-story').textContent=week.sceneDescription;
  $('#lab-prompt').textContent=week.lab.zh;$('#parent-tip').textContent=week.parentTip;$('#chapter-bottom').textContent=`第 ${week.id} 周 / 共 12 周`;
  $('#previous-week').disabled=week.id===1;$('#next-week').disabled=week.id===12;
  $('#key-patterns').innerHTML=week.patterns.map(pattern=>`<button class="pattern-button" data-say="${escape(pattern.en)}"><span><b>${escape(pattern.en)}</b><small>${escape(pattern.zh)}</small></span><i aria-hidden="true">♪</i></button>`).join('');
  $('#chant-lines').innerHTML=week.chant.lines.map((line,i)=>`<button class="chant-line" data-chant-line="${i}" data-say="${escape(line.en)}"><b>${escape(line.en)}</b><small>${escape(line.zh)}</small></button>`).join('');
  $('#chant-tempo').value=String(week.chant.bpm||84);if(!$('#chant-tempo').value)$('#chant-tempo').value='84';$('#bpm-label').textContent=`${$('#chant-tempo').value} BPM`;
  $('#dialogue-lines').innerHTML=week.dialogue.map((line,i)=>`<button class="dialogue-line" data-line="${i}" data-speaker="${escape(line.speaker)}" data-say="${escape(line.en)}">${line.speaker==='child'?'<span class="child-avatar" aria-hidden="true">🧑‍🚀</span>':`<img src="./assets/${line.speaker}.png" alt="">`}<span class="line-copy"><span class="speaker">${escape(characterNames[line.speaker]||'伙伴')}</span><b>${escape(line.en)}</b><small>${escape(line.zh)}</small></span><span class="line-sound" aria-hidden="true">♪</span></button>`).join('');
  $('#mission-title').textContent=week.mission.title;$('#mission-instruction').textContent=week.mission.instruction;$('#mission-success').textContent=week.mission.success;$('#review-note').textContent=week.review;
  $('#mission-celebration').hidden=!state.missions.includes(week.id);$('#mission-done').textContent=state.missions.includes(week.id)?'✦ 已完成，还想再玩一次':'✦ 我们完成任务啦';
  clearTimeout(modelWordTimer);$('#model-word').hidden=true;renderMap();renderDays();renderWords();scenePlay.render(week);setCharacter(week.lab.character);setStep('words');
  document.title=`第${week.id}周 · ${week.title} — 小小汽车人学习手册`;
  const url=new URL(location.href);url.searchParams.set('week',String(week.id));if(push)history.pushState({week:week.id},'',url);else history.replaceState({week:week.id},'',url);
  if(innerWidth<=700)$('.week-link[aria-current="page"]')?.scrollIntoView({block:'nearest',inline:'center'});
}

$('#week-map').addEventListener('click',event=>{const button=event.target.closest('[data-week]');if(button)renderWeek(button.dataset.week,{push:true});});
$('#day-stars').addEventListener('click',event=>{const button=event.target.closest('[data-day]');if(!button)return;const day=Number(button.dataset.day);state.days[activeWeek.id][day]=!state.days[activeWeek.id][day];save();renderDays();renderMap();});
$('#rotate-words').addEventListener('click',()=>{stopAll();state.offsets[activeWeek.id]=(state.offsets[activeWeek.id]+3)%activeWeek.words.length;save();renderWords();});
document.addEventListener('click',event=>{
  const word=event.target.closest('[data-word]');if(word){selectWord(word.dataset.word);return;}
  const sample=event.target.closest('[data-say]');if(sample){void say(sample.dataset.say,{slow:true});if(sample.matches('.dialogue-line'))sample.classList.add('is-current');}
});
for(const button of $$('[data-step]'))button.addEventListener('click',()=>setStep(button.dataset.step));
$('.activity-tabs').addEventListener('keydown',event=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();let index=steps.indexOf(activeStep);index=event.key==='Home'?0:event.key==='End'?3:(index+(event.key==='ArrowRight'?1:3))%4;setStep(steps[index],{focus:true});});
$('#step-back').addEventListener('click',()=>setStep(steps[Math.max(0,steps.indexOf(activeStep)-1)]));
$('#step-next').addEventListener('click',()=>{const index=steps.indexOf(activeStep);if(index<3)setStep(steps[index+1]);else if(activeWeek.id<12)renderWeek(activeWeek.id+1,{push:true});});
$('#previous-week').addEventListener('click',()=>renderWeek(activeWeek.id-1,{push:true}));$('#next-week').addEventListener('click',()=>renderWeek(activeWeek.id+1,{push:true}));
for(const button of $$('[data-character]'))button.addEventListener('click',()=>{stopAll();setCharacter(button.dataset.character);});
for(const button of $$('[data-model-action]'))button.addEventListener('click',()=>modelAction(button.dataset.modelAction));
$('#lab-demonstrate').addEventListener('click',()=>{configureModel({part:activeWeek.lab.part,action:activeWeek.lab.action});void say(activeWeek.lab.prompt,{slow:true});});
$('#chant-tempo').addEventListener('change',()=>{$('#bpm-label').textContent=`${$('#chant-tempo').value} BPM`;stopAll();});
$('#chant-play').addEventListener('click',()=>{if(audio.state==='chanting'){stopAll();return;}stopAll();void audio.startChant({lines:activeWeek.chant.lines,bpm:Number($('#chant-tempo').value)});});
$('#stop-audio').addEventListener('click',stopAll);
$('#dialogue-play').addEventListener('click',async()=>{
  const playing=$('#dialogue-play').textContent.startsWith('■');stopAll();if(playing)return;
  const token=sequence,week=activeWeek;$('#dialogue-play').textContent='■ 停止示范';
  try{for(const [index,line] of week.dialogue.entries()){
    if(token!==sequence)break;
    for(const [i,node] of $$('.dialogue-line').entries())node.classList.toggle('is-current',i===index);
    const result=await audio.speak(line.en,{slow:true});if(result.status==='error'||token!==sequence)break;
    if(line.speaker==='child'){$('#sound-bar').hidden=false;$('#sound-message').textContent='到你啦 · '+line.en;await new Promise(resolve=>setTimeout(resolve,3500));}
    else await new Promise(resolve=>setTimeout(resolve,350));
  }}finally{if(token===sequence){$('#dialogue-play').textContent='▶ 听一段示范';$('#sound-bar').hidden=true;for(const line of $$('.dialogue-line'))line.classList.remove('is-current');}}
});
$('#mission-done').addEventListener('click',()=>{
  if(!state.missions.includes(activeWeek.id)){state.missions.push(activeWeek.id);const day=state.days[activeWeek.id].indexOf(false);if(day!==-1)state.days[activeWeek.id][day]=true;save();renderMap();renderDays();}
  $('#mission-celebration').hidden=false;$('#mission-done').textContent='✦ 已完成，还想再玩一次';void say('Mission complete!');
});
function openDialog(selector){stopAll();$(selector).showModal();}
$('#parents-open').addEventListener('click',()=>openDialog('#parents-dialog'));$('#wordbank-open').addEventListener('click',()=>openDialog('#wordbank-dialog'));
for(const dialog of $$('.book-dialog')){dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',stopAll);dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});}
$('#daily-routine').innerHTML=handbookMeta.weeklyRoutine.map(item=>`<div class="routine-row"><span>${escape(item.time)}</span><div><b>${escape(item.title)}</b><p>${escape(item.description)}</p></div></div>`).join('');
$('#parent-guides').innerHTML=handbookMeta.parentGuide.map(item=>`<div class="parent-guide"><b>${escape(item.title)}</b><p>${escape(item.text)}</p></div>`).join('');
$('#parent-phrases').innerHTML=handbookParentPhrases.map(group=>`<section><h4>${escape(group.title)}</h4>${group.phrases.map(phrase=>`<button class="parent-phrase" data-say="${escape(phrase.en)}"><b>${escape(phrase.en)} ♪</b><small>${escape(phrase.zh)}${phrase.when?' · '+escape(phrase.when):''}</small></button>`).join('')}</section>`).join('');
function renderBank(query=''){
  const needle=query.toLowerCase().trim();let count=0;
  $('#bank-groups').innerHTML=handbookWordBank.map(group=>{const words=group.words.filter(word=>!needle||word.en.toLowerCase().includes(needle)||word.zh.includes(needle));count+=words.length;return words.length?`<section class="bank-group"><h3>${escape(group.title)}</h3><div>${words.map(word=>`<button class="word-chip" data-word="${escape(word.en)}">${escape(word.en)}<small>${escape(word.zh)}</small></button>`).join('')}</div></section>`:'';}).join('');$('#bank-empty').hidden=count>0;
}
$('#bank-search').addEventListener('input',()=>renderBank($('#bank-search').value));renderBank();
window.addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==$('#lesson-model').contentWindow||!event.data||typeof event.data!=='object')return;
  const message=event.data;
  if(message.type==='robot-lab:ready'){
    labTransportReady=true;clearTimeout(modelTimeout);
    if(queuedConfiguration){const config=queuedConfiguration;queuedConfiguration=null;postModel(config);}
  }else if(message.type==='robot-lab:configured'&&message.character===activeCharacter){
    labReady=true;clearTimeout(modelTimeout);$('#model-pending').hidden=true;
  }else if(message.type==='robot-lab:selected'&&partNames[message.part]){
    modelIntent={part:message.part,action:'show'};
    stopAll();const label=$('#model-word');label.querySelector('b').textContent=message.word;label.querySelector('small').textContent=partNames[message.part];label.hidden=false;clearTimeout(modelWordTimer);modelWordTimer=setTimeout(()=>label.hidden=true,5000);void audio.speak(message.word,{slow:true});
  }
});
$('#lesson-model').addEventListener('load',()=>{labReady=false;labTransportReady=false;configureModel();postModel({type:'handbook:ping'});clearTimeout(modelTimeout);modelTimeout=setTimeout(()=>{if(!labReady){$('#model-pending b').textContent='3D 伙伴还在准备';$('#model-pending small').textContent='可以先听词，也可刷新页面重试。';}},25000);});
window.addEventListener('popstate',()=>renderWeek(new URLSearchParams(location.search).get('week')||1));
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAll();});
window.addEventListener('pagehide',event=>{stopAll();if(!event.persisted){audio.dispose();scenePlay.dispose();}});
window.handbook={get week(){return activeWeek.id;},get step(){return activeStep;},get character(){return activeCharacter;},get modelReady(){return labReady;},get audioState(){return audio.state;},get audioAvailable(){return audio.available;},get progress(){return JSON.parse(JSON.stringify(state));}};
renderWeek(new URLSearchParams(location.search).get('week')||state.lastWeek);
postModel({type:'handbook:ping'});
