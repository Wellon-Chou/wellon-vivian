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
    p1: "Every love story is beautiful, but ours is our favourite. What began as two separate paths slowly became one — through quiet evenings, shared laughter, and a thousand small moments that somehow added up to forever.",
    p2: "We’re still writing the best parts. But of everything we’ve chosen, choosing each other has always felt the most like coming home.",
    quote: "“And so, we said yes to the rest of our lives.”",
  },
  gallery: {
    headingLead: "The ",
    headingAccent: "photographs",
    intro: "From our pre-wedding days in Paris — the Louvre, Château de Chantilly, the Eiffel Tower, and Pont Alexandre III.",
    photoAdd: "Photo to be added",
    photos: [
      "At the pyramid",
      "Through the courtyard",
      "Between the columns",
      "The veil takes flight",
      "Under wide skies",
      "The long train, Chantilly",
      "Almost a kiss",
      "Our invitation",
      "By the water",
      "Roses by the Seine",
      "Beneath the tower",
      "The red gown",
      "Quiet, at last",
    ],
  },
  film: {
    headingLead: "The ",
    headingAccent: "film",
    intro: "For everyone who couldn’t be there — and for us, to relive these moments again and again. Press play.",
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
    theDayValue: "Ceremony & dinner",
    theDaySub: "A full schedule to follow",
    viewMap: "View map",
    saveTheDate: "Save the date",
  },
  rsvp: {
    headingLead: "Will You ",
    headingAccent: "Join Us",
    headingTail: " on This Special Day?",
    intro: "Your presence means so much to us. Please let us know by completing the RSVP form below.",
    open: "Open the RSVP form",
    respondBy: "Kindly respond by the date on your invitation.",
    posterAlt:
      "Our Wedding — Wellon Chou & Vivian Xie, 6 December 2026, Sheraton Fuqing Hotel, Garden Hall.",
  },
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
    lead: "我们两家人诚挚地邀请您，与我们共同分享婚礼当天的喜悦——",
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
    p1: "每一段爱情都很美，而我们的这一段，是我们最珍爱的故事。两条原本各自延伸的路，在一个个安静的夜晚、共享的欢笑，和上千个微小的瞬间里，慢慢汇成同一条——通向永远。",
    p2: "最精彩的篇章，我们仍在续写。但在所有的选择之中，选择彼此，始终最像是回家。",
    quote: "「于是，我们对余生，说了『我愿意』。」",
  },
  gallery: {
    headingLead: "",
    headingAccent: "照片集",
    intro: "我们在巴黎拍下的婚纱照——卢浮宫、尚蒂依城堡、巴黎埃菲尔铁塔与亚历山大三世桥。",
    photoAdd: "照片待上传",
    photos: [
      "金字塔前",
      "穿过庭院",
      "廊柱之间",
      "风起时的头纱",
      "长空之下",
      "香缇伊的裙摆",
      "咫尺之间",
      "我们的请柬",
      "湖畔",
      "塞纳河畔的玫瑰",
      "铁塔之下",
      "那一袭红裙",
      "静好时光",
    ],
  },
  film: {
    headingLead: "",
    headingAccent: "婚礼影片",
    intro: "献给无法到场的每一位，也献给我们自己，好让我们一遍遍重温。请按下播放。",
    play: "播放影片",
    filmAdd: "影片待上传",
  },
  details: {
    headingLead: "",
    headingAccent: "婚礼详情",
    intro: "以下为婚礼主要信息，完整详情将随正式请柬一同奉上。",
    when: "日期",
    where: "地点",
    dress: "着装要求",
    dressSub: "期待看到盛装出席的您",
    theDay: "当天安排",
    theDayValue: "仪式与晚宴",
    theDaySub: "完整流程稍后公布",
    viewMap: "查看地图",
    saveTheDate: "存入日历",
  },
  rsvp: {
    headingLead: "您愿意",
    headingAccent: "与我们共度",
    headingTail: "这特别的一天吗？",
    intro: "您的到来对我们意义非凡。请通过下方表格告知我们。",
    open: "前往填写回复表格",
    respondBy: "请在请柬所示日期前回复。",
    posterAlt: "婚礼海报——周伟隆与谢津，2026年12月6日，福清金辉喜来登酒店 6 楼花园厅。",
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
