/* Bilingual copy for the whole public site. `en` is the source of truth for
   shape; `zh` mirrors it. Event facts (dates, venue) live in constants.ts with
   their own *Zh fields — components pick the right one by language. */

export type Lang = "en" | "zh";
export const LANGS: Lang[] = ["en", "zh"];
export const LANG_COOKIE = "wv_lang";
/* Language used for the prerendered static HTML; the client restores the
   guest's saved choice on mount. Chinese-first — the wedding is in Fuqing. */
export const DEFAULT_LANG: Lang = "zh";

const en = {
  langName: "中文", // label to switch TO the other language
  nav: {
    story: "The Story",
    gallery: "Gallery",
    film: "The Film",
    details: "Details",
    guestbook: "Guestbook",
    rsvp: "RSVP",
    menu: "Menu",
  },
  hero: {
    marrying: "wedding",
    scroll: "Scroll",
  },
  invitation: {
    lead: "Together with our families, we invite you to share in the joy of our wedding day — ",
    accent: "a celebration of love, and of everyone who shaped it.",
  },
  countdown: {
    headingLead: "Until we say ",
    headingAccent: "“I do”",
    days: "Days",
    day: "Day",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    done: "Today is the day.",
  },
  story: {
    headingLead: "Our ",
    headingAccent: "story",
    figure: "Us, together",
    photoAdd: "Photo to be added",
    p1: "Every love story is beautiful, but ours is our favourite. What began as two separate paths slowly became one — through quiet evenings, shared laughter, and a thousand small moments that somehow added up to forever.",
    p2: "We’re still writing the best parts. But of everything we’ve chosen, choosing each other has always felt the most like coming home.",
    quote: "“And so, we said yes to the rest of our lives.”",
  },
  gallery: {
    headingLead: "The ",
    headingAccent: "photographs",
    intro: "Moments from our day, captured by those we love. Tap any frame to view it up close.",
    photoAdd: "Photo to be added",
    view: "View",
    photos: [
      "The first look",
      "Portrait — Vivian",
      "Portrait — Wellon",
      "The ceremony",
      "Hands & rings",
      "The vows",
      "Golden hour",
      "The celebration",
    ],
  },
  film: {
    headingLead: "The ",
    headingAccent: "film",
    intro: "For everyone who couldn’t be there — and for us, to relive again and again. Press play.",
    play: "Play the film",
    filmAdd: "Film to be added",
  },
  details: {
    headingLead: "The ",
    headingAccent: "details",
    intro: "The essentials are below. Full details will follow with your formal invitation.",
    when: "When",
    where: "Where",
    dress: "Dress code",
    dressSub: "We can’t wait to see you at your finest",
    theDay: "The day",
    theDayValue: "Ceremony, dinner & dancing",
    theDaySub: "A full schedule to follow",
    viewMap: "View map",
    saveTheDate: "Save the date",
  },
  rsvp: {
    headingLead: "Will you ",
    headingAccent: "celebrate",
    headingTail: " with us?",
    intro: "Your presence would mean the world. Kindly let us know below.",
    fullName: "Full name",
    namePh: "Your name",
    email: "Email",
    join: "Will you join us?",
    accept: "Joyfully accept",
    decline: "Regretfully decline",
    partySize: "Party size",
    meal: "Meal preference",
    song: "A song to get you dancing",
    songPh: "Song & artist (optional)",
    note: "A note for us (optional)",
    notePh: "Anything you’d like us to know",
    send: "Send RSVP",
    sending: "Sending…",
    respondBy: "Kindly respond by the date on your invitation.",
    successTitle: "It’s official.",
  },
  meals: {
    Standard: "Standard",
    Vegetarian: "Vegetarian",
    Vegan: "Vegan",
    Halal: "Halal",
    "No preference": "No preference",
  } as Record<string, string>,
  guestbook: {
    headingLead: "Leave us ",
    headingAccent: "a note",
    intro: "A blessing, a memory, a piece of advice for married life — every word finds its way to us and into our guestbook.",
    yourName: "Your name",
    yourMessage: "Your message",
    messagePh: "Wishing you both…",
    sign: "Sign the guestbook",
    sending: "Sending…",
    thankYou: "Thank you.",
    posted: "Your note is on the wall.",
    writeAnother: "Write another",
    empty: "No notes yet. Be the first to write to Wellon & Vivian.",
  },
  footer: {
    withLove: "With love — we can’t wait to celebrate with you.",
    made: "Made with love",
    forCouple: "For the couple",
  },
  calendar: {
    add: "Add to calendar",
    google: "Google Calendar",
    apple: "Apple / Outlook",
  },
};

