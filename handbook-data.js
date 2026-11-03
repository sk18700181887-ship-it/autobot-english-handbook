// Source vocabulary and patterns preserved from the supplied family learning plan.
const sourceWeeks = [
  {
    "id": 1,
    "title": "你好，汽车人",
    "englishTitle": "Hello, Autobot!",
    "stage": 1,
    "goal": "愿意用英语说出自己的名字",
    "words": [
      {
        "en": "hello",
        "zh": "你好"
      },
      {
        "en": "hi",
        "zh": "嗨"
      },
      {
        "en": "bye",
        "zh": "再见"
      },
      {
        "en": "name",
        "zh": "名字"
      },
      {
        "en": "robot",
        "zh": "机器人"
      },
      {
        "en": "friend",
        "zh": "朋友"
      }
    ],
    "patterns": [
      {
        "en": "Hello! I'm Optimus.",
        "zh": "你好，我是擎天柱。"
      },
      {
        "en": "What's your name?",
        "zh": "你叫什么名字？"
      },
      {
        "en": "My name is Bumblebee.",
        "zh": "我叫大黄蜂。"
      }
    ]
  },
  {
    "id": 2,
    "title": "汽车人的颜色",
    "englishTitle": "Colors of Autobots",
    "stage": 1,
    "goal": "看到颜色能说出英文，不用想",
    "words": [
      {
        "en": "red",
        "zh": "红色"
      },
      {
        "en": "blue",
        "zh": "蓝色"
      },
      {
        "en": "yellow",
        "zh": "黄色"
      },
      {
        "en": "green",
        "zh": "绿色"
      },
      {
        "en": "black",
        "zh": "黑色"
      },
      {
        "en": "white",
        "zh": "白色"
      },
      {
        "en": "silver",
        "zh": "银色"
      }
    ],
    "patterns": [
      {
        "en": "What color is it?",
        "zh": "它是什么颜色？"
      },
      {
        "en": "It's red.",
        "zh": "是红色的。"
      },
      {
        "en": "I like blue.",
        "zh": "我喜欢蓝色。"
      }
    ]
  },
  {
    "id": 3,
    "title": "数一数汽车人",
    "englishTitle": "Count the Autobots",
    "stage": 1,
    "goal": "1–10 会数，听到数字能拿出对应数量",
    "words": [
      {
        "en": "one",
        "zh": "一"
      },
      {
        "en": "two",
        "zh": "二"
      },
      {
        "en": "three",
        "zh": "三"
      },
      {
        "en": "four",
        "zh": "四"
      },
      {
        "en": "five",
        "zh": "五"
      },
      {
        "en": "six",
        "zh": "六"
      },
      {
        "en": "seven",
        "zh": "七"
      },
      {
        "en": "eight",
        "zh": "八"
      },
      {
        "en": "nine",
        "zh": "九"
      },
      {
        "en": "ten",
        "zh": "十"
      }
    ],
    "patterns": [
      {
        "en": "How many cars?",
        "zh": "有几辆车？"
      },
      {
        "en": "Three cars.",
        "zh": "三辆车。"
      },
      {
        "en": "Count with me!",
        "zh": "跟我一起数！"
      }
    ]
  },
  {
    "id": 4,
    "title": "大还是小",
    "englishTitle": "Big or Small",
    "stage": 1,
    "goal": "能用 big / small / fast / slow 描述东西",
    "words": [
      {
        "en": "big",
        "zh": "大"
      },
      {
        "en": "small",
        "zh": "小"
      },
      {
        "en": "long",
        "zh": "长"
      },
      {
        "en": "short",
        "zh": "短"
      },
      {
        "en": "tall",
        "zh": "高"
      },
      {
        "en": "fast",
        "zh": "快"
      },
      {
        "en": "slow",
        "zh": "慢"
      }
    ],
    "patterns": [
      {
        "en": "It's big.",
        "zh": "它很大。"
      },
      {
        "en": "Is it big?",
        "zh": "它大吗？"
      },
      {
        "en": "Yes, it is. / No, it isn't.",
        "zh": "是的。/ 不是。"
      }
    ]
  },
  {
    "id": 5,
    "title": "我的家庭小队",
    "englishTitle": "My Family Team",
    "stage": 2,
    "goal": "能用英语介绍家里的人",
    "words": [
      {
        "en": "mommy",
        "zh": "妈妈"
      },
      {
        "en": "daddy",
        "zh": "爸爸"
      },
      {
        "en": "grandma",
        "zh": "奶奶/外婆"
      },
      {
        "en": "grandpa",
        "zh": "爷爷/外公"
      },
      {
        "en": "baby",
        "zh": "宝宝"
      },
      {
        "en": "family",
        "zh": "家人"
      }
    ],
    "patterns": [
      {
        "en": "Who is this?",
        "zh": "这是谁？"
      },
      {
        "en": "This is my mom.",
        "zh": "这是我妈妈。"
      },
      {
        "en": "I love my family.",
        "zh": "我爱我的家人。"
      }
    ]
  },
  {
    "id": 6,
    "title": "让身体变形",
    "englishTitle": "Transform Your Body",
    "stage": 2,
    "goal": "听懂指令并做出动作，不用翻译",
    "words": [
      {
        "en": "head",
        "zh": "头"
      },
      {
        "en": "hand",
        "zh": "手"
      },
      {
        "en": "arm",
        "zh": "胳膊"
      },
      {
        "en": "leg",
        "zh": "腿"
      },
      {
        "en": "eye",
        "zh": "眼睛"
      },
      {
        "en": "ear",
        "zh": "耳朵"
      },
      {
        "en": "mouth",
        "zh": "嘴巴"
      }
    ],
    "patterns": [
      {
        "en": "Touch your head.",
        "zh": "摸摸你的头。"
      },
      {
        "en": "Can you jump?",
        "zh": "你会跳吗？"
      },
      {
        "en": "Yes, I can!",
        "zh": "我会！"
      }
    ]
  },
  {
    "id": 7,
    "title": "加能量",
    "englishTitle": "Fuel Up",
    "stage": 2,
    "goal": "能说出想要什么，会说 please / thank you",
    "words": [
      {
        "en": "milk",
        "zh": "牛奶"
      },
      {
        "en": "water",
        "zh": "水"
      },
      {
        "en": "egg",
        "zh": "鸡蛋"
      },
      {
        "en": "rice",
        "zh": "米饭"
      },
      {
        "en": "apple",
        "zh": "苹果"
      },
      {
        "en": "banana",
        "zh": "香蕉"
      },
      {
        "en": "bread",
        "zh": "面包"
      },
      {
        "en": "yummy",
        "zh": "好吃"
      }
    ],
    "patterns": [
      {
        "en": "I want milk.",
        "zh": "我要牛奶。"
      },
      {
        "en": "Here you are.",
        "zh": "给你。"
      },
      {
        "en": "Thank you! / You're welcome.",
        "zh": "谢谢！/ 不客气。"
      }
    ]
  },
  {
    "id": 8,
    "title": "你感觉怎么样",
    "englishTitle": "How Do You Feel?",
    "stage": 2,
    "goal": "能说出情绪，也能听懂你在问什么",
    "words": [
      {
        "en": "happy",
        "zh": "开心"
      },
      {
        "en": "sad",
        "zh": "难过"
      },
      {
        "en": "angry",
        "zh": "生气"
      },
      {
        "en": "scared",
        "zh": "害怕"
      },
      {
        "en": "tired",
        "zh": "累"
      },
      {
        "en": "brave",
        "zh": "勇敢"
      },
      {
        "en": "sunny",
        "zh": "晴天"
      },
      {
        "en": "rainy",
        "zh": "下雨"
      }
    ],
    "patterns": [
      {
        "en": "How are you?",
        "zh": "你怎么样？"
      },
      {
        "en": "I'm happy.",
        "zh": "我很开心。"
      },
      {
        "en": "It's sunny today.",
        "zh": "今天是晴天。"
      }
    ]
  },
  {
    "id": 9,
    "title": "车在哪里",
    "englishTitle": "Where Is the Car?",
    "stage": 3,
    "goal": "听懂方位词，能说出东西在哪",
    "words": [
      {
        "en": "in",
        "zh": "里面"
      },
      {
        "en": "on",
        "zh": "上面"
      },
      {
        "en": "under",
        "zh": "下面"
      },
      {
        "en": "here",
        "zh": "这里"
      },
      {
        "en": "there",
        "zh": "那里"
      },
      {
        "en": "box",
        "zh": "盒子"
      },
      {
        "en": "table",
        "zh": "桌子"
      },
      {
        "en": "bed",
        "zh": "床"
      }
    ],
    "patterns": [
      {
        "en": "Where is the car?",
        "zh": "车在哪里？"
      },
      {
        "en": "It's on the table.",
        "zh": "在桌子上。"
      },
      {
        "en": "It's under the bed.",
        "zh": "在床底下。"
      }
    ]
  },
  {
    "id": 10,
    "title": "路上的玩具",
    "englishTitle": "Toys on the Road",
    "stage": 3,
    "goal": "认识交通工具，会说 I have...",
    "words": [
      {
        "en": "car",
        "zh": "小汽车"
      },
      {
        "en": "truck",
        "zh": "卡车"
      },
      {
        "en": "bus",
        "zh": "公交车"
      },
      {
        "en": "bike",
        "zh": "自行车"
      },
      {
        "en": "plane",
        "zh": "飞机"
      },
      {
        "en": "train",
        "zh": "火车"
      },
      {
        "en": "boat",
        "zh": "船"
      },
      {
        "en": "toy",
        "zh": "玩具"
      }
    ],
    "patterns": [
      {
        "en": "What's this?",
        "zh": "这是什么？"
      },
      {
        "en": "It's a truck.",
        "zh": "这是一辆卡车。"
      },
      {
        "en": "I have a car.",
        "zh": "我有一辆车。"
      }
    ]
  },
  {
    "id": 11,
    "title": "出发吧",
    "englishTitle": "Let's Roll Out",
    "stage": 3,
    "goal": "听懂 let's / come / look 这类邀请和指令",
    "words": [
      {
        "en": "go",
        "zh": "走"
      },
      {
        "en": "come",
        "zh": "来"
      },
      {
        "en": "look",
        "zh": "看"
      },
      {
        "en": "wait",
        "zh": "等"
      },
      {
        "en": "help",
        "zh": "帮忙"
      },
      {
        "en": "ready",
        "zh": "准备好"
      },
      {
        "en": "again",
        "zh": "再一次"
      }
    ],
    "patterns": [
      {
        "en": "Let's go!",
        "zh": "我们走吧！"
      },
      {
        "en": "Come here.",
        "zh": "过来。"
      },
      {
        "en": "Help me, please.",
        "zh": "请帮帮我。"
      }
    ]
  },
  {
    "id": 12,
    "title": "我能做到",
    "englishTitle": "I Can Do It!",
    "stage": 3,
    "goal": "会说 I can / I can't，也敢在失败后说 try again",
    "words": [
      {
        "en": "can",
        "zh": "能"
      },
      {
        "en": "try",
        "zh": "试试"
      },
      {
        "en": "strong",
        "zh": "强壮"
      },
      {
        "en": "hero",
        "zh": "英雄"
      },
      {
        "en": "good job",
        "zh": "干得好"
      },
      {
        "en": "mission",
        "zh": "任务"
      },
      {
        "en": "complete",
        "zh": "完成"
      }
    ],
    "patterns": [
      {
        "en": "I can do it!",
        "zh": "我能做到！"
      },
      {
        "en": "Can you help me?",
        "zh": "你能帮我吗？"
      },
      {
        "en": "You are my hero.",
        "zh": "你是我的英雄。"
      }
    ]
  }
];

