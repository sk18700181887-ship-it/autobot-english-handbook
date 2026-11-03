// Adapted from the supplied 12-week learning plan. Each round is a conversation,
// with several valid choices, not a question with one factually correct answer.
// Keywords describe the answer domain; short words and full sentences both work.

export const missions = [
  {
    id: 'hello', week: 1, stage: 1, title: '你好，汽车人', englishTitle: 'Hello, Autobot!', icon: '👋',
    scene: '汽车人基地 · 新伙伴报到', intro: '和汽车人打个招呼，告诉伙伴你的名字。',
    words: [{ en: 'hello', zh: '你好' }, { en: 'hi', zh: '嗨' }, { en: 'bye', zh: '再见' }, { en: 'name', zh: '名字' }, { en: 'robot', zh: '机器人' }, { en: 'friend', zh: '朋友' }],
    rounds: [
      { id: 'hello-name', prompt: "Hello! I'm {character}. What's your name?", zh: '你好！我是{character}。你叫什么名字？', hint: '说出名字就可以，也可以说 My name is…', sample: 'My name is Alex.', choices: ["I'm Alex.", 'My name is Sam.', "I'm Leo."], kind: 'name', keywords: ['name', 'i am', "i'm"], followup: 'Hello, {name}! Welcome to our team.', followupZh: '你好，{name}！欢迎加入我们的小队。' },
      { id: 'hello-greeting', prompt: "It's a new day! How would you like to say hello?", zh: '新的一天开始啦！你想怎样打招呼？', hint: 'Hello、Hi 或 Good morning 都可以。', sample: 'Good morning!', choices: ['Hello!', 'Hi!', 'Good morning!'], kind: 'choice', keywords: ['hello', 'hi', 'good morning', 'hey'], followup: "Hello, friend! It's nice to hear your voice.", followupZh: '你好，朋友！听到你的声音真开心。' },
      { id: 'hello-friend', prompt: 'Would you like to be my friend?', zh: '你愿意和我做朋友吗？', hint: '愿意可以说 Yes；还没准备好也可以说 Not yet。', sample: 'Yes, please!', choices: ['Yes, please!', 'Yes, I would!', 'Not yet.'], kind: 'choice', keywords: ['yes', 'no', 'not yet', 'sure', 'friend', 'okay', 'ok'], followup: "Thank you for telling me. We can take our time.", followupZh: '谢谢你告诉我。我们可以慢慢来。' },
      { id: 'hello-goodbye', prompt: 'Our first mission is done! What would you like to say?', zh: '第一次任务完成啦！你想对我说什么？', hint: '可以道别，也可以说一句谢谢。', sample: 'See you!', choices: ['Bye-bye!', 'See you!', 'Thank you!'], kind: 'open', keywords: ['bye', 'goodbye', 'see you', 'thank you', 'thanks', 'good night', 'good job', 'high five'], followup: 'Great talking with you, {name}! See you on our next mission.', followupZh: '和你聊天真开心，{name}！下次任务再见。' }
    ]
  },
  {
    id: 'colors', week: 2, stage: 1, title: '汽车人的颜色', englishTitle: 'Colors of Autobots', icon: '🎨',
    scene: '装甲工坊 · 给小队换新装', intro: '你来当设计师，帮汽车人选择喜欢的颜色。',
    words: [{ en: 'red', zh: '红色' }, { en: 'blue', zh: '蓝色' }, { en: 'yellow', zh: '黄色' }, { en: 'green', zh: '绿色' }, { en: 'black', zh: '黑色' }, { en: 'white', zh: '白色' }, { en: 'silver', zh: '银色' }],
    rounds: [
      { id: 'colors-car', prompt: 'Let\'s paint a little car! What color would you like?', zh: '我们给一辆小车涂颜色吧！你喜欢什么颜色？', hint: '说颜色就行，也可以说 I like…', sample: 'I like yellow.', choices: ['I like yellow.', 'I like blue.', 'I like red.'], kind: 'open', keywords: ['red', 'blue', 'yellow', 'green', 'black', 'white', 'silver', 'orange', 'purple', 'pink', 'brown', 'gold', 'gray', 'grey'], followup: 'Nice choice! Your car will look wonderful.', followupZh: '选得不错！你的小车会很好看。' },
      { id: 'colors-armor', prompt: 'Would you like red or blue armor? You can pick another color too.', zh: '你想要红色还是蓝色装甲？也可以选别的颜色。', hint: '试试说 Red armor 或 Blue armor。', sample: 'Blue armor, please.', choices: ['Red armor, please.', 'Blue armor, please.', 'Yellow armor, please.'], kind: 'choice', keywords: ['red', 'blue', 'yellow', 'green', 'black', 'white', 'silver', 'orange', 'purple', 'pink', 'brown', 'gold', 'gray', 'grey'], followup: 'That will be your special armor color!', followupZh: '这就是你的专属装甲颜色啦！' },
      { id: 'colors-wheels', prompt: 'What color shall we use for the wheels?', zh: '我们给轮子选什么颜色？', hint: '黑色、银色、白色，或者你喜欢的其他颜色。', sample: 'Silver wheels!', choices: ['Black wheels!', 'Silver wheels!', 'White wheels!'], kind: 'open', keywords: ['red', 'blue', 'yellow', 'green', 'black', 'white', 'silver', 'orange', 'purple', 'pink', 'brown', 'gold', 'gray', 'grey'], followup: 'I like your idea. The wheels are ready!', followupZh: '我喜欢你的主意。轮子准备好啦！' },
      { id: 'colors-flag', prompt: 'Our team needs a flag. What color is your flag?', zh: '小队需要一面旗。你的旗是什么颜色？', hint: '可以说 It is…，说一个颜色也很好。', sample: "It's green.", choices: ["It's green.", "It's yellow.", "It's blue."], kind: 'open', keywords: ['red', 'blue', 'yellow', 'green', 'black', 'white', 'silver', 'orange', 'purple', 'pink', 'brown', 'gold', 'gray', 'grey'], followup: 'Your flag is ready. Let\'s show it to our team!', followupZh: '你的旗做好啦。给小队看看吧！' }
    ]
  },
  {
    id: 'numbers', week: 3, stage: 1, title: '数一数汽车人', englishTitle: 'Count the Autobots', icon: '🔢',
    scene: '出发平台 · 小队集合', intro: '一起准备车辆和能量星，用英语说说数量。',
    words: [{ en: 'one', zh: '一' }, { en: 'two', zh: '二' }, { en: 'three', zh: '三' }, { en: 'four', zh: '四' }, { en: 'five', zh: '五' }, { en: 'six', zh: '六' }, { en: 'seven', zh: '七' }, { en: 'eight', zh: '八' }, { en: 'nine', zh: '九' }, { en: 'ten', zh: '十' }],
    rounds: [
      { id: 'numbers-cars', prompt: 'How many cars shall we take? One, two, or three?', zh: '我们带几辆车出发？一辆、两辆，还是三辆？', hint: '你来决定。说数字或 Two cars 都可以。', sample: 'Two cars.', choices: ['One car.', 'Two cars.', 'Three cars.'], kind: 'choice', keywords: ['one', 'two', 'three', '1', '2', '3'], followup: 'Good plan! Let\'s get our cars ready.', followupZh: '好计划！我们把车准备好。' },
      { id: 'numbers-team', prompt: 'How many robots would you like on our team? Pick a number from one to ten.', zh: '你想让小队有几个机器人？从一到十选个数字。', hint: 'One 到 Ten，选你喜欢的数量。', sample: 'Five robots.', choices: ['Four robots.', 'Five robots.', 'Six robots.'], kind: 'open', keywords: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], followup: 'Team size set! Every friend has a place.', followupZh: '小队人数确定啦！每个朋友都有自己的位置。' },
      { id: 'numbers-stars', prompt: 'How many energy stars would you like? Four, five, or six?', zh: '你想带几颗能量星？四颗、五颗，还是六颗？', hint: '试试用数字加 stars 来回答。', sample: 'Six stars, please.', choices: ['Four stars, please.', 'Five stars, please.', 'Six stars, please.'], kind: 'choice', keywords: ['four', 'five', 'six', '4', '5', '6'], followup: 'Here are your energy stars. Ready to roll!', followupZh: '能量星给你。准备出发！' },
      { id: 'numbers-code', prompt: 'Choose a secret number: seven, eight, nine, or ten!', zh: '选一个秘密数字：七、八、九，或者十！', hint: '把你选的数字说出来，就是我们的小队密码。', sample: 'Ten!', choices: ['Seven!', 'Eight!', 'Ten!'], kind: 'choice', keywords: ['seven', 'eight', 'nine', 'ten', '7', '8', '9', '10'], followup: 'Secret code saved. Great teamwork, {name}!', followupZh: '秘密数字记住啦。合作愉快，{name}！' }
    ]
  },
  {
    id: 'sizes', week: 4, stage: 1, title: '大还是小', englishTitle: 'Big or Small', icon: '🚚',
    scene: '车辆设计台 · 打造专属战车', intro: '大车还是小车？快一点还是慢一点？由你来选。',
    words: [{ en: 'big', zh: '大' }, { en: 'small', zh: '小' }, { en: 'long', zh: '长' }, { en: 'short', zh: '短' }, { en: 'tall', zh: '高' }, { en: 'fast', zh: '快' }, { en: 'slow', zh: '慢' }],
    rounds: [
      { id: 'sizes-car', prompt: 'Would you like a big car or a small car?', zh: '你想要一辆大车，还是一辆小车？', hint: '说 Big、Small，或 A big car 都可以。', sample: 'A big car, please.', choices: ['A big car, please.', 'A small car, please.', 'Small, please.'], kind: 'choice', keywords: ['big', 'small', 'little', 'tiny', 'large'], followup: 'Great! We can make a car just for you.', followupZh: '好呀！我们给你造一辆专属的车。' },
      { id: 'sizes-speed', prompt: 'On our pretend road, shall we go fast or slow?', zh: '在想象的道路上，我们开快一点还是慢一点？', hint: 'Fast 是快，Slow 是慢。你来决定。', sample: "Let's go slow.", choices: ["Let's go fast.", "Let's go slow.", 'Slow, please.'], kind: 'choice', keywords: ['fast', 'slow', 'slowly', 'quick', 'quickly'], followup: 'I\'ll follow your plan. Let\'s drive together!', followupZh: '我听你的计划。我们一起开车吧！' },
      { id: 'sizes-bridge', prompt: 'Our toy road needs a bridge. Shall we make it long or short?', zh: '玩具道路需要一座桥。我们搭长一点还是短一点？', hint: '试试 Long 或 Short。', sample: 'A long bridge.', choices: ['A long bridge.', 'A short bridge.', 'Short, please.'], kind: 'choice', keywords: ['long', 'short'], followup: 'The bridge is ready. Your idea helped our team!', followupZh: '桥搭好啦。你的主意帮到了小队！' },
      { id: 'sizes-robot', prompt: 'Tell me about your dream robot. Is it big, small, or tall?', zh: '说说你梦想中的机器人。它大、小，还是很高？', hint: '用 It is… 描述你的机器人。', sample: "It's tall.", choices: ["It's big.", "It's small.", "It's tall."], kind: 'open', keywords: ['big', 'small', 'tall', 'little', 'tiny', 'large', 'short', 'long', 'strong', 'fast', 'slow'], followup: 'What a wonderful robot! I\'d like to meet it.', followupZh: '真是个很棒的机器人！我想见见它。' }
    ]
  },
  {
    id: 'family', week: 5, stage: 2, title: '我的家庭小队', englishTitle: 'My Family Team', icon: '🏡',
    scene: '温暖休息站 · 认识你的家人', intro: '介绍一个你愿意分享的家人，把爱说给小队听。',
    words: [{ en: 'mommy', zh: '妈妈' }, { en: 'daddy', zh: '爸爸' }, { en: 'grandma', zh: '奶奶／外婆' }, { en: 'grandpa', zh: '爷爷／外公' }, { en: 'baby', zh: '宝宝' }, { en: 'family', zh: '家人' }],
    rounds: [
      { id: 'family-intro', prompt: 'Who is on your family team? Tell me about one person.', zh: '你的家庭小队里有谁？介绍一个人吧。', hint: '可以说 My mom、My dad 或其他家人的称呼。', sample: 'This is my mom.', choices: ['This is my mom.', 'This is my dad.', 'This is my grandma.'], kind: 'open', keywords: ['mom', 'mommy', 'mum', 'mummy', 'mother', 'dad', 'daddy', 'father', 'grandma', 'grandmother', 'grandpa', 'grandfather', 'sister', 'brother', 'baby', 'aunt', 'uncle', 'cousin', 'family'], followup: 'It\'s lovely to hear about your family.', followupZh: '听你介绍家人真开心。' },
      { id: 'family-more', prompt: 'Would you like to tell me about another family member?', zh: '你还想介绍另一位家人吗？', hint: '说一个家人称呼；不想分享也可以说 Not now。', sample: 'My grandpa.', choices: ['My grandpa.', 'My sister.', 'Not now.'], kind: 'open', keywords: ['mom', 'mommy', 'mum', 'mummy', 'mother', 'dad', 'daddy', 'father', 'grandma', 'grandmother', 'grandpa', 'grandfather', 'sister', 'brother', 'baby', 'aunt', 'uncle', 'cousin', 'family', 'not now', 'no', 'not yet'], followup: 'Thank you, {name}. You can share as much as you like.', followupZh: '谢谢你，{name}。你愿意分享多少都可以。' },
      { id: 'family-love', prompt: 'What would you like to say to someone you love?', zh: '你想对喜欢的家人说什么？', hint: '可以说 I love you，也可以说 Thank you。', sample: 'I love you!', choices: ['I love you!', 'I love my family.', 'Thank you!'], kind: 'open', keywords: ['love', 'thank you', 'thanks', 'hello', 'hi', 'hug', 'miss you'], followup: 'Those are warm words. Your family is special to you.', followupZh: '真温暖的话。家人对你很特别。' },
      { id: 'family-greeting', prompt: 'Our team is waving to your family! How would you like to greet us?', zh: '小队向你的家人挥手啦！你想怎么回应？', hint: '选一句问候语，和家人一起说也可以。', sample: 'Hello, team!', choices: ['Hello, team!', 'Hi, friends!', 'Good morning!'], kind: 'choice', keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'welcome'], followup: 'Hello, everyone! There is room for you on our team.', followupZh: '大家好！我们的小队欢迎你们。' }
    ]
  },
  {
    id: 'body', week: 6, stage: 2, title: '让身体变形', englishTitle: 'Transform Your Body', icon: '🤖',
    scene: '变形训练营 · 动动身体', intro: '跟伙伴聊聊身体动作，能做就轻轻试一试。',
    words: [{ en: 'head', zh: '头' }, { en: 'hand', zh: '手' }, { en: 'arm', zh: '胳膊' }, { en: 'leg', zh: '腿' }, { en: 'eye', zh: '眼睛' }, { en: 'ear', zh: '耳朵' }, { en: 'mouth', zh: '嘴巴' }],
    rounds: [
      { id: 'body-head', prompt: 'Can you touch your head?', zh: '你能摸摸自己的头吗？', hint: '能就说 Yes, I can；不想做也可以说 Not now。', sample: 'Yes, I can!', choices: ['Yes, I can!', 'Not now.', "No, I can't."], kind: 'choice', keywords: ['yes', 'no', 'not now', 'not yet', 'can', "can't", 'cannot', 'head'], followup: 'Thanks for telling me. You can move in your own way.', followupZh: '谢谢你告诉我。用你舒服的方式动一动就好。' },
      { id: 'body-wave', prompt: 'What shall we wave: a hand or an arm?', zh: '我们挥一挥什么？手，还是胳膊？', hint: 'Hand 是手，Arm 是胳膊。', sample: 'My hand!', choices: ['My hand!', 'My arm!', 'Both hands!'], kind: 'choice', keywords: ['hand', 'hands', 'arm', 'arms', 'both'], followup: 'Hello, friend! I\'m waving back to you.', followupZh: '你好，朋友！我也向你挥手啦。' },
      { id: 'body-jump', prompt: 'Can you jump? You can just tell me.', zh: '你会跳吗？告诉我就好。', hint: '可以说 Yes, I can 或 No, I can\'t，不用真的跳。', sample: 'Yes, I can!', choices: ['Yes, I can!', "No, I can't.", 'Not today.'], kind: 'choice', keywords: ['yes', 'no', 'not today', 'not now', 'can', "can't", 'cannot', 'jump'], followup: 'Good talking! Every robot has different moves.', followupZh: '说得好！每个机器人都有不一样的动作。' },
      { id: 'body-draw', prompt: 'Let\'s draw a robot face. Shall we draw eyes, ears, or a mouth first?', zh: '我们画一张机器人脸。先画眼睛、耳朵，还是嘴巴？', hint: '选你想先画的部位，说一个词就可以。', sample: 'Eyes first!', choices: ['Eyes first!', 'Ears first!', 'A mouth!'], kind: 'choice', keywords: ['eye', 'eyes', 'ear', 'ears', 'mouth', 'head'], followup: 'Great idea! Our robot face is coming together.', followupZh: '好主意！机器人的脸慢慢画出来啦。' }
    ]
  },
  {
    id: 'food', week: 7, stage: 2, title: '加能量', englishTitle: 'Fuel Up', icon: '🍎',
    scene: '汽车人餐厅 · 补充能量', intro: '假装一起点餐，练习表达想要什么和礼貌用语。',
    words: [{ en: 'milk', zh: '牛奶' }, { en: 'water', zh: '水' }, { en: 'egg', zh: '鸡蛋' }, { en: 'rice', zh: '米饭' }, { en: 'apple', zh: '苹果' }, { en: 'banana', zh: '香蕉' }, { en: 'bread', zh: '面包' }, { en: 'yummy', zh: '好吃' }],
    rounds: [
      { id: 'food-drink', prompt: 'Welcome to our pretend cafe! What would you like to drink?', zh: '欢迎来到想象餐厅！你想喝什么？', hint: '试试 I want water，或者 Milk, please。', sample: 'Water, please.', choices: ['Water, please.', 'Milk, please.', 'Juice, please.'], kind: 'open', keywords: ['water', 'milk', 'juice', 'tea', 'cocoa', 'chocolate', 'nothing'], followup: 'Coming right up! We can share a quiet break.', followupZh: '马上就来！我们一起休息一会儿。' },
      { id: 'food-snack', prompt: 'What would you like to eat?', zh: '你想吃什么？', hint: '苹果、香蕉、面包，或者说出你喜欢的其他食物。', sample: 'I want an apple.', choices: ['I want an apple.', 'A banana, please.', 'Bread, please.'], kind: 'open', keywords: ['apple', 'banana', 'bread', 'egg', 'eggs', 'rice', 'noodle', 'noodles', 'sandwich', 'cake', 'cookie', 'cookies', 'carrot', 'orange', 'fruit', 'fish', 'chicken', 'pizza', 'nothing'], followup: 'Here you are! Enjoy your pretend snack.', followupZh: '给你！享用你的想象点心吧。' },
      { id: 'food-thanks', prompt: 'Here you are! Your snack is ready.', zh: '给你！你的点心准备好啦。', hint: '收到别人递来的东西，可以说 Thank you。', sample: 'Thank you!', choices: ['Thank you!', 'Thanks!', 'Thank you, friend!'], kind: 'choice', keywords: ['thank you', 'thanks', 'thank', 'yummy', 'please'], followup: 'You\'re welcome, {name}!', followupZh: '不客气，{name}！' },
      { id: 'food-welcome', prompt: 'Thank you for helping in our cafe!', zh: '谢谢你来餐厅帮忙！', hint: '别人向你道谢，可以说 You\'re welcome。', sample: "You're welcome!", choices: ["You're welcome!", 'No problem!', 'My pleasure!'], kind: 'choice', keywords: ['welcome', 'no problem', 'my pleasure', 'anytime', 'okay', 'ok'], followup: 'We make a lovely team. Cafe mission complete!', followupZh: '我们合作得真好。餐厅任务完成！' }
    ]
  },
  {
    id: 'feelings', week: 8, stage: 2, title: '你感觉怎么样', englishTitle: 'How Do You Feel?', icon: '☀️',
    scene: '心情能量站 · 听听你的心情', intro: '开心、难过、想休息，都可以告诉伙伴。',
    words: [{ en: 'happy', zh: '开心' }, { en: 'sad', zh: '难过' }, { en: 'angry', zh: '生气' }, { en: 'scared', zh: '害怕' }, { en: 'tired', zh: '累' }, { en: 'brave', zh: '勇敢' }, { en: 'sunny', zh: '晴天' }, { en: 'rainy', zh: '下雨' }],
    rounds: [
      { id: 'feelings-now', prompt: 'Hello, {name}. How are you today?', zh: '你好，{name}。你今天感觉怎么样？', hint: '可以说 I\'m happy、I\'m sad，或者其他心情。', sample: "I'm happy.", choices: ["I'm happy.", "I'm tired.", "I'm sad."], kind: 'open', keywords: ['happy', 'sad', 'angry', 'scared', 'tired', 'brave', 'excited', 'fine', 'good', 'great', 'okay', 'ok', 'bad', 'sleepy', 'hungry', 'worried', 'nervous'], followup: 'Thank you for sharing. I\'m here with you.', followupZh: '谢谢你分享心情。我在这里陪着你。' },
      { id: 'feelings-weather', prompt: 'What\'s the weather like today?', zh: '今天的天气怎么样？', hint: '晴天说 Sunny，下雨说 Rainy，也可以说其他天气。', sample: "It's sunny.", choices: ["It's sunny.", "It's rainy.", "It's cloudy."], kind: 'open', keywords: ['sunny', 'rainy', 'cloudy', 'snowy', 'windy', 'rain', 'snow', 'hot', 'cold', 'warm', 'cool', 'stormy'], followup: 'Thanks for the weather report! We can plan our day.', followupZh: '谢谢你的天气播报！我们可以安排今天的任务啦。' },
      { id: 'feelings-mission', prompt: 'When you start a new mission, do you feel excited, brave, or a little scared?', zh: '开始新任务时，你觉得兴奋、勇敢，还是有点害怕？', hint: '没有标准心情，告诉我你自己的感觉。', sample: "I'm a little scared.", choices: ["I'm excited!", "I'm brave.", "I'm a little scared."], kind: 'open', keywords: ['happy', 'sad', 'angry', 'scared', 'tired', 'brave', 'excited', 'fine', 'good', 'great', 'okay', 'ok', 'bad', 'sleepy', 'worried', 'nervous', 'afraid'], followup: 'All feelings are welcome. We can try together.', followupZh: '每一种心情都可以。我们可以一起试试。' },
      { id: 'feelings-rest', prompt: 'Would you like to rest or play now?', zh: '现在你想休息，还是想玩？', hint: 'Rest 是休息，Play 是玩。', sample: "Let's rest.", choices: ["Let's rest.", "Let's play!", 'A little rest, please.'], kind: 'choice', keywords: ['rest', 'play', 'break', 'sleep', 'wait'], followup: 'I\'ll follow your choice. Thanks for telling me what you need.', followupZh: '我听你的选择。谢谢你告诉我你需要什么。' }
    ]
  },
  {
    id: 'places', week: 9, stage: 3, title: '车在哪里', englishTitle: 'Where Is the Car?', icon: '📦',
    scene: '玩具秘密基地 · 一起藏小车', intro: '在想象的房间里安排玩具，用英语说出位置。',
    words: [{ en: 'in', zh: '里面' }, { en: 'on', zh: '上面' }, { en: 'under', zh: '下面' }, { en: 'here', zh: '这里' }, { en: 'there', zh: '那里' }, { en: 'box', zh: '盒子' }, { en: 'table', zh: '桌子' }, { en: 'bed', zh: '床' }],
    rounds: [
      { id: 'places-park', prompt: 'Where shall we park our toy car?', zh: '我们把玩具小车停在哪里？', hint: '试试 In the box、On the table 或 Under the bed。', sample: 'In the box.', choices: ['In the box.', 'On the table.', 'Under the bed.'], kind: 'open', keywords: ['in', 'on', 'under', 'here', 'there', 'box', 'table', 'bed', 'floor', 'shelf', 'garage'], followup: 'A good parking place! Let\'s put our toy car there.', followupZh: '好停车位！我们把玩具小车放在那里。' },
      { id: 'places-energy', prompt: 'Let\'s hide an energy star in our pretend room. Where can it go?', zh: '在想象房间里藏一颗能量星吧。可以藏在哪里？', hint: '你来选位置，可以用 On 或 Under 开头。', sample: 'Under the table.', choices: ['Under the table.', 'On the bed.', 'In the box.'], kind: 'open', keywords: ['in', 'on', 'under', 'here', 'there', 'box', 'table', 'bed', 'floor', 'shelf', 'car'], followup: 'Secret hiding place set! I\'ll remember your idea.', followupZh: '秘密藏身处选好啦！我会记住你的主意。' },
      { id: 'places-base', prompt: 'Our little toy robot needs a home. Where shall it stay?', zh: '玩具小机器人需要一个家。让它住在哪里？', hint: '可以说 In the box，也可以选择别的地方。', sample: 'On the shelf.', choices: ['In the box.', 'On the table.', 'On the shelf.'], kind: 'open', keywords: ['in', 'on', 'under', 'here', 'there', 'box', 'table', 'bed', 'floor', 'shelf', 'home', 'house', 'garage'], followup: 'That can be its cozy home. Thank you for helping!', followupZh: '那里可以当它温暖的家。谢谢你帮忙！' },
      { id: 'places-point', prompt: 'Point to a pretend parking spot. Is it here or there?', zh: '指一个想象中的停车位。是在这里，还是那里？', hint: 'Here 是这里，There 是那里。选一个就好。', sample: "It's here!", choices: ["It's here!", "It's there!", 'Over there!'], kind: 'choice', keywords: ['here', 'there'], followup: 'I see your parking spot! Our little cars have a home.', followupZh: '我知道你选的停车位啦！小车们有家了。' }
    ]
  },
  {
    id: 'vehicles', week: 10, stage: 3, title: '路上的玩具', englishTitle: 'Toys on the Road', icon: '🚌',
    scene: '玩具交通城 · 选择你的座驾', intro: '小汽车、卡车、飞机，选一种工具一起出发。',
    words: [{ en: 'car', zh: '小汽车' }, { en: 'truck', zh: '卡车' }, { en: 'bus', zh: '公交车' }, { en: 'bike', zh: '自行车' }, { en: 'plane', zh: '飞机' }, { en: 'train', zh: '火车' }, { en: 'boat', zh: '船' }, { en: 'toy', zh: '玩具' }],
    rounds: [
      { id: 'vehicles-drive', prompt: 'Welcome to our toy city! What would you like to drive?', zh: '欢迎来到玩具城！你想开什么车？', hint: '可以说 A car、A truck 或 A bus。', sample: 'A truck, please.', choices: ['A car, please.', 'A truck, please.', 'A bus, please.'], kind: 'open', keywords: ['car', 'truck', 'bus', 'bike', 'bicycle', 'train', 'boat', 'plane', 'airplane', 'motorcycle', 'van', 'taxi', 'ship'], followup: 'Your ride is ready! Let\'s explore our toy city.', followupZh: '你的座驾准备好啦！我们去逛逛玩具城。' },
      { id: 'vehicles-toy', prompt: 'Tell me about a toy vehicle you have, or one you would like.', zh: '说说你有的玩具车，或者你想要的一种。', hint: '试试 I have a car 或 I want a train。', sample: 'I have a car.', choices: ['I have a car.', 'I want a train.', 'I have a boat.'], kind: 'open', keywords: ['car', 'truck', 'bus', 'bike', 'bicycle', 'train', 'boat', 'plane', 'airplane', 'motorcycle', 'van', 'taxi', 'ship', 'none', 'no toys', "don't have"], followup: 'Thanks for sharing! Imaginary toys can join our mission too.', followupZh: '谢谢你分享！想象中的玩具也可以加入任务。' },
      { id: 'vehicles-fly', prompt: 'Let\'s imagine flying! Would you choose a plane, a helicopter, or a flying car?', zh: '想象我们飞起来啦！你选飞机、直升机，还是飞行汽车？', hint: '说出你想坐的飞行工具。', sample: 'A flying car!', choices: ['A plane!', 'A helicopter!', 'A flying car!'], kind: 'choice', keywords: ['plane', 'airplane', 'helicopter', 'flying car', 'car', 'rocket', 'jet'], followup: 'Up we go in our imagination! What a fun ride.', followupZh: '想象中，我们飞起来啦！真有趣。' },
      { id: 'vehicles-next', prompt: 'Our toy trip has one more stop. What shall we ride next?', zh: '玩具旅行还有最后一站。下一程我们坐什么？', hint: '试试用 Let\'s take a…，也可以只说交通工具。', sample: "Let's take a train.", choices: ["Let's take a train.", "Let's take a bus.", "Let's take a boat."], kind: 'open', keywords: ['car', 'truck', 'bus', 'bike', 'bicycle', 'train', 'boat', 'plane', 'airplane', 'helicopter', 'rocket', 'ship', 'walk'], followup: 'Great travel plan, {name}! Toy city mission complete.', followupZh: '很棒的旅行计划，{name}！玩具城任务完成。' }
    ]
  },
  {
    id: 'rollout', week: 11, stage: 3, title: '出发吧', englishTitle: "Let's Roll Out", icon: '🚀',
    scene: '任务发射台 · 小队合作出发', intro: '准备、等待、求助和再来一次，学会表达自己的选择。',
    words: [{ en: 'go', zh: '走' }, { en: 'come', zh: '来' }, { en: 'look', zh: '看' }, { en: 'wait', zh: '等' }, { en: 'help', zh: '帮忙' }, { en: 'ready', zh: '准备好' }, { en: 'again', zh: '再一次' }],
    rounds: [
      { id: 'rollout-ready', prompt: 'Our team has a new mission. Are you ready?', zh: '小队有一个新任务。你准备好了吗？', hint: 'Ready 是准备好了；还需要时间就说 Not yet。', sample: "I'm ready!", choices: ["I'm ready!", 'Yes, ready!', 'Not yet.'], kind: 'choice', keywords: ['ready', 'yes', 'no', 'not yet', 'wait', 'not now'], followup: 'Thanks for telling me. We can move at your pace.', followupZh: '谢谢你告诉我。我们按你的节奏来。' },
      { id: 'rollout-go', prompt: 'Shall we go now, or wait a little?', zh: '我们现在出发，还是再等一会儿？', hint: '想出发就说 Let\'s go；想等就说 Wait, please。', sample: "Let's go!", choices: ["Let's go!", 'Wait, please.', "Let's wait."], kind: 'choice', keywords: ['go', 'wait', 'stop', 'stay', 'ready'], followup: 'I hear your plan. We\'ll stay together.', followupZh: '我听到你的计划啦。我们一起行动。' },
      { id: 'rollout-help', prompt: 'I need help with our pretend gate. Can you help me, please?', zh: '想象基地的门需要帮忙。你愿意帮帮我吗？', hint: '愿意可以说 I can help；暂时不愿意也可以说 Not now。', sample: 'I can help!', choices: ['I can help!', 'Yes, I can!', 'Not now.'], kind: 'choice', keywords: ['help', 'yes', 'no', 'not now', 'not yet', 'can', "can't", 'cannot'], followup: 'Thank you for your answer. Teamwork means listening to each other.', followupZh: '谢谢你的回答。合作也包括听听彼此的想法。' },
      { id: 'rollout-again', prompt: 'That was our pretend mission! Would you like to play again?', zh: '想象任务结束啦！你想再玩一次吗？', hint: '再来一次说 Again, please；想结束可以说 No, thank you。', sample: 'Again, please!', choices: ['Again, please!', 'Yes, please!', 'No, thank you.'], kind: 'choice', keywords: ['again', 'yes', 'no', 'stop', 'rest', 'bye', 'finish', 'done'], followup: 'Thanks, partner! You can choose your next adventure.', followupZh: '谢谢你，伙伴！下一段冒险由你来选。' }
    ]
  },
  {
    id: 'hero', week: 12, stage: 3, title: '我能做到', englishTitle: 'I Can Do It!', icon: '⭐',
    scene: '英雄庆典 · 为勇敢开口击掌', intro: '说说你会做什么，遇到困难也可以求助和再试一次。',
    words: [{ en: 'can', zh: '能' }, { en: 'try', zh: '试试' }, { en: 'strong', zh: '强壮' }, { en: 'hero', zh: '英雄' }, { en: 'good job', zh: '干得好' }, { en: 'mission', zh: '任务' }, { en: 'complete', zh: '完成' }],
    rounds: [
      { id: 'hero-can', prompt: 'You have so many ideas, {name}! What can you do?', zh: '你有好多主意呀，{name}！你会做什么？', hint: '试试 I can jump、I can run 或 I can help。', sample: 'I can help!', choices: ['I can jump!', 'I can run!', 'I can help!'], kind: 'open', keywords: ['jump', 'run', 'help', 'wave', 'dance', 'draw', 'sing', 'walk', 'count', 'try', 'touch', 'play', 'read', 'swim', 'ride', 'build', 'speak', 'talk', 'listen', 'clap', 'skip'], followup: 'That\'s something to be proud of. Thank you for telling me!', followupZh: '这值得为自己高兴。谢谢你告诉我！' },
      { id: 'hero-try', prompt: 'A mission can feel hard. What could you say when you want to try again?', zh: '任务有时会有点难。想再试一次时，可以怎么说？', hint: '试试 I can try again，也可以说 Help me, please。', sample: 'I can try again!', choices: ['I can try again!', "Let's try again!", 'Help me, please.'], kind: 'open', keywords: ['try', 'again', 'help', 'one more', 'can do', 'do it'], followup: 'We can take one small step together. You don\'t have to do it alone.', followupZh: '我们可以一起迈出一小步。你不用一个人完成。' },
      { id: 'hero-help', prompt: 'Would you like some help on your next mission?', zh: '下一次任务，你想要伙伴帮忙吗？', hint: '需要就说 Yes, please；想先自己试就说 I can try。', sample: 'Yes, please.', choices: ['Yes, please.', 'I can try.', 'No, thank you.'], kind: 'choice', keywords: ['yes', 'no', 'help', 'try', 'myself', 'own', 'together', 'please', 'can'], followup: 'I hear you. Asking for help and trying yourself are both okay.', followupZh: '我听到啦。请人帮忙和自己尝试，都很好。' },
      { id: 'hero-finish', prompt: 'Mission complete, {name}! What would you like to say to our team?', zh: '任务完成，{name}！你想对小队说什么？', hint: '可以说 Thank you、Good job 或 High five。', sample: 'High five, team!', choices: ['Thank you, team!', 'Good job!', 'High five!'], kind: 'open', keywords: ['thank you', 'thanks', 'good job', 'high five', 'bye', 'see you', 'mission complete', 'complete', 'love', 'hero', 'we did it', 'well done', 'great', 'awesome'], followup: 'High five, {name}! I loved talking with you. See you on our next adventure!', followupZh: '击掌，{name}！我很喜欢和你聊天。下一段冒险再见！' }
    ]
  }
];
