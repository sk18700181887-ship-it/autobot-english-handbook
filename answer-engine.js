/** Small, deterministic English answer helper. It checks meaning words, not pronunciation. */
const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const ALIASES = new Map([
  ['hi', 'hello'], ['hey', 'hello'], ['yeah', 'yes'], ['yep', 'yes'],
  ['yup', 'yes'], ['nope', 'no'], ['bye', 'goodbye'], ['thanks', 'thank you'],
  ['ok', 'okay'], ['colour', 'color'], ['favourite', 'favorite'],
]);

function expand(value) {
  return String(value ?? '').normalize('NFKC').toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\bi'm\b/g, 'i am')
    .replace(/\b(it|that|he|she|there|what|who)'s\b/g, '$1 is')
    .replace(/\b(you|we|they)'re\b/g, '$1 are')
    .replace(/\b(i|you|we|they)'ve\b/g, '$1 have')
    .replace(/\bcan't\b/g, 'can not')
    .replace(/\bcannot\b/g, 'can not')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\b(don|doesn|didn|isn|aren|wasn|weren|couldn|wouldn|shouldn)'t\b/g, (_, stem) => ({ don: 'do', doesn: 'does', didn: 'did', isn: 'is', aren: 'are', wasn: 'was', weren: 'were', couldn: 'could', wouldn: 'would', shouldn: 'should' })[stem] + ' not');
}

/** Punctuation, contractions and spoken/written numbers share one comparison form. */
export function normalize(value) {
  return expand(value).replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)
    .map(word => /^\d+$/.test(word) && Number(word) <= 10 ? NUMBER_WORDS[Number(word)] : (ALIASES.get(word) ?? word))
    .join(' ').replace(/\s+/g, ' ').trim();
}

function hasPhrase(text, phrase) {
  return phrase !== '' && (` ${text} `).includes(` ${phrase} `);
}

function example(round) {
  const value = typeof round?.sample === 'string' ? round.sample : round?.choices?.find(value => typeof value === 'string');
  return value ? `试试说：“${value}”` : '试着用一句简短英文回答。';
}

function reject(round, message, answer = '') {
  return { accepted: false, answer, reason: `${message}${example(round)}` };
}

function assessName(round, answer) {
  if (/[\u3400-\u9fff]/u.test(answer)) {
    return reject(round, '给自己取一个英文昵称就可以，不用真实姓名。', answer);
  }
  const plain = answer.normalize('NFKC').replace(/[’‘]/g, "'")
    .replace(/^(?:hello|hi|hey)[,!\s]+/i, '').replace(/[.!?,]+$/g, '').trim();
  const name = plain.replace(/^(?:my name is|i am|i'm|call me)\s+/i, '').trim();
  const nameWords = name.toLowerCase().split(/\s+/);
  const disallowed = new Set(['i', 'am', 'is', 'are', 'my', 'name', 'like', 'want', 'have', 'can', 'not', 'yes', 'no', 'hello', 'hi', 'please', 'thank', 'thanks', 'fine', 'good', 'okay', 'ok', 'ready', 'hungry', 'tired', ...NUMBER_WORDS]);
  if (name.length > 40 || nameWords.length > 3 || !/^[a-z][a-z0-9'-]*(?:\s+[a-z][a-z0-9'-]*){0,2}$/i.test(name) || nameWords.some(word => disallowed.has(word))) {
    return reject(round, '告诉我你想用的英文昵称吧。', answer);
  }
  return { accepted: true, answer, name };
}

/**
 * @param {{kind?:string, choices?:string[], sample?:string, keywords?:string[]}} round
 * @param {string} text
 * @returns {{accepted:boolean, answer:string, name?:string, reason?:string}}
 */
export function assessAnswer(round, text) {
  if (typeof text !== 'string') return reject(round, '还没有听到你的回答。');
  const answer = text.trim();
  if (!answer) return reject(round, '还没有听到你的回答。');
  if (answer.length > 180) return reject(round, '一句短短的英文就够啦。');
  if (/[<>`{}\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(answer) || /https?:\/\//i.test(answer)) {
    return reject(round, '我们先用一句简单英文回答吧。');
  }
  if (round?.kind === 'name') return assessName(round, answer);

  const value = normalize(answer);
  if (!value || !/[a-z]/.test(value)) return reject(round, '用英文说说你的想法吧。', answer);
  const choices = Array.isArray(round?.choices) ? round.choices.filter(choice => typeof choice === 'string').map(normalize) : [];
  if (choices.includes(value)) return { accepted: true, answer };

  const keywords = Array.isArray(round?.keywords) ? round.keywords.filter(word => typeof word === 'string').map(normalize).filter(Boolean) : [];
  const allowsNo = keywords.includes('no');
  if (keywords.includes('yes') && /^(?:(?:yes )?i (?:can|do|am|will)|sure|of course)$/.test(value)) return { accepted: true, answer };
  if (allowsNo && /^(?:i )?(?:can|do|am|will) not(?: now| yet| today)?$/.test(value)) return { accepted: true, answer };
  // Each short clause is handled independently: “not red” is not a positive red answer,
  // while “not red, I like blue” can still communicate a valid blue preference.
  const clauses = expand(answer).split(/[,.!?;\n]+|\b(?:but|however|instead)\b/).map(normalize).filter(Boolean);
  const negativePattern = /\b(?:not|no|never|neither|nor|without|nothing|none|hate|hates|dislike|dislikes)\b/;
  const accepted = clauses.some(clause => keywords.some(keyword => {
    if (!hasPhrase(clause, keyword)) return false;
    // Very general helper words can be short replies, but must not validate any
    // unrelated sentence merely because it happens to contain “can” or “please”.
    if (keyword === 'can' && !/^(?:yes )?(?:i )?can$/.test(value)) return false;
    if (keyword === 'please' && value !== 'please') return false;
    // A negative answer is valid only when its vocabulary is explicitly offered.
    if (negativePattern.test(keyword)) return true;
    // If the question explicitly permits “no”, a relevant negative reply such as
    // “I'm not ready” or “I don't need help” communicates that choice too.
    if (allowsNo && keyword !== 'yes' && negativePattern.test(clause)) return true;
    return !negativePattern.test(clause);
  }));
  if (accepted) return { accepted: true, answer };

  const sample = normalize(round?.sample);
  if (sample && sample === value) return { accepted: true, answer };
  return reject(round, '我们再跟着这句试一次，你可以换成自己喜欢的答案。', answer);
}