export const handbookWordBank = [
  {
    "title": "角色与身份",
    "words": [
      {
        "en": "robot",
        "zh": "机器人"
      },
      {
        "en": "autobot",
        "zh": "汽车人"
      },
      {
        "en": "decepticon",
        "zh": "霸天虎"
      },
      {
        "en": "hero",
        "zh": "英雄"
      },
      {
        "en": "captain",
        "zh": "队长"
      },
      {
        "en": "prime",
        "zh": "领袖"
      },
      {
        "en": "team",
        "zh": "小队"
      },
      {
        "en": "mission",
        "zh": "任务"
      },
      {
        "en": "friend",
        "zh": "朋友"
      }
    ]
  },
  {
    "title": "车与交通",
    "words": [
      {
        "en": "car",
        "zh": "小汽车"
      },
      {
        "en": "truck",
        "zh": "卡车"
      },
      {
        "en": "bus",
        "zh": "公交车"
      },
      {
        "en": "bike",
        "zh": "自行车"
      },
      {
        "en": "plane",
        "zh": "飞机"
      },
      {
        "en": "train",
        "zh": "火车"
      },
      {
        "en": "boat",
        "zh": "船"
      },
      {
        "en": "wheel",
        "zh": "轮子"
      },
      {
        "en": "road",
        "zh": "路"
      }
    ]
  },
  {
    "title": "变形动作",
    "words": [
      {
        "en": "transform",
        "zh": "变形"
      },
      {
        "en": "roll",
        "zh": "滚动/出发"
      },
      {
        "en": "drive",
        "zh": "开"
      },
      {
        "en": "fly",
        "zh": "飞"
      },
      {
        "en": "run",
        "zh": "跑"
      },
      {
        "en": "jump",
        "zh": "跳"
      },
      {
        "en": "stop",
        "zh": "停"
      },
      {
        "en": "go",
        "zh": "走"
      },
      {
        "en": "turn",
        "zh": "转"
      },
      {
        "en": "fast",
        "zh": "快"
      },
      {
        "en": "slow",
        "zh": "慢"
      }
    ]
  },
  {
    "title": "身体与部件",
    "words": [
      {
        "en": "head",
        "zh": "头"
      },
      {
        "en": "hand",
        "zh": "手"
      },
      {
        "en": "arm",
        "zh": "胳膊"
      },
      {
        "en": "leg",
        "zh": "腿"
      },
      {
        "en": "eye",
        "zh": "眼睛"
      },
      {
        "en": "ear",
        "zh": "耳朵"
      },
      {
        "en": "mouth",
        "zh": "嘴巴"
      },
      {
        "en": "door",
        "zh": "门"
      },
      {
        "en": "window",
        "zh": "窗户"
      }
    ]
  },
  {
    "title": "颜色",
    "words": [
      {
        "en": "red",
        "zh": "红"
      },
      {
        "en": "blue",
        "zh": "蓝"
      },
      {
        "en": "yellow",
        "zh": "黄"
      },
      {
        "en": "green",
        "zh": "绿"
      },
      {
        "en": "black",
        "zh": "黑"
      },
      {
        "en": "white",
        "zh": "白"
      },
      {
        "en": "silver",
        "zh": "银"
      },
      {
        "en": "orange",
        "zh": "橙"
      }
    ]
  },
  {
    "title": "数字",
    "words": [
      {
        "en": "one",
        "zh": "1"
      },
      {
        "en": "two",
        "zh": "2"
      },
      {
        "en": "three",
        "zh": "3"
      },
      {
        "en": "four",
        "zh": "4"
      },
      {
        "en": "five",
        "zh": "5"
      },
      {
        "en": "six",
        "zh": "6"
      },
      {
        "en": "seven",
        "zh": "7"
      },
      {
        "en": "eight",
        "zh": "8"
      },
      {
        "en": "nine",
        "zh": "9"
      },
      {
        "en": "ten",
        "zh": "10"
      }
    ]
  },
  {
    "title": "大小与属性",
    "words": [
      {
        "en": "big",
        "zh": "大"
      },
      {
        "en": "small",
        "zh": "小"
      },
      {
        "en": "long",
        "zh": "长"
      },
      {
        "en": "short",
        "zh": "短"
      },
      {
        "en": "tall",
        "zh": "高"
      },
      {
        "en": "strong",
        "zh": "强壮"
      },
      {
        "en": "brave",
        "zh": "勇敢"
      },
      {
        "en": "new",
        "zh": "新"
      },
      {
        "en": "old",
        "zh": "旧"
      }
    ]
  },
  {
    "title": "情绪",
    "words": [
      {
        "en": "happy",
        "zh": "开心"
      },
      {
        "en": "sad",
        "zh": "难过"
      },
      {
        "en": "angry",
        "zh": "生气"
      },
      {
        "en": "scared",
        "zh": "害怕"
      },
      {
        "en": "tired",
        "zh": "累"
      },
      {
        "en": "excited",
        "zh": "兴奋"
      }
    ]
  },
  {
    "title": "日常万能词",
    "words": [
      {
        "en": "hello",
        "zh": "你好"
      },
      {
        "en": "bye",
        "zh": "再见"
      },
      {
        "en": "please",
        "zh": "请"
      },
      {
        "en": "thank you",
        "zh": "谢谢"
      },
      {
        "en": "sorry",
        "zh": "对不起"
      },
      {
        "en": "yes",
        "zh": "是"
      },
      {
        "en": "no",
        "zh": "不"
      },
      {
        "en": "more",
        "zh": "更多"
      },
      {
        "en": "again",
        "zh": "再一次"
      },
      {
        "en": "help",
        "zh": "帮忙"
      }
    ]
  }
];

