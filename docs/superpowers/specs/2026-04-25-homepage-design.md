# Creative Tech Studio Homepage Design

## 目標

建立一頁式接案官網，主打 `Creative x Technology` 的跨域能力，吸引三類專案洽詢：

- 遊戲提案與遊戲視覺設計
- 品牌、作品集與形象網站
- App UI/UX 與產品原型

首頁優先順序為：建立品牌記憶、快速展示作品可信度、降低詢問門檻，最後將主要轉換導向 LINE 官方帳號。

## 最新實作基準

本 spec 已依 `feature/homepage-implementation` 近期 coding 修正更新。實作基準如下：

- Nuxt 頁面入口使用 `app/pages/index.vue`，舊的 `pages/index.vue` 已移除。
- 首頁節奏已收斂為 `Navbar -> Hero -> Process -> Portfolio -> Testimonials -> Footer CTA -> Floating LINE`。
- `AboutSection`、`ServicesSection`、`MobileServiceBranches` 仍可存在於程式碼中，但目前不出現在實際首頁組裝中。
- 桌面 hero 使用寬版 carousel banner，搭配左右窄版 preview、淡入轉場、箭頭、pagination 與進度條。
- Hero 與 portfolio 已改用實際產生的 PNG 圖片，不再只用 CSS/vector mock composition。
- Desktop navbar 以 `public/images/ui/vexdi-navbar.png` 作為視覺與內容基準。
- Desktop 首頁整體寬度以 `assets/references/desktop-hero-carousel-final-nav-process.png` 為準，外層 canvas 必須滿版延展到 viewport 兩側，不可用固定 `max-width` 截斷整體頁面。
- 行動版 navbar 採用簡化直接導覽列，不再使用 hamburger menu。
- Floating LINE 僅保留右下角圓形入口與未讀提示，不顯示聊天預覽卡、對話框或任何可輸入訊息 UI。

## 設計方向

採用 `品牌敘事型`，但視覺已更貼近參考稿的高密度作品展示：

1. 以 full-width desktop canvas 和大型視覺 hero 立即建立服務類型與記憶點
2. 用流程區塊說明合作方式，降低第一次詢問的不確定性
3. 以作品卡與 modal 作為主要信任證明
4. 透過固定 CTA、footer CTA 與 floating LINE 保持轉換路徑一致

## 已確認決策

### 產品與架構

- 技術棧：`Nuxt 4 + Vue 3 + Tailwind CSS + Pinia + Vitest`
- 網站型態：一頁式首頁
- 主要聯絡方式：所有主要 CTA 導向 LINE 官方帳號
- LINE URL 由 runtime config/composable 統一提供

### Hero 與視覺系統

- 桌面版使用單一 hero carousel。
- Desktop layout 不使用頁面級最大寬度容器；navbar、hero stage、下方統計列與流程區需按 `desktop-hero-carousel-final-nav-process.png` 滿版鋪到 viewport 兩側。
- Slide 類型固定為 `Game`、`Website`、`App`。
- 每個 slide 包含：
  - `displayLabel`
  - `image`
  - `eyebrow`
  - `title`
  - `description`
  - single CTA
  - 三個帶 icon 的 stats
- 桌面 hero 中央 banner 為主視覺，左右顯示上一張/下一張窄版 preview。
- 切換 slide 時使用 `hero-fade` opacity/translate 動畫。
- 每張 hero slide 只保留一顆 CTA，全部暫時連到 LINE 官方帳號外部連結。

### 行動版行為

- 行動版不使用桌面 carousel。
- 行動版開場以 `game-hero.png` 作為最強主視覺。
- 行動版首屏文案為 `創意 × 技術 打造有價值的數位體驗`。
- 行動版 navbar 顯示 logo、`聯絡諮詢` CTA，以及簡化導覽。
- 導覽文字需與 desktop 語意一致，不再使用 `Game / Website / App` 作為頂層導覽。
- 目前首頁組裝不顯示獨立的 service branch blocks。

### 聯絡與 CTA