const zh: typeof en = {
  langName: "EN",
  nav: {
    story: "我们的故事",
    gallery: "照片集",
    film: "婚礼影片",
    details: "婚礼详情",
    guestbook: "留言祝福",
    rsvp: "出席回复",
    menu: "菜单",
  },
  hero: {
    marrying: "婚礼",
    scroll: "向下滑动",
  },
  invitation: {
    lead: "我们两家人诚挚地邀请您，共同分享我们婚礼当天的喜悦——",
    accent: "这是一场关于爱、也关于每一位成就了这份爱的人的庆典。",
  },
  countdown: {
    headingLead: "距离我们说出",
    headingAccent: "「我愿意」",
    days: "天",
    day: "天",
    hours: "时",
    minutes: "分",
    seconds: "秒",
    done: "今天，就是大喜之日。",
  },
  story: {
    headingLead: "我们的",
    headingAccent: "故事",
    figure: "我们，在一起",
    photoAdd: "照片待上传",
    p1: "每一段爱情都很美，而我们的这一段，是我们最珍爱的。两条原本各自延伸的路，在一个个安静的夜晚、共享的欢笑，和上千个微小的瞬间里，慢慢汇成同一条——通向永远。",
    p2: "最精彩的篇章，我们仍在续写。但在所有的选择之中，选择彼此，始终最像是回家。",
    quote: "「于是，我们对余生，说了『我愿意』。」",
  },
  gallery: {
    headingLead: "",
    headingAccent: "照片集",
    intro: "由我们所爱之人，记录下当天的点滴瞬间。轻触任意照片即可放大观看。",
    photoAdd: "照片待上传",
    view: "查看",
    photos: [
      "初次相见",
      "肖像 · Vivian",
      "肖像 · Wellon",
      "婚礼仪式",
      "执手与戒指",
      "许下誓言",
      "黄昏时分",
      "欢庆时刻",
    ],
  },
  film: {
    headingLead: "",
    headingAccent: "婚礼影片",
    intro: "献给无法到场的每一位，也献给我们自己，好一遍遍重温。请按下播放。",
    play: "播放影片",
    filmAdd: "影片待上传",
  },
  details: {
    headingLead: "",
    headingAccent: "婚礼详情",
    intro: "以下是主要信息，完整详情将随正式请柬一同奉上。",
    when: "日期",
    where: "地点",
    dress: "着装要求",
    dressSub: "期待看到盛装出席的您",
    theDay: "当天安排",
    theDayValue: "仪式、晚宴与舞会",
    theDaySub: "完整流程稍后公布",
    viewMap: "查看地图",
    saveTheDate: "存入日历",
  },
  rsvp: {
    headingLead: "您愿意",
    headingAccent: "与我们共度",
    headingTail: "这特别的一天吗？",
    intro: "您的到来对我们意义非凡。请在下方告知我们。",
    fullName: "姓名",
    namePh: "您的姓名",
    email: "邮箱",
    join: "您能出席吗？",
    accept: "欣然赴约",
    decline: "遗憾缺席",
    partySize: "出席人数",
    meal: "餐食偏好",
    song: "点一首想听的歌",
    songPh: "歌名与歌手（选填）",
    note: "给我们的留言（选填）",
    notePh: "任何想让我们知道的事",
    send: "提交回复",
    sending: "提交中…",
    respondBy: "请在请柬所示日期前回复。",
    successTitle: "已为您确认。",
  },
  meals: {
    Standard: "标准餐",
    Vegetarian: "素食",
    Vegan: "纯素",
    Halal: "清真",
    "No preference": "无特别要求",
  },
  guestbook: {
    headingLead: "给我们",
    headingAccent: "留言祝福",
    intro: "一句祝福、一段回忆、一条婚姻的建议——每一个字都会传到我们手中，并留在这本留言簿里。",
    yourName: "您的姓名",
    yourMessage: "您的留言",
    messagePh: "祝愿你们……",
    sign: "写下祝福",
    sending: "提交中…",
    thankYou: "谢谢您。",
    posted: "您的祝福已展示在墙上。",
    writeAnother: "再写一条",
    empty: "还没有留言。来做第一个祝福 Wellon & Vivian 的人吧。",
  },
  footer: {
    withLove: "满怀爱意——期待与您共同庆祝。",
    made: "用心制作",
    forCouple: "新人专属",
  },
  calendar: {
    add: "加入日历",
    google: "Google 日历",
    apple: "Apple / Outlook",
  },
};

export const dictionaries = { en, zh };
export type Dict = typeof en;

export function getDict(lang: Lang): Dict {
  return dictionaries[lang] ?? dictionaries.en;
}

/* Messages returned by the server actions (validation + confirmations). */
export const formMessages = {
  en: {
    rsvp: {
      name: "Please tell us your name.",
      email: "Enter a valid email so we can reach you.",
      attending: "Let us know if you can join us.",
      guests: "Enter a party size between 1 and 12.",
      check: "Please check the highlighted fields.",
      saveError: "Something went wrong saving your RSVP. Please try again in a moment.",
      successYes: "Thank you — your RSVP is in. We can’t wait to celebrate with you.",
      successNo: "Thank you for letting us know. You’ll be missed — we’ll raise a glass to you.",
    },
    message: {
      name: "Please add your name.",
      message: "Write a few words for the couple.",
      tooLong: "Please keep it under 1200 characters.",
      check: "Please check the highlighted fields.",
      sendError: "Your message didn’t send. Please try again in a moment.",
      success: "Your note has been added to the guestbook. Thank you.",
    },
  },
  zh: {
    rsvp: {
      name: "请填写您的姓名。",
      email: "请输入有效的邮箱，方便我们与您联系。",
      attending: "请告诉我们您是否能出席。",
      guests: "请填写 1 至 12 之间的出席人数。",
      check: "请检查标示的栏位。",
      saveError: "保存回复时出了点问题，请稍后再试。",
      successYes: "谢谢您——我们已收到您的回复，期待与您共同庆祝。",
      successNo: "谢谢您的告知。我们会想念您——并会为您举杯。",
    },
    message: {
      name: "请填写您的姓名。",
      message: "写下几句想对新人说的话吧。",
      tooLong: "请将留言控制在 1200 字以内。",
      check: "请检查标示的栏位。",
      sendError: "留言发送失败，请稍后再试。",
      success: "您的祝福已加入留言簿，谢谢您。",
    },
  },
} as const;

export function langFromValue(v: unknown): Lang {
  return v === "zh" ? "zh" : "en";
}