export const handbookParentPhrases = [
  {
    "title": "① 队长口令（他说）",
    "phrases": [
      {
        "en": "Autobots, roll out!",
        "zh": "汽车人，出发！",
        "when": "开场（你请示后他喊）"
      },
      {
        "en": "Transform!",
        "zh": "变形！",
        "when": "切换状态／开工"
      },
      {
        "en": "Let's go!",
        "zh": "我们走！",
        "when": "出发、开始游戏"
      },
      {
        "en": "Look at me!",
        "zh": "看我！",
        "when": "他要你注意时"
      },
      {
        "en": "Come here!",
        "zh": "过来！",
        "when": "叫你过去"
      },
      {
        "en": "Wait!",
        "zh": "等等！",
        "when": "要你停下"
      },
      {
        "en": "Help me!",
        "zh": "帮帮我！",
        "when": "需要帮忙（最重要的一句）"
      },
      {
        "en": "Follow me!",
        "zh": "跟我来！",
        "when": "带头行动"
      },
      {
        "en": "Ready? Go!",
        "zh": "准备？开始！",
        "when": "数数、比赛"
      },
      {
        "en": "Good job, Bumblebee!",
        "zh": "干得好，大黄蜂！",
        "when": "夸你（角色互换的关键）"
      },
      {
        "en": "Mission complete!",
        "zh": "任务完成！",
        "when": "收尾"
      }
    ]
  },
  {
    "title": "② 你的请示（你说）",
    "phrases": [
      {
        "en": "Yes, Captain!",
        "zh": "是，队长！",
        "when": "任何时候回应他"
      },
      {
        "en": "What's the mission?",
        "zh": "今天的任务是什么？",
        "when": "每天开场"
      },
      {
        "en": "Are you ready, Captain?",
        "zh": "队长，准备好了吗？",
        "when": "开场请示"
      },
      {
        "en": "What should I do?",
        "zh": "我该做什么？",
        "when": "等他下令"
      },
      {
        "en": "Red or blue?",
        "zh": "红的还是蓝的？",
        "when": "二选一，允许只用一个词回答"
      },
      {
        "en": "One or two?",
        "zh": "一个还是两个？",
        "when": "二选一"
      },
      {
        "en": "Here or there?",
        "zh": "这里还是那里？",
        "when": "二选一"
      },
      {
        "en": "Big or small?",
        "zh": "大的还是小的？",
        "when": "二选一"
      },
      {
        "en": "I don't know, Captain.",
        "zh": "我不知道，队长。",
        "when": "示弱，让他教你"
      },
      {
        "en": "Show me!",
        "zh": "做给我看！",
        "when": "请他示范"
      },
      {
        "en": "You are the boss.",
        "zh": "你说了算。",
        "when": "把决定权交出去"
      },
      {
        "en": "I'm waiting for your order.",
        "zh": "我在等你的命令。",
        "when": "沉默，等他开口"
      }
    ]
  },
  {
    "title": "③ 不吼不催",
    "phrases": [
      {
        "en": "Look at me.",
        "zh": "看着我。",
        "when": "邀请孩子关注你正在示范的动作，不强求对视"
      },
      {
        "en": "Listen.",
        "zh": "听。",
        "when": "准备放音频/说话前"
      },
      {
        "en": "Come here.",
        "zh": "过来。",
        "when": "叫不动时，配手势"
      },
      {
        "en": "Sit down, please.",
        "zh": "请坐。",
        "when": "开始前的固定指令"
      },
      {
        "en": "Wait.",
        "zh": "等一下。",
        "when": "他要抢玩具时"
      },
      {
        "en": "Your turn.",
        "zh": "轮到你了。",
        "when": "轮流游戏"
      },
      {
        "en": "One more time.",
        "zh": "再来一次。",
        "when": "他想重复玩"
      },
      {
        "en": "That's OK.",
        "zh": "没关系。",
        "when": "他说错／做错时"
      },
      {
        "en": "Let's try again.",
        "zh": "我们再试试。",
        "when": "他受挫时"
      }
    ]
  },
  {
    "title": "④ 十二组核心问句",
    "phrases": [
      {
        "en": "What's this?",
        "zh": "这是什么？",
        "when": "W1 · W10"
      },
      {
        "en": "What color is it?",
        "zh": "什么颜色？",
        "when": "W2"
      },
      {
        "en": "How many?",
        "zh": "有多少个？",
        "when": "W3"
      },
      {
        "en": "Is it big?",
        "zh": "它大吗？",
        "when": "W4"
      },
      {
        "en": "Who is this?",
        "zh": "这是谁？",
        "when": "W5"
      },
      {
        "en": "Can you jump?",
        "zh": "你会跳吗？",
        "when": "W6"
      },
      {
        "en": "What do you want?",
        "zh": "你想要什么？",
        "when": "W7"
      },
      {
        "en": "How are you?",
        "zh": "你怎么样？",
        "when": "W8"
      },
      {
        "en": "Where is the car?",
        "zh": "车在哪？",
        "when": "W9"
      },
      {
        "en": "Do you like it?",
        "zh": "你喜欢吗？",
        "when": "随时可用"
      },
      {
        "en": "Let's go!",
        "zh": "我们走吧！",
        "when": "W11"
      },
      {
        "en": "What are you doing?",
        "zh": "你在做什么？",
        "when": "W12"
      }
    ]
  },
  {
    "title": "⑤ 生活四场景",
    "phrases": [
      {
        "en": "Time for breakfast.",
        "zh": "该吃早饭了。",
        "when": "早饭"
      },
      {
        "en": "Is it yummy?",
        "zh": "好吃吗？",
        "when": "吃饭全程"
      },
      {
        "en": "One more bite.",
        "zh": "再吃一口。",
        "when": "孩子自愿再尝一口时，不用英语催吃"
      },
      {
        "en": "Time for a bath.",
        "zh": "该洗澡了。",
        "when": "洗澡"
      },
      {
        "en": "Wash your hands.",
        "zh": "洗手。",
        "when": "洗澡／饭前"
      },
      {
        "en": "Close your eyes.",
        "zh": "闭上眼睛。",
        "when": "洗头时"
      },
      {
        "en": "All done!",
        "zh": "都完成啦！",
        "when": "洗完／做完任何事"
      },
      {
        "en": "Put on your shoes.",
        "zh": "穿鞋。",
        "when": "出门"
      },
      {
        "en": "Hold my hand.",
        "zh": "牵着我的手。",
        "when": "过马路"
      },
      {
        "en": "Look! A bus!",
        "zh": "看！一辆公交车！",
        "when": "路上"
      },
      {
        "en": "Time for bed.",
        "zh": "该睡觉了。",
        "when": "睡前"
      },
      {
        "en": "Good night. Sleep tight.",
        "zh": "晚安，睡个好觉。",
        "when": "睡前"
      }
    ]
  },
  {
    "title": "⑥ 家长救场句",
    "phrases": [
      {
        "en": "Let's say it together.",
        "zh": "我们一起说。",
        "when": "孩子想试着和你一起说时"
      },
      {
        "en": "You try.",
        "zh": "你试试。",
        "when": "把球递给他"
      },
      {
        "en": "Show me.",
        "zh": "做给我看。",
        "when": "他不想说只想做"
      },
      {
        "en": "Say it in Chinese.",
        "zh": "用中文说。",
        "when": "他卡住了，先降难度"
      },
      {
        "en": "I don't know. Let's look it up.",
        "zh": "我不知道，我们查一下。",
        "when": "你也不会时"
      },
      {
        "en": "What's this in English?",
        "zh": "这个英语怎么说？",
        "when": "示范“求知”这个动作"
      },
      {
        "en": "I don't know either. Let's ask.",
        "zh": "我也不会，我们问问。",
        "when": "让他知道大人也不会"
      }
    ]
  }
];

