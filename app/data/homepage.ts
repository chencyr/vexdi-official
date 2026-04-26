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
    eyebrow: '遊戲體驗設計',
    title: '把世界觀做成玩家願意停留的互動舞台',
    description:
      '從核心玩法、介面節奏到上線優化，我們協助團隊把遊戲概念轉成可測試、可迭代、可發布的產品。',
    primaryCta: {
      label: '預約遊戲諮詢',
      href: '#contact',
    },
    secondaryCta: {
      label: '查看遊戲案例',
      href: '#portfolio',
    },
    stats: [
      { value: '原型 2 週', label: '快速驗證' },
      { value: '跨平台', label: '裝置適配' },
      { value: '持續優化', label: '營運支援' },
    ],
  },
  {
    key: 'website',
    eyebrow: '品牌網站建置',
    title: '用清楚的內容架構，讓網站成為最好的業務夥伴',
    description:
      '我們設計兼顧美感與轉換的網站，讓品牌故事、服務亮點與聯絡流程都能在第一時間被看見。',
    primaryCta: {
      label: '開始網站專案',
      href: '#contact',
    },
    secondaryCta: {
      label: '瀏覽網站作品',
      href: '#portfolio',
    },
    stats: [
      { value: '內容策略', label: '先想清楚再上線' },
      { value: 'RWD', label: '全螢幕體驗' },
      { value: 'SEO 基礎', label: '搜尋可見度' },
    ],
  },
  {
    key: 'app',
    eyebrow: '應用程式開發',
    title: '把複雜流程整理成流暢、可靠、好維護的 App',
    description:
      '無論是內部工具、會員服務或新創 MVP，我們都能用模組化方式把需求拆解成可持續演進的產品。',
    primaryCta: {
      label: '討論 App 需求',
      href: '#contact',
    },
    secondaryCta: {
      label: '看 App 範例',
      href: '#portfolio',
    },
    stats: [
      { value: 'MVP 規劃', label: '先上線再放大' },
      { value: '流程簡化', label: '降低學習成本' },
      { value: '版本管理', label: '長期維護' },
    ],
  },
]

export const services: ServiceItem[] = [
  {
    key: 'website',
    title: '網站設計與前端開發',
    description: '打造具備品牌辨識度與轉換效率的響應式網站。',
  },
  {
    key: 'game',
    title: '遊戲原型與互動設計',
    description: '將遊戲概念拆成能快速驗證的介面與流程。',
  },
  {
    key: 'app',
    title: 'App 產品與系統整合',
    description: '協助團隊建立可持續擴充的行動產品與服務流程。',
  },
]

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: '需求諮詢',
    description: '先釐清目標、使用者與限制條件，避免做出偏題的產品。',
  },
  {
    number: '02',
    title: '提案與排程',
    description: '整理範圍、時程與優先順序，讓每一步都有清楚的交付節點。',
  },
  {
    number: '03',
    title: '設計與製作',
    description: '進入視覺、前端與功能開發，並以可驗證的方式持續推進。',
  },
  {
    number: '04',
    title: '交付與優化',
    description: '完成上線、追蹤回饋，並依真實使用情境持續調整。',
  },
]

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'sky-arcadia',
    category: 'game',
    title: 'Sky Arcadia',
    summary: '一款以探索與收集為主軸的試玩版，重點放在節奏與場景氛圍。',
    highlights: ['關卡節奏優化', '介面引導設計', '試玩版驗證'],
    ctaLabel: '查看專案細節',
  },
  {
    slug: 'atelier-brand',
    category: 'website',
    title: 'Atelier Brand',
    summary: '以品牌故事和預約轉換為核心的形象網站，兼顧質感與閱讀效率。',
    highlights: ['品牌敘事架構', '服務頁優化', '手機優先設計'],
    ctaLabel: '查看專案細節',
  },
  {
    slug: 'pulse-track',
    category: 'app',
    title: 'Pulse Track',
    summary: '面向團隊協作的內部 App，協助追蹤任務、狀態與回報流程。',
    highlights: ['任務視覺化', '跨部門流程', '資料同步'],
    ctaLabel: '查看專案細節',
  },
]

export const testimonials: TestimonialItem[] = [
  {
    name: '林子晴',
    role: '品牌總監',
    quote: '團隊把我們的想法整理得很有條理，網站上線後的諮詢量明顯提升。',
  },
  {
    name: '陳冠廷',
    role: '產品經理',
    quote: '需求很多但節奏一直很清楚，最後交付的 App 也比我們原本預期更好維護。',
  },
  {
    name: '黃雨柔',
    role: '獨立遊戲製作人',
    quote: '原型驗證的速度很快，讓我們很早就能看見哪些玩法值得繼續投資。',
  },
]