- Navbar desktop CTA：`聯絡諮詢`
- Navbar mobile CTA：`聯絡諮詢`
- Hero CTA 只保留單顆按鈕，依 slide 固定顯示 `淺談遊戲企劃`、`規劃網站設計`、`提案App設計`，全部開啟 LINE 官方帳號外部連結。
- Footer CTA 提供 `聯絡我` 與 `預約諮詢`，兩者都開啟 LINE
- Navbar 的 `聯絡我們` 導覽項目必須直接開啟 LINE 官方帳號外部連結，不導向頁內 `#contact`。
- Floating LINE 使用固定右下角圓形按鈕與未讀提示，點擊直接開啟 LINE 官方帳號。
- Floating LINE 不顯示聊天預覽視覺、不顯示對話框、不提供輸入欄位。

### 內容與區塊

目前實際首頁 v1 包含：

- `AppNavbar`
- `HeroCarousel` desktop
- `MobileHeroIntro` mobile
- `ProcessSection`
- `PortfolioSection`
- `TestimonialsSection`
- `FooterCtaSection`
- `LineFab`

目前首頁 v1 不包含：

- About 區塊
- Services 區塊
- Mobile service branch cards
- 真實聊天 widget
- 聊天預覽卡或對話框 UI
- Portfolio inner pages
- CMS/admin

## 資訊架構

### Desktop page rhythm

1. `Navbar`
2. `Hero Carousel`
3. `Process`
4. `Portfolio`
5. `Testimonials`
6. `Footer CTA`
7. `Floating LINE`

### Mobile page rhythm

1. `Navbar`
2. `Mobile Hero Intro`
3. `Portfolio`
4. `Testimonials`
5. `Footer CTA`
6. `Floating LINE`

目前 mobile 首頁沒有獨立 Process 區塊，因 `ProcessSection` 在頁面組裝中套用 `hidden lg:block`。

## 區塊規格

### Navbar

目的：

- 讓品牌與主要導覽固定可見
- 提供立即 LINE 洽詢入口
- 在行動版保持低摩擦導覽，不使用抽屜選單
- Desktop visual source of truth：`public/images/ui/vexdi-navbar.png`

Desktop：

- 全寬白底 navbar，高度約 72px，底部使用細分隔線。
- 左側為 VEXDI 風格 logo，包含 mark、`VEXDI` 字樣與小字 `GAME・WEBSITE・APP`。
- 中央 nav 使用繁體中文：`首頁 / 服務項目 / 案例作品 / 關於我們 / 聯絡我們`。
- Active state 以 `首頁` 下方的藍紫漸層短底線呈現。
- 右側包含太陽 icon theme button。
- 主要 CTA 為藍紫漸層膠囊按鈕，文字 `聯絡諮詢`，右側加箭頭。
- `聯絡我們` nav item 與右側 `聯絡諮詢` CTA 都必須使用 `useLineLink()` 提供的 LINE 官方帳號外部連結，並以新分頁開啟。
- Navbar 不使用卡片式圓角容器，不套用玻璃擬態外框。
- Desktop navbar 應貼齊頁面頂部並橫向延展到 `100vw`，而不是包在任何 hero/page 最大寬度容器內。

Mobile：

- 第一列為 logo 與 `聯絡諮詢`
- 第二列可使用簡化 direct nav，但導覽文字需沿用 desktop 語意
- 不使用 hamburger trigger 或 mobile drawer

### Hero Carousel

目的：

- 用高影響力主視覺快速說明三種服務能力
- 讓使用者能從 hero 直接進入 LINE 官方帳號

Desktop 行為：

- 只在 `lg` 以上顯示
- Hero carousel 外層 stage 必須滿版延展到 viewport 兩側，對齊 `desktop-hero-carousel-final-nav-process.png` 的全篇幅構圖。
- 中央主 banner 寬版呈現，右側為 slide image，左側為文字與 CTA。
- 左右兩側顯示上一張/下一張 preview，preview 可貼近或部分延伸到 viewport 邊界，不能被頁面 max-width 裁掉。
- 有 previous/next 圓形按鈕
- 有三個 slide dots、進度條與 `01 — 03` 狀態文字
- 切換時使用淡入與微位移動畫
- Hero 下方的 stats row、pagination row 也應採 full-width desktop band 處理，只在內容本身保留內距與欄寬控制。