const adventures = [
  {
    scene: '星光机库 · 新队员报到', icon: '👋', accent: '#b77822',
    sceneDescription: '机库门打开了！大黄蜂和擎天柱都想认识你，快和新朋友打个招呼吧。',
    goal: '愿意用 hello 问好，并用一个名字或短句介绍自己。',
    dialogue: [
      { speaker: 'bumblebee', en: "Hi! I'm Bumblebee.", zh: '嗨！我是大黄蜂。' },
      { speaker: 'optimus', en: "Hello! I'm Optimus. What's your name?", zh: '你好！我是擎天柱。你叫什么名字？' },
      { speaker: 'child', en: 'My name is Alex.', zh: '我叫 Alex。（换成你的名字）' },
      { speaker: 'bumblebee', en: "I'm a robot and your friend!", zh: '我是机器人，也是你的朋友！' },
      { speaker: 'child', en: 'Hello, friend!', zh: '你好，朋友！' },
      { speaker: 'optimus', en: 'Bye, Alex! See you!', zh: '再见，Alex！下次见！' }
    ],
    chant: { bpm: 84, lines: [
      { en: 'Hello, hello, my friend!', zh: '你好，你好，我的朋友！' },
      { en: 'Hi, hi, say your name!', zh: '嗨，嗨，说出你的名字！' },
      { en: 'Robot, robot, wave hello!', zh: '机器人，机器人，挥手问好！' },
      { en: 'Bye, bye, see you soon!', zh: '再见，再见，回头见！' }
    ] },
    mission: { title: '制作我的队员证', instruction: '画一张自己的队员证。家长扮大黄蜂先说 Hello，孩子可以挥手、说名字，或试试 My name is…，再互换角色。', success: '我用自己的方式和新朋友打了招呼。' },
    parentTip: '早上说 Good morning，出门说 Bye-bye。名字不必用英文名；等三秒，孩子只说一个词也接住。',
    review: '明天让玩偶先忘记名字，再请孩子提醒它。可以指队员证，不需要背诵。',
    lab: { character: 'bumblebee', part: 'hands', action: 'show', prompt: 'Hello, Bumblebee!', zh: '转一转，找到大黄蜂的手。向它挥挥手，说 Hello, Bumblebee!' }
  },
  {
    scene: '彩色装甲工坊 · 给小队选新装', icon: '🎨', accent: '#b25c47',
    sceneDescription: '七张颜色卡送到装甲工坊啦！先找找伙伴身上的颜色，再替你的纸小车选一套新装。',
    goal: '辨认本周颜色，用一个词或 I like… 表达选择。',
    dialogue: [
      { speaker: 'bumblebee', en: 'Look at my yellow armor!', zh: '看我的黄色装甲！' },
      { speaker: 'optimus', en: 'What color is it?', zh: '它是什么颜色？' },
      { speaker: 'child', en: "It's yellow!", zh: '是黄色的！' },
      { speaker: 'optimus', en: 'I have red and blue armor.', zh: '我有红色和蓝色的装甲。' },
      { speaker: 'child', en: 'I like blue.', zh: '我喜欢蓝色。' },
      { speaker: 'bumblebee', en: 'Blue it is, Captain!', zh: '那就选蓝色，队长！' }
    ],
    chant: { bpm: 88, lines: [
      { en: 'Red, blue, yellow, go!', zh: '红、蓝、黄，出发！' },
      { en: 'Green and white, say hello!', zh: '绿和白，打招呼！' },
      { en: 'Black and silver, look at me!', zh: '黑和银，看看我！' },
      { en: 'I like blue. What do you see?', zh: '我喜欢蓝色。你看到了什么？' }
    ] },
    mission: { title: '纸小车配色师', instruction: '用手边彩笔给纸小车涂色。先选三种颜色，家长问 Red or blue?，孩子说或指自己的选择。再用一块纸挡住玩具，只露一角猜颜色。', success: '我为小车选了颜色，并尝试说出一个英文颜色。' },
    parentTip: '穿衣、吃苹果时自然问颜色。一次只玩三种；找 3D 颜色时先“恢复原色”，不要把钛金提示当作角色原装甲颜色。',
    review: '把昨天的颜色卡放进今天的车库里，旧颜色和新颜色一起找。',
    lab: { character: 'bumblebee', part: 'chest', action: 'assemble', prompt: 'What color is it?', zh: '点“合起来”和“恢复原色”，转一转找 yellow、black、silver。再换擎天柱找 red 和 blue。' }
  },
  {
    scene: '能量装载站 · 数数集合', icon: '🔢', accent: '#507f78',
    sceneDescription: '小车排队来装能量啦！擎天柱来领队，你用手指点一点，把能量积木一块块数清楚。',
    goal: '一起数 1—10，能按听到的数量拿出少量实物。',
    dialogue: [
      { speaker: 'optimus', en: 'Count with me!', zh: '跟我一起数！' },
      { speaker: 'child', en: 'One, two, three!', zh: '一、二、三！' },
      { speaker: 'bumblebee', en: 'How many cars?', zh: '有几辆车？' },
      { speaker: 'child', en: 'Three cars.', zh: '三辆车。' },
      { speaker: 'optimus', en: 'Four, five, six, seven!', zh: '四、五、六、七！' },
      { speaker: 'bumblebee', en: 'Eight, nine, ten! Roll out!', zh: '八、九、十！出发！' }
    ],
    chant: { bpm: 88, lines: [
      { en: 'One, two, three, clap with me!', zh: '一、二、三，跟我拍手！' },
      { en: 'Four, five, six, tap your knees!', zh: '四、五、六，拍拍膝盖！' },
      { en: 'Seven, eight, nine, stand in line!', zh: '七、八、九，排好队！' },
      { en: 'Ten! Ready? Go, go, go!', zh: '十！准备好？出发，出发！' }
    ] },
    mission: { title: '十枚能量块', instruction: '用十块积木当能量块。先排三块，边点边数；熟悉后慢慢加到十块。孩子选 One or two?，家长按指令装进盒子。', success: '我一边点实物，一边和伙伴数了数。' },
    parentTip: '数台阶或点心都可以。数字读得快不等于数量懂了；让手指和实物一一对应，不急着凑到十。',
    review: '拿出昨天的三辆彩色小车，一起说 Three cars 或 Three blue cars。',
    lab: { character: 'optimus', part: 'hands', action: 'show', prompt: 'Count with me!', zh: '找到擎天柱的两只手，说 one、two。再和它一起数桌上的积木，从三块慢慢加到十块！' }
  },
  {
    scene: '双车比较车库 · 大小与快慢', icon: '↔️', accent: '#ae7543',
    sceneDescription: '车库里来了大车和小车，哪辆住哪个车位呢？和伙伴比比长短，再让玩具车一会儿快、一会儿慢。',
    goal: '用 big / small 或 fast / slow 描述一组明显不同的事物。',
    dialogue: [
      { speaker: 'bumblebee', en: 'Look! A big car and a small car.', zh: '看！一辆大车和一辆小车。' },
      { speaker: 'optimus', en: 'Is it big?', zh: '它大吗？' },
      { speaker: 'child', en: 'Yes, it is. It is big!', zh: '是的。它很大！' },
      { speaker: 'bumblebee', en: 'This one is small and fast.', zh: '这一辆又小又快。' },
      { speaker: 'optimus', en: 'Fast or slow?', zh: '快还是慢？' },
      { speaker: 'child', en: 'Slow, please!', zh: '请慢一点！' }
    ],
    chant: { bpm: 84, lines: [
      { en: 'Big and small, show them all!', zh: '大和小，比给我看！' },
      { en: 'Long and short, line them up!', zh: '长和短，排排好！' },
      { en: 'Tall, tall, reach up high!', zh: '高，高，伸手向上！' },
      { en: 'Fast, then slow, give it a try!', zh: '先快再慢，试试看！' }
    ] },
    mission: { title: '大小车位管理员', instruction: '摆两件大小明显不同的玩具，为它们画大、小车位。用手比 big / small；用两根积木比 long / short；最后慢慢、快快推同一辆车。', success: '我用一个词或手势，选出了大、小或快、慢。' },
    parentTip: '比手、比鞋子都可以。屏幕里的模型能缩放，不用它判断两位角色的真实身高；也不要求孩子跑步比赛。',
    review: '把一辆 big car 和两辆 small cars 放进昨天的装载站。',
    lab: { character: 'optimus', part: 'legs', action: 'show', prompt: 'Big or small?', zh: '转一转，看看擎天柱长长的腿，试着说 long。再拿出大、小两辆玩具车，告诉伙伴 Big or small。' }
  },
  {
    scene: '家庭指挥桥 · 我最亲近的小队', icon: '🏠', accent: '#b57565',
    sceneDescription: '家庭小队集合！拿出照片或画一张画，把你喜欢的家人介绍给大黄蜂和擎天柱吧。',
    goal: '用一个称呼或 This is my… 介绍自己选择的家人。',
    dialogue: [
      { speaker: 'optimus', en: 'Who is this?', zh: '这是谁？' },
      { speaker: 'child', en: 'This is my mom.', zh: '这是我妈妈。' },
      { speaker: 'bumblebee', en: 'Hello, Mommy! Hello, Daddy!', zh: '妈妈好！爸爸好！' },
      { speaker: 'optimus', en: 'Grandma, grandpa, and baby can join!', zh: '奶奶、爷爷和宝宝都可以加入！' },
      { speaker: 'child', en: 'I love my family.', zh: '我爱我的家人。' },
      { speaker: 'bumblebee', en: 'Your family is a lovely team!', zh: '你的家人是一支温暖的小队！' }
    ],
    chant: { bpm: 80, lines: [
      { en: 'Mommy, daddy, say hello!', zh: '妈妈、爸爸，打个招呼！' },
      { en: 'Grandma, grandpa, here we go!', zh: '奶奶、爷爷，一起出发！' },
      { en: 'Baby, baby, smile at me!', zh: '宝宝、宝宝，对我笑笑！' },
      { en: 'I love my family!', zh: '我爱我的家人！' }
    ] },
    mission: { title: '画一张家庭小队名单', instruction: '孩子自由选择愿意介绍的人，画下来或拿出照片。家长扮大黄蜂问 Who is this?，孩子用称呼、中文或短句介绍，再由家长自然复述英文。', success: '我向伙伴介绍了一位重要的人。' },
    parentTip: '视频通话时用一句介绍就好。尊重每个家庭的真实成员，不要求所有称呼都对应到一位家人；mom 与 mommy 都是本课可用表达。',
    review: '给小队成员选一个喜欢的颜色，说 Mommy likes blue 或只说 blue。',
    lab: { character: 'bumblebee', part: 'hands', action: 'show', prompt: 'This is my family.', zh: '找到大黄蜂的手，和家人一起向它挥挥手。拿起你选的照片，说 This is my family。' }
  },
  {
    scene: '汽车人维修站 · 身体动作训练', icon: '🤖', accent: '#8b764e',
    sceneDescription: '欢迎来到汽车人维修站！转一转、拆一拆，找到伙伴的身体部位，再用自己的身体玩指令游戏。',
    goal: '听到 head / hand / arm / leg 等词，能指一指或做一个舒服的动作。',
    dialogue: [
      { speaker: 'optimus', en: 'Touch your head.', zh: '摸摸你的头。' },
      { speaker: 'child', en: 'My head!', zh: '我的头！' },
      { speaker: 'bumblebee', en: 'Show me your hand and arm.', zh: '让我看看你的手和胳膊。' },
      { speaker: 'child', en: 'Here! My hand and arm.', zh: '在这里！我的手和胳膊。' },
      { speaker: 'optimus', en: 'Can you jump?', zh: '你会跳吗？' },
      { speaker: 'child', en: 'Yes, I can!', zh: '我会！' }
    ],
    chant: { bpm: 84, lines: [
      { en: 'Head, hand, arm, and leg!', zh: '头、手、胳膊和腿！' },
      { en: 'Eye, ear, mouth, hello!', zh: '眼睛、耳朵、嘴巴，你好！' },
      { en: 'Touch your head, wave your hand!', zh: '摸摸头，挥挥手！' },
      { en: 'I can move. Nice and slow!', zh: '我会动一动，慢慢来！' }
    ] },
    mission: { title: '你来当维修站队长', instruction: '先点 3D 头、手、胳膊和腿，看看高亮；再按“拆一拆”和“合起来”。孩子选一个词，家长指自己的部位，偶尔故意指错，邀请孩子纠正。', success: '我找到一个部位，或给伙伴发出了一次动作指令。' },
    parentTip: '洗手时说 Wash your hands。眼、耳、嘴在模型头部整体中观察，当前不逐一拆分；jump 可以只说不跳，也可以用手指代替动作。',
    review: '让昨天介绍的家人一起挥手 say hello。任选三个身体词玩就够了。',
    lab: { character: 'optimus', part: 'head', action: 'explode', prompt: 'Touch your head.', zh: '拆一拆，找到 head，再点手、胳膊和腿看看。指指自己的眼睛、耳朵和嘴巴，最后把伙伴合起来。' }
  },
  {
    scene: '能量补给餐厅 · 今天你来点单', icon: '🍎', accent: '#8b8250',
    sceneDescription: '能量餐厅开门啦！画几张食物卡，和大黄蜂、擎天柱轮流当客人，点一份你喜欢的想象点心。',
    goal: '用 I want… 或一个食物词表达想要什么，并试试 please / thank you。',
    dialogue: [
      { speaker: 'bumblebee', en: 'Welcome! What do you want?', zh: '欢迎！你想要什么？' },
      { speaker: 'child', en: 'I want milk, please.', zh: '我想要牛奶，谢谢。' },
      { speaker: 'optimus', en: 'An apple or a banana?', zh: '要苹果还是香蕉？' },
      { speaker: 'child', en: 'An apple, please.', zh: '请给我一个苹果。' },
      { speaker: 'bumblebee', en: 'Here you are.', zh: '给你。' },
      { speaker: 'child', en: 'Thank you! Yummy!', zh: '谢谢！真好吃！' }
    ],
    chant: { bpm: 84, lines: [
      { en: 'Milk and water, yes, please!', zh: '牛奶和水，请给我！' },
      { en: 'Egg and rice and bread for me!', zh: '鸡蛋、米饭和面包给我！' },
      { en: 'Apple, banana, yummy, yummy!', zh: '苹果、香蕉，好吃好吃！' },
      { en: 'Thank you, friend! A happy tummy!', zh: '谢谢你，朋友！肚子真开心！' }
    ] },
    mission: { title: '开一家纸卡餐厅', instruction: '画三张食物卡，轮流当客人和老板。用 I want… 点单，用 Here you are 递卡，用 Thank you 道谢，再回应 You’re welcome。其余食物分几天加入。', success: '我点了一样想要的食物，或说了一次谢谢。' },
    parentTip: '吃饭时自然来一轮点单即可。食物卡不涉及真实进食，也不把吃完、尝不喜欢的食物作为英语完成条件。',
    review: '点 two apples 或 a yellow banana，把数字、颜色放进餐厅游戏。',
    lab: { character: 'bumblebee', part: 'hands', action: 'assemble', prompt: 'Here you are.', zh: '先把大黄蜂合起来，请它当想象餐厅的客人。举起你画的食物卡，说 Here you are。' }
  },
  {
    scene: '云朵心情观测台 · 所有心情都欢迎', icon: '🌤️', accent: '#7a8190',
    sceneDescription: '心情观测台欢迎每一种心情！看看窗外的天气，选一张心情卡，告诉伙伴你今天感觉怎样。',
    goal: '用一个心情词或 I’m… 表达自己的真实感受，也试试说天气。',
    dialogue: [
      { speaker: 'bumblebee', en: 'How are you?', zh: '你感觉怎么样？' },
      { speaker: 'child', en: "I'm tired.", zh: '我有点累。' },
      { speaker: 'optimus', en: "That's OK. Let's rest.", zh: '没关系。我们休息一下。' },
      { speaker: 'bumblebee', en: "It's sunny today.", zh: '今天是晴天。' },
      { speaker: 'child', en: "I'm happy now.", zh: '我现在很开心。（也可以换成真实心情）' },
      { speaker: 'optimus', en: 'Thank you for telling us.', zh: '谢谢你告诉我们。' }
    ],
    chant: { bpm: 76, lines: [
      { en: 'Happy, sad, how do you feel?', zh: '开心、难过，你感觉怎样？' },
      { en: 'Angry, scared, your feelings are real.', zh: '生气、害怕，都是你的真实心情。' },
      { en: 'Tired or brave, tell me today.', zh: '累了或勇敢，今天告诉我。' },
      { en: 'Sunny or rainy, I will stay.', zh: '晴天或雨天，我都陪着你。' }
    ] },
    mission: { title: '画我的心情天气', instruction: '画太阳、雨点或任意表情卡。孩子选一张代表现在的心情，家长先分享自己的感受。可以只指卡，不必解释原因，再看看窗外是什么天气。', success: '我用词、表情或卡片告诉伙伴现在的感受。' },
    parentTip: '回家先问 How are you? 再听答案。sad、angry、scared 都可以被接纳；brave 不等于不能害怕，也不把模型表情当作孩子心情。',
    review: '邀请一个家庭小队成员也选一张心情卡。今天不想开口，可以一起听一遍。',
    lab: { character: 'optimus', part: 'chest', action: 'show', prompt: 'How are you?', zh: '转一转，让擎天柱面向你。选一张自己的心情卡，说 I’m happy、I’m tired，或者你现在的心情。' }
  },
  {
    scene: '秘密玩具基地 · 小车藏在哪里', icon: '📦', accent: '#9b775b',
    sceneDescription: '秘密基地里藏着一辆小车！它在盒子里、桌子上，还是纸做的小床下面？和伙伴一起找找看。',
    goal: '理解 in / on / under，并用一个方位词或短句说出小车位置。',
    dialogue: [
      { speaker: 'optimus', en: 'Where is the car?', zh: '车在哪里？' },
      { speaker: 'child', en: "It's in the box.", zh: '它在盒子里。' },
      { speaker: 'bumblebee', en: 'Is it on the table now?', zh: '它现在在桌子上吗？' },
      { speaker: 'child', en: "Yes! It's on the table.", zh: '是的！它在桌子上。' },
      { speaker: 'optimus', en: 'Here or there?', zh: '这里还是那里？' },
      { speaker: 'child', en: "There! It's under the bed.", zh: '那里！它在床下面。' }
    ],
    chant: { bpm: 84, lines: [
      { en: 'In the box, hide the car!', zh: '把小车藏在盒子里！' },
      { en: 'On the table, there you are!', zh: '在桌子上，找到你啦！' },
      { en: 'Under the bed, take a look!', zh: '床的下面，看一看！' },
      { en: 'Here or there? In the box!', zh: '这里还是那里？在盒子里！' }
    ] },
    mission: { title: '给小车找停车位', instruction: '先把小车放进盒子、放在桌上、放在纸做的床下，分别说 in / on / under。孩子选一个位置，家长来找；也可用手指代替移动玩具。', success: '我指对一个位置，或说出了一个方位词。' },
    parentTip: '找鞋、找玩具时只问一句 Where is…?，给足寻找时间。用纸床代替真实床底，不需要钻入狭小空间。',
    review: '把 two cars 放 in the box，或把一张 yellow 卡放 on the table。',
    lab: { character: 'bumblebee', part: 'feet', action: 'assemble', prompt: 'Where is the car?', zh: '把大黄蜂合起来，邀请它加入寻车小队。把你的玩具小车藏到盒子里或桌子上，再告诉它车在哪里。' }
  },
  {
    scene: '玩具交通城 · 选一条旅行路线', icon: '🚌', accent: '#668477',
    sceneDescription: '玩具交通城出发啦！小汽车走公路，飞机飞上天，船在水面游；你想和伙伴坐什么去旅行？',
    goal: '说出一种交通工具，并试试 I have… 或 It’s a…。',
    dialogue: [
      { speaker: 'bumblebee', en: "What's this?", zh: '这是什么？' },
      { speaker: 'child', en: "It's a truck.", zh: '这是一辆卡车。' },
      { speaker: 'optimus', en: 'A bus, a bike, or a train?', zh: '公交车、自行车，还是火车？' },
      { speaker: 'child', en: 'I have a car.', zh: '我有一辆小汽车。' },
      { speaker: 'bumblebee', en: 'A plane or a boat next?', zh: '下一程选飞机还是船？' },
      { speaker: 'optimus', en: 'Your toy trip, your choice!', zh: '你的玩具旅行，由你选择！' }
    ],
    chant: { bpm: 88, lines: [
      { en: 'Car, truck, bus, and bike!', zh: '小汽车、卡车、公交车和自行车！' },
      { en: 'Pick the toy that you like!', zh: '选你喜欢的玩具！' },
      { en: 'Plane and train and boat, let’s go!', zh: '飞机、火车和船，出发啦！' },
      { en: 'I have a car. Vroom, vroom, go!', zh: '我有一辆车。嘟嘟，出发！' }
    ] },
    mission: { title: '搭一座纸上交通城', instruction: '在纸上画路、天空、铁轨和水面，把交通工具卡放到你选的区域。轮流问 What’s this?，答 It’s a…；想象中想要的玩具也可以用 I want… 表达。', success: '我选择一种交通工具，和伙伴说了它的名字。' },
    parentTip: '散步时说 Look! A bus! 就是一轮实战。没有实物也能画卡，不用购置玩具；当前 3D 模型展示机器人形态，不自动变成车。',
    review: '选一辆 red car 或 two trucks，停在昨天的秘密基地里。',
    lab: { character: 'optimus', part: 'legs', action: 'assemble', prompt: "It's a truck.", zh: '转一转，看看完整的擎天柱。拿出卡车玩具或画卡，说 It’s a truck，再为伙伴选一条旅行路线。' }
  },
  {
    scene: '小队发射台 · 准备出发', icon: '🚀', accent: '#a66c4b',
    sceneDescription: '小队发射台亮灯啦！准备好就说 go，想等一等就说 wait，今天什么时候出发由你决定。',
    goal: '理解 go / come / look / wait，用短句邀请、等待或求助。',
    dialogue: [
      { speaker: 'optimus', en: 'Ready, Captain?', zh: '队长，准备好了吗？' },
      { speaker: 'child', en: 'Wait, please!', zh: '请等一下！' },
      { speaker: 'bumblebee', en: 'Come here. Look at our mission!', zh: '到这里来。看看我们的任务！' },
      { speaker: 'child', en: 'Help me, please.', zh: '请帮帮我。' },
      { speaker: 'optimus', en: "I'm here. Shall we try again?", zh: '我在这里。我们再试一次吗？' },
      { speaker: 'child', en: "Ready! Let's go!", zh: '准备好啦！我们走吧！' }
    ],
    chant: { bpm: 88, lines: [
      { en: 'Ready? Look! Come here!', zh: '准备好？看！来这里！' },
      { en: 'Wait, wait, I am here!', zh: '等一等，我在这里！' },
      { en: 'Help me, please. Try again!', zh: '请帮帮我，再试一次！' },
      { en: 'Go, go, let’s go, friend!', zh: '出发，出发，我们走，朋友！' }
    ] },
    mission: { title: '积木门救援小队', instruction: '用两块积木当基地门，请家长扮队员等待指令。孩子用 go / wait 决定何时移动小车；卡住了就 Help me, please，想重玩就 Again, please。', success: '我发出一个出发、等待或求助指令，伙伴听见了。' },
    parentTip: '出门前说 Ready? Let’s go!，也允许孩子说 Wait。求助和暂停与出发一样，都是有效的交流。',
    review: '把旧课颜色、数字、位置放进任务：让 two cars 从盒子里慢慢出发。',
    lab: { character: 'bumblebee', part: 'arms', action: 'explode', prompt: 'Help me, please.', zh: '看看拆开的大黄蜂，试着说 Help me, please。和家长一起点“合起来”，再决定 go 还是 wait。' }
  },
  {
    scene: '星光英雄庆典 · 我们一起做到了', icon: '⭐', accent: '#a78336',
    sceneDescription: '英雄庆典开始啦！选最喜欢的三张旧课卡，带两位伙伴完成一个小小救援故事，一起说 Mission complete!',
    goal: '用 I can… 说一件能做的事，困难时愿意 try again 或请求帮助。',
    dialogue: [
      { speaker: 'bumblebee', en: 'Can you help me?', zh: '你能帮帮我吗？' },
      { speaker: 'child', en: 'I can try!', zh: '我可以试试！' },
      { speaker: 'optimus', en: 'You are strong. We can help.', zh: '你很有力量。我们可以一起帮忙。' },
      { speaker: 'child', en: 'I can do it! Mission complete!', zh: '我能做到！任务完成！' },
      { speaker: 'bumblebee', en: 'Good job! You are my hero.', zh: '干得好！你是我的英雄。' },
      { speaker: 'optimus', en: 'Thank you, Captain. High five!', zh: '谢谢你，队长。击掌！' }
    ],
    chant: { bpm: 84, lines: [
      { en: 'I can try. I can try!', zh: '我可以试试，我可以试试！' },
      { en: 'Strong together, you and I!', zh: '你和我，一起有力量！' },
      { en: 'Hero, hero, good job, team!', zh: '英雄、英雄，小队干得好！' },
      { en: 'Mission complete! We are a team!', zh: '任务完成！我们是一支小队！' }
    ] },
    mission: { title: '我的小小英雄故事', instruction: '孩子挑三张最喜欢的旧课词卡，带领大黄蜂和擎天柱完成一次“把小车送回家”的想象任务。说一个词、一个句子或指卡都可以，最后由孩子宣布 Mission complete。', success: '我选择了自己的表达方式，和小队一起完成故事。' },
    parentTip: '庆祝具体行为：“你说了 help，我就知道怎么帮忙了。”I can’t yet、暂停和再试一次也都值得被听见。想录音时先征求孩子同意。',
    review: '下一轮从最喜欢的主题开始，不用重新从第 1 周排起。把愿意再玩的卡留在桌上。',
    lab: { character: 'optimus', part: 'chest', action: 'assemble', prompt: 'Mission complete!', zh: '把擎天柱完整合体，再换大黄蜂看看。举起你的队员证，对两位伙伴说 Mission complete!' }
  }
];

