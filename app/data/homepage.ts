import type {
  HeroSlide,
  PortfolioItem,
  ProcessStep,
  ServiceItem,
  TestimonialItem,
} from '~/types/homepage'

export const heroSlides: HeroSlide[] = [
  {
    key: 'game',
    displayLabel: '遊戲設計',
    image: '/images/carousel/game-hero.png',
    eyebrow: 'Game Design x Playful Visuals',
    title: '把遊戲提案做成一眼想玩的視覺入口',
    description:
      '從角色情緒、互動節奏到介面層級，將遊戲概念整理成適合展示、提案與募資溝通的首頁體驗。',
    primaryCta: {
      label: '淺談遊戲企劃',
      href: 'line',
    },
    stats: [
      { value: '遊戲企劃', label: '提案雛形', icon: '/images/icons/game-timeline.svg' },
      { value: '角色視覺', label: '記憶點設計', icon: '/images/icons/game-character.svg' },
      { value: '互動 UI', label: '流程示意', icon: '/images/icons/game-ui.svg' },
    ],
  },
  {
    key: 'website',
    displayLabel: '網頁設計',
    image: '/images/carousel/website-hero.png',
    eyebrow: 'Brand Story x Web Experience',
    title: '讓品牌網站不只好看，也能把價值說清楚',
    description:
      '用敘事架構、版面節奏與明確 CTA，把作品集、品牌故事與服務內容整理成容易理解的網站。',
    primaryCta: {
      label: '規劃網站設計',
      href: 'line',
    },
    stats: [
      { value: 'RWD', label: '跨裝置體驗', icon: '/images/icons/web-rwd.svg' },
      { value: 'SEO 基礎', label: '搜尋可讀性', icon: '/images/icons/web-seo.svg' },
      { value: 'CTA 路徑', label: '轉換設計', icon: '/images/icons/web-cta.svg' },
    ],
  },
  {
    key: 'app',
    displayLabel: 'APP設計',
    image: '/images/carousel/app-hero.png',
    eyebrow: 'Product Flow x Dashboard UI',
    title: '把 App 想法收斂成可展示的產品流程',
    description:
      '從 MVP 範圍、核心任務到 dashboard 視覺，協助你把抽象需求變成能與團隊討論的介面原型。',
    primaryCta: {
      label: '提案App設計',
      href: 'line',
    },
    stats: [
      { value: 'MVP 範圍', label: '需求收斂', icon: '/images/icons/app-flow.svg' },
      { value: 'Dashboard', label: '資訊架構', icon: '/images/icons/app-dashboard.svg' },
      { value: 'Prototype', label: '互動示意', icon: '/images/icons/app-prototype.svg' },
    ],
  },
]

export const services: ServiceItem[] = [
  {
    key: 'website',
    title: '品牌與作品集網站',
    description: '整理定位、內容層級與視覺語氣，打造能讓訪客快速理解價值的 one-page 或形象網站。',
  },
  {
    key: 'game',
    title: '遊戲提案視覺設計',
    description: '把世界觀、角色亮點與核心玩法轉成提案頁面、展示視覺與互動 UI 示意。',
  },
  {
    key: 'app',
    title: 'App UI/UX 與產品原型',
    description: '協助釐清使用情境、資訊架構與關鍵流程，產出可溝通、可迭代的介面方向。',
  },
]

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: '需求釐清',
    description: '先整理目標、受眾、內容素材與預算範圍，確認首頁需要完成的核心任務。',
  },
  {
    number: '02',
    title: '敘事與線框',
    description: '建立頁面節奏、CTA 路徑與區塊順序，讓視覺設計前就先有清楚架構。',
  },
  {
    number: '03',
    title: '視覺與互動',
    description: '依照品牌個性製作主視覺、卡片、動線與互動狀態，讓頁面有記憶點。',
  },
  {
    number: '04',
    title: '上線與調整',
    description: '完成響應式檢查、基礎 SEO 與轉換入口設定，再依回饋微調內容。',
  },
]

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'sky-arcadia',
    category: 'game',
    image: '/images/portfolio/sky-arcadia.png',
    title: 'Sky Arcadia 遊戲提案頁',
    summary:
      '以空島冒險為主題的遊戲展示頁，將角色、玩法循環與 UI 情境整理成可快速理解的提案故事。',
    highlights: ['角色與世界觀視覺化', 'HUD 與任務流程示意', 'LINE 諮詢 CTA 串接'],
    ctaLabel: '討論遊戲提案',
  },
  {
    slug: 'atelier-brand',
    category: 'website',
    image: '/images/portfolio/atelier-brand.png',
    title: 'Atelier 品牌形象網站',
    summary:
      '為創作工作室設計的 one-page 網站，用作品敘事、服務卡片與清楚流程降低初次詢問門檻。',
    highlights: ['品牌語氣與色彩系統', '作品集 modal 展示', '行動版服務分流'],
    ctaLabel: '討論品牌網站',
  },
  {
    slug: 'pulse-track',
    category: 'app',
    image: '/images/portfolio/pulse-track.png',
    title: 'PulseTrack App 原型',
    summary:
      '面向個人效率追蹤的 App 概念，把儀表板、任務流程與資料狀態整理成可展示的產品介面。',
    highlights: ['MVP 功能範圍收斂', 'Dashboard 資訊架構', '互動原型視覺方向'],
    ctaLabel: '討論 App 原型',
  },
]

export const testimonials: TestimonialItem[] = [
  {
    name: '林小姐',
    role: '品牌主理人',
    quote: '原本只有零散想法，合作後很快就整理出網站敘事和視覺方向，提案也變得更有說服力。',
  },
  {
    name: '陳先生',
    role: '遊戲企劃',
    quote: '最有幫助的是把玩法亮點轉成畫面語言，讓團隊在討論時更快對齊。',
  },
  {
    name: '王小姐',
    role: '產品負責人',
    quote: 'App 流程被拆得很清楚，dashboard 的資訊層級也讓工程和設計都比較好接手。',
  },
]