Slide 視覺與內容：

- `Game`：使用 `/images/carousel/game-hero.png`，主打遊戲提案、角色視覺、互動 UI
- `Website`：使用 `/images/carousel/website-hero.png`，主打品牌敘事、RWD、SEO 基礎、CTA 路徑
- `App`：使用 `/images/carousel/app-hero.png`，主打 MVP、Dashboard、Prototype

Hero CTA：

- `Game` slide：唯一按鈕文字為 `淺談遊戲企劃`
- `Website` slide：唯一按鈕文字為 `規劃網站設計`
- `App` slide：唯一按鈕文字為 `提案App設計`
- 三顆按鈕都使用 `useLineLink()` 提供的 LINE 官方帳號外部連結
- 不顯示 secondary CTA，不顯示 `查看遊戲作品`、`查看網站案例`、`查看 App 案例` 或任何指向 `#portfolio` 的 hero 按鈕

Stats icon：

- Game：`game-timeline.svg`、`game-character.svg`、`game-ui.svg`
- Website：`web-rwd.svg`、`web-seo.svg`、`web-cta.svg`
- App：`app-flow.svg`、`app-dashboard.svg`、`app-prototype.svg`

### Mobile Hero Intro

目的：

- 在手機上用單一強主視覺替代 carousel
- 讓使用者不用操作 carousel 就能理解服務定位

內容：

- 標題：`創意 × 技術 打造有價值的數位體驗`
- 說明文：專注形象網站、遊戲開發與 App 設計
- 主圖：`/images/carousel/game-hero.png`
- CTA：
  - 僅保留 `淺談遊戲企劃` -> LINE 官方帳號外部連結
  - 不顯示 `查看作品` secondary CTA

### Process

目的：

- 降低洽詢焦慮
- 說明合作從想法到上線的可追蹤流程

目前只在桌面版首頁顯示。

流程步驟：

1. `需求釐清`
2. `敘事與線框`
3. `視覺與互動`
4. `上線與調整`

視覺：

- 四欄卡片
- 白底、圓角、輕陰影
- 標題為 `從想法到上線，流程保持清楚可追蹤`
- Desktop process reference 以 `desktop-hero-carousel-final-nav-process.png` 為準：流程可以呈現為滿版區域中的深色橫向 band，band 本身需接近全篇幅，不可被頁面級 max-width 壓成窄版。

### Portfolio

目的：

- 作為首頁主要信任證明
- 用圖像作品卡直接展示成果感

行為：

- 顯示作品 grid
- Mobile 為 2 欄
- Desktop 為 4 欄
- 實際資料有 3 筆，頁面會 concat 第一筆形成 4 張卡，讓 desktop grid 滿版
- 點擊作品卡開啟 portfolio modal

作品資料：

- `Sky Arcadia 遊戲提案頁`，圖片 `/images/portfolio/sky-arcadia.png`
- `Atelier 品牌形象網站`，圖片 `/images/portfolio/atelier-brand.png`
- `PulseTrack App 原型`，圖片 `/images/portfolio/pulse-track.png`

額外生成但目前不是主要資料來源的 portfolio 圖：

- `/images/portfolio/case-card-game.png`
- `/images/portfolio/case-website-brand.png`
- `/images/portfolio/case-website-saas.png`
- `/images/portfolio/case-app-product.png`

### Portfolio Modal

每個 modal 包含：

- 專案類型
- 標題
- 摘要
- highlights
- CTA leading to LINE

Modal 仍是 v1 的主要互動詳細層，不新增作品內頁。

### Testimonials

目的：

- 在作品區後補上社會證明
- 不使用 carousel

內容固定為三張卡：

- 品牌主理人
- 遊戲企劃
- 產品負責人

### Footer CTA

目的：

- 最後一次轉換推進

內容：