export const handbookWeeks = sourceWeeks.map((week, index) => ({ ...week, ...adventures[index] }));

export const handbookMeta = {
  title: '汽车人英语冒险手册',
  age: '6 岁亲子共学',
  weeks: 12,
  weeklyWordCount: 89,
  bankWordCount: 81,
  sourceNote: '依据你提供的《变形金刚英语对话计划》改编：保留 12 周主题、89 项周词汇、36 条原重点句式与 81 项扩展词库；新增双伙伴对话、3D 任务和原创节奏口令。原计划的“81词”是扩展词库数量。',
  weeklyRoutine: [
    { time: '0—1 分钟', title: '队长就位', description: '选一个伙伴，说 hello；愿意的话喊 Ready? Go!，不愿意开口可以先挥手。' },
    { time: '1—4 分钟', title: '拍拍节奏', description: '打开本周节奏，听一句、拍四下；选坐着拍手或轻拍膝盖，节奏可以随时关闭。' },
    { time: '4—7 分钟', title: '今天三个词', description: '从本周词卡里只挑三个，听、指、说，搭配玩具或动作；不要求一次学完整周。' },
    { time: '7—11 分钟', title: '伙伴来对话', description: '家长演一个伙伴，孩子选一个回答；可以用一个词、短句、中文或指图，家长自然复述英文。' },
    { time: '11—14 分钟', title: '3D 加实物任务', description: '跟随本周模型提示玩一小段，再完成纸卡或玩具任务；电脑任务和离线任务可以只选一个。' },
    { time: '14—15 分钟', title: '击掌收队', description: '勾选今天愿意参与的项目，说 Mission complete 或 bye，结束后去玩。' }
  ],
  parentGuide: [
    { title: '一次只给一点', text: '每次选 3 个词、1 个句式。12 周是主题地图，可以停留、跳转或重复，不是完成期限。' },
    { title: '先听，再给选择', text: '先自己示范，再问 Red or blue?。等待几秒，指一指、一个词或中文也能参与；用英文自然接话。' },
    { title: '节奏服务于说话', text: '拍手比跟准节拍更重要。音量保持轻柔，跟读时可关节奏；不喜欢音乐就安静地玩同样的任务。' },
    { title: '3D 与实物搭配', text: '保留电影造型，通过旋转、部位高亮和拆合体增加兴趣。数字、家庭、食物、方位等由词卡和实物解释，机器人陪伴演出。' },
    { title: '尊重身体和心情', text: '不要求跳跃或站立，可坐着做动作、用手指代替。累了、害怕、想停都可以告诉伙伴，暂停也是有效表达。' },
    { title: '夸具体的表达', text: '说“我听到你说 please 了”“你告诉我需要帮忙了”，把听见和回应放在纠错前。勾选记录参与，不给孩子打分或排名。' }
  ]
};