- 標題：`有專案想一起合作嗎？`
- 說明：`把你的想法告訴我，我會給你最合適的建議！`
- CTA：
  - `聯絡我` -> LINE
  - `預約諮詢` -> LINE

### Floating LINE

目的：

- 提供固定且明顯的 LINE 入口
- 用未讀提示營造可聯絡狀態，但不模擬站內聊天室

行為：

- 固定於右下角
- 圓形按鈕帶 unread badge
- 點擊直接開啟 LINE
- 不顯示聊天預覽卡
- 不顯示對話框 bubble 或訊息列表
- 不顯示輸入欄、送出按鈕或假聊天狀態
- 參考圖中的對話框功能需移除，只保留圓形 LINE/FAB 入口與紅色未讀數字

## 視覺語言

- 整體語氣：年輕、活潑、數位感強，但仍保有商務可信度
- 主色：teal/cyan
- 輔色：coral orange、深 teal、白底
- Layout：desktop 採 `100vw` full-width canvas、強主視覺、卡片式作品 grid；只允許單一區塊內部內容使用 padding/gap 控制閱讀寬度，不允許外層 main/page 使用固定 max-width 截斷全篇幅。
- Card radius：實作多使用 `1.35rem` 到 `2rem`
- Hero：以圖片為主，不再只依賴抽象 CSS mock
- 避免讓 Game 視覺壓過整站，因此 Website/App slide 與 portfolio 需保留專案型視覺平衡

## 資產清單

### Runtime hero assets

- `/public/images/carousel/game-hero.png`
- `/public/images/carousel/website-hero.png`
- `/public/images/carousel/app-hero.png`

### Runtime service/stat icons

- `/public/images/icons/game-timeline.svg`
- `/public/images/icons/game-character.svg`
- `/public/images/icons/game-ui.svg`
- `/public/images/icons/web-rwd.svg`
- `/public/images/icons/web-seo.svg`
- `/public/images/icons/web-cta.svg`
- `/public/images/icons/app-flow.svg`
- `/public/images/icons/app-dashboard.svg`
- `/public/images/icons/app-prototype.svg`
- `/public/images/icons/service-website.svg`
- `/public/images/icons/service-game.svg`
- `/public/images/icons/service-app.svg`

### Runtime portfolio assets

- `/public/images/portfolio/sky-arcadia.png`
- `/public/images/portfolio/atelier-brand.png`
- `/public/images/portfolio/pulse-track.png`
- `/public/images/portfolio/case-card-game.png`
- `/public/images/portfolio/case-website-brand.png`
- `/public/images/portfolio/case-website-saas.png`
- `/public/images/portfolio/case-app-product.png`

### Runtime UI reference assets

- `/public/images/ui/vexdi-navbar.png`
- `/public/images/ui/vexdi-process-flow.png`

### Reference assets

- `assets/references/vexdi-desktop-original-layout.png`
- `assets/references/vexdi-mobile-original-layout.png`
- `assets/references/vexdi-desktop-hero-carousel-final.png`
- `assets/references/vexdi-mobile-final-with-chat.png`
- `assets/references/vexdi-homepage-ci-redesign.png`
- `assets/references/desktop-hero-carousel-final-nav-process.png`：desktop full-width navbar、hero carousel、stats row、process band 的主要準則
- `assets/references/mobile-final-with-chat-nav-process.png`
- `assets/references/logo-concept-board-v1.png`

## Component Shape

目前首頁主要組裝：

- `app/pages/index.vue`
- `components/layout/AppNavbar.vue`
- `components/hero/HeroCarousel.vue`
- `components/hero/MobileHeroIntro.vue`
- `components/sections/ProcessSection.vue`
- `components/sections/PortfolioSection.vue`
- `components/sections/TestimonialsSection.vue`
- `components/sections/FooterCtaSection.vue`
- `components/floating/LineFab.vue`
- `components/overlay/PortfolioModal.vue`
- `components/icons/BrandLogo.vue`

資料與狀態：

- `app/data/homepage.ts`
- `app/types/homepage.ts`
- `composables/useLineLink.ts`
- `stores/hero.ts`
- `stores/portfolio.ts`
- `stores/ui.ts`

保留但目前未組裝到首頁：

- `components/sections/AboutSection.vue`
- `components/sections/ServicesSection.vue`
- `components/hero/MobileServiceBranches.vue`
- `components/hero/HeroVisualGame.vue`
- `components/hero/HeroVisualWebsite.vue`
- `components/hero/HeroVisualApp.vue`

## 測試要求

測試需覆蓋：

- `app/pages/index.vue` 確認首頁使用最新文案、desktop shell 滿版到 `100vw` 且不使用頁面級 `max-w-[96rem]` 或類似固定最大寬度截斷全篇幅，同時不再出現舊 About/Services 文案
- `HeroCarousel` 確認 slide 切換、banner artwork、stats icon 與單一 CTA
- `HeroCarousel` 確認三張 slide 的 CTA 分別為 `淺談遊戲企劃`、`規劃網站設計`、`提案App設計`，且全部使用 LINE 官方帳號外部連結
- `HeroCarousel` 確認不渲染 hero secondary CTA 或任何 `#portfolio` hero 按鈕
- `HeroCarousel` 確認 desktop stage、左右 preview、pagination/stats row 對齊 `desktop-hero-carousel-final-nav-process.png` 的 full-width 構圖
- `ProcessSection` 確認 desktop process band 不被頁面級 max-width 壓縮
- `MobileHeroIntro` 確認手機 hero 文案與單一 LINE CTA，且不渲染 `查看作品` secondary CTA
- `AppNavbar` 確認 desktop navbar 對齊 `vexdi-navbar.png` 的 logo、中文導覽、active underline、theme icon 與漸層 CTA
- `AppNavbar` 確認 `聯絡我們` nav item 與 `聯絡諮詢` CTA 都使用 LINE 官方帳號外部連結，而不是 `#contact`
- `AppNavbar` 確認 mobile direct nav 沿用 desktop 導覽語意
- `LineFab` 確認只渲染圓形 LINE/FAB 與 unread badge，不渲染聊天預覽卡、對話框或輸入欄
- `PortfolioSection`/`PortfolioModal` 確認作品卡可開啟 modal
- `app/data/homepage.ts` 確認三個 hero slide、三個 portfolio item 與圖片/icon 路徑
- `public/images/icons/service-*.svg` 確認服務 icon 保留 mobile reference 對齊標記

## V1 範圍

Included in v1：

- 一頁式首頁
- Desktop hero carousel
- Mobile single hero
- Desktop process section
- Portfolio grid + modal
- Testimonials
- Footer CTA
- Floating LINE button with unread badge only
- SVG logo
- Runtime image assets
- LINE-first conversion flow

Not included in v1：

- Real WebSocket chat
- 可輸入的站內客服系統
- 聊天預覽卡、對話框、訊息列表、假輸入欄
- Admin/CMS
- Portfolio inner pages
- Backend API
- 真實主題切換邏輯

## Spec Self-Review

Checked：

- 首頁組裝已對齊 `app/pages/index.vue`，不再描述舊 `pages/index.vue`。
- CTA flow 一致：主要轉換都開啟 LINE。
- Hero CTA 已收斂為每張 slide 單一按鈕，且三顆按鈕都外連 LINE 官方帳號。
- Chat preview / 對話框功能已明確排除；Floating LINE 僅保留圓形入口與未讀提示。
- Navbar 的 `聯絡我們` 已明確要求連到 LINE 官方帳號外部連結。
- Desktop navbar 已改以 `public/images/ui/vexdi-navbar.png` 作為視覺與內容準則。
- Desktop full-width layout 已改以 `assets/references/desktop-hero-carousel-final-nav-process.png` 作為 navbar、hero、stats row 與 process band 的全篇幅準則。
- Mobile navbar 已更新為 direct nav，不再描述 hamburger menu。
- About/Services 已標為保留但未組裝，避免和目前首頁行為矛盾。
- Runtime assets、reference assets、component shape 與測試要求已依近期 coding 修正更新。
