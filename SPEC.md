# 接案形象官網 Spec Draft

## 1. 專案目標

建立一個以桌機版首頁為核心的 One Page 接案形象官網，延續已定案的手機版視覺語言，主打三類服務：

- 遊戲相關專案
- 形象網站設計與切版
- App UI/UX 設計

網站的主要任務不是資訊堆疊，而是先用強烈主視覺建立記憶點，再引導使用者進入作品與諮詢流程。

## 1.1 開發技術定案

本案前端技術方向定為：

- Vue 3
- Vite
- Pinia
- Nuxt
- Vue Router
- Tailwind CSS

實作上建議解讀為：

- 以 `Nuxt 3` 作為專案框架
- 使用 Nuxt 內建的 Vue 3 與 Vite 開發流程
- 路由層採用 Nuxt 內建的 Vue Router 機制
- 狀態管理使用 Pinia
- 樣式系統使用 Tailwind CSS

補充說明：

- 若採 Nuxt，通常不會手動額外建立一套獨立的 Vue Router 設定，而是使用 Nuxt 的檔案式路由
- 由於本案目前是 one page，初期可以只保留首頁路由，後續若有作品內頁再擴充

## 2. 品牌定位

- 視覺語氣：活潑、創意、年輕，但要保有商務信任感
- 世界觀：女角立繪 + 二次元科技感 + 數位產品設計感
- 主色：藍綠
- 點綴色：珊瑚橘、亮黃
- 避免方向：過度傳統企業網站、過度花俏的遊戲特效堆疊、失去接案商務可信度

## 3. 首頁資訊架構

### 3.1 Navbar

- 左側：品牌 Logo
- 中間：`Game / Website / App / Portfolio / Contact`
- 右側：主 CTA `預約諮詢`
- 桌機版採 sticky navbar

### 3.2 Hero Carousel

Navbar 下方直接接一個大型橫向 carousel，只保留一組左右切換系統，不做三段式直向堆疊。

左側文案區需與當前 slide 一起切換，不使用固定同一套品牌主張文案。

#### Slide A: Game

- 主標：`打造有記憶點的遊戲體驗`
- 視覺重點：沿用手機版定案的女角主視覺語言
- 元素配置：女角立繪為主，遊戲 UI 卡片、少量 Website/App 浮動卡片為輔
- 原則：乾淨、聚焦、不要太花
- 角色使用規則：女角僅出現在 Game slide

#### Slide B: Website

- 主標：`讓品牌被看見，也被記住`
- 視覺重點：品牌首頁 mockup、排版系統、大圖 banner、模組化網站區塊
- 調性：成熟、清新、專業
- 視覺規則：不使用女角立繪，改以網站產品畫面與品牌版型為主

#### Slide C: App

- 主標：`把想法變成好上手的產品`
- 視覺重點：手機介面、數據圖表、流程模組、dashboard 卡片
- 調性：流暢、產品感、科技感
- 視覺規則：不使用女角立繪，改以介面卡片、數據與流程模組為主

#### Carousel 互動

- 左右箭頭切換
- 分頁 dots / tabs 顯示目前 slide
- 可支援自動輪播
- 中央 slide 為主視覺焦點

### 3.3 Service Summary

Hero 下方用 3 張卡片快速說明服務：

- 形象網站
- 遊戲專案
- App 設計

### 3.4 Portfolio Preview

精選作品區塊至少呈現 3 組作品摘要：

- 遊戲官網 / 活動頁
- 品牌形象網站
- App UI 專案

### 3.5 Testimonial

客戶回饋區塊提供 2 則短評，強調：

- 溝通效率
- 風格掌握能力
- 可落地執行

### 3.6 About

補入一個簡潔的 About 區塊，目的不是長篇自傳，而是快速建立信任感。

建議內容：

- 我是誰
- 擅長處理的專案型態
- 為何同時能承接網站、遊戲、App 類型案件
- 視覺與實作整合能力

### 3.7 Process

補入標準接案流程區塊，降低潛在客戶諮詢門檻。

建議拆成 4 個步驟：

- 需求諮詢
- 提案與排程
- 設計與開發
- 上線與優化

### 3.8 Footer CTA

頁尾 CTA 區塊提供：

- `立即預約`
- `下載作品簡介` 或 `查看作品`

## 4. 聊天小視窗 Spec

### 4.1 UI 角色

聊天窗是首頁的輔助轉換元件，用於承接即時諮詢，不應搶走 Hero 主視覺。

### 4.2 顯示方式

- 固定在右下角
- 預設收合成浮動按鈕
- 展開後顯示小型 chat panel

### 4.3 視覺組成

- Header：`立即聊聊`
- 狀態列：在線狀態 + 回覆速度提示
- 對話泡泡：至少 2 到 4 則示意訊息
- Input 區：輸入列 + 送出按鈕

### 4.4 與 WebSocket 的關係

目前先做 UI 與互動框架，後續 WebSocket 接入時需要支援：

- 連線中 / 已連線 / 斷線狀態
- 新訊息推入
- 使用者送出訊息
- 未讀提示
- 自動捲到最新訊息

### 4.5 非本階段範圍

目前先不處理：

- 後台客服系統
- 訊息持久化
- 身分驗證
- 多聊天室管理

### 4.6 聯絡導流

聊天窗之外，主 CTA 的實際導流先以 `LINE` 為主。

這代表：

- Navbar `預約諮詢`
- Hero CTA
- Footer CTA

都需要考慮導向 LINE 官方帳號、LINE 加好友連結，或 LINE 諮詢頁。

## 5. 技術方向

### 5.1 前端

- Nuxt 3 one page 首頁
- 首頁以元件化方式切分：Navbar、HeroCarousel、About、Services、Process、Works、Testimonials、ChatWidget、CTA
- 樣式以 Tailwind 為主，必要時搭配少量自訂 CSS 處理特殊視覺

### 5.2 狀態管理

Pinia 先保留給以下狀態：

- Hero carousel 當前 slide
- Chat widget 開關狀態
- 聯絡導流狀態
- 後續 WebSocket 連線與訊息列表

### 5.3 後續 WebSocket 預留

建議聊天元件後續拆成：

- `ChatWidgetShell`
- `ChatMessageList`
- `ChatComposer`
- `ConnectionStatusBadge`

建議前端狀態至少包含：

- `isOpen`
- `connectionStatus`
- `messages`
- `unreadCount`
- `draft`

### 5.4 路由策略

雖然是 one page，仍建議保留語意化區塊錨點：

- `#game`
- `#website`
- `#app`
- `#about`
- `#process`
- `#works`
- `#contact`

如未來擴充作品詳情頁，可再新增：

- `/works/[slug]`

### 5.5 內容資料結構

首頁主要內容建議資料化：

- slides
- about
- services
- processSteps
- works
- testimonials
- chat mock messages

## 6. 視覺規範

- 圓角大卡 + 柔和陰影
- 背景使用漸層與幾何光影，不用單色底
- 字體需清楚可讀，繁體中文為主
- 遊戲感只能集中在 Game slide，不可污染整體商務專業度
- Website / App slide 要顯示「能做商業案」的可信感

## 7. 本階段交付定義

本階段交付以「首頁前端雛形」為主，包含：

- Nuxt one page 首頁
- 單一 hero carousel
- 三張主視覺 slide
- About / 服務 / Process / 作品 / 評價 / CTA 區塊
- 聊天小視窗 UI

不包含：

- 後端 API
- WebSocket server
- CMS
- 完整作品內頁

## 8. 已確認決策

以下項目已與你確認，可視為目前版本定案：

1. Hero 左側文案區會跟著 slide 一起切換
2. 聊天窗預設收合
3. `預約諮詢` 導向 LINE
4. 女角僅出現在 Game slide
5. 首頁補上 `About` 與 `Process`

## 9. 下一步建議

在正式開切前，下一份 spec 可以再補兩個層級：

- 內容層：每個區塊的實際文案草稿
- 元件層：Nuxt 頁面與 components 拆分方式

## 10. 首頁文案 Spec

本段提供首頁各區塊的第一版文案方向，後續可再依照你的個人品牌語氣微調。

### 10.1 品牌總主張

建議主品牌語氣：

- 創意 x 技術
- 打造有價值的數位體驗
- 專注形象網站、遊戲開發與 App 設計

品牌描述短句建議：

`把視覺風格、互動體驗與可開發性整理成同一套提案邏輯。`

### 10.2 Navbar 文案

- Logo 文字：`創意 x 技術`
- 導覽：`Game / Website / App / About / Process / Portfolio / Contact`
- 主 CTA：`加 LINE 諮詢`

### 10.3 Hero 文案

Hero 左側文案需隨 slide 一起切換。

#### Game Slide

- Eyebrow：`互動敘事 x 角色魅力`
- Title：`打造有記憶點的遊戲體驗`
- Description：
  `用角色主視覺、活動頁設計與遊戲 UI 整合，讓世界觀不只好看，也更容易被玩家記住。`
- Primary CTA：`加 LINE 聊遊戲案`
- Secondary CTA：`查看遊戲作品`
- Stats：
  - `角色視覺整合`
  - `活動頁 / 官網`
  - `遊戲介面設計`

#### Website Slide

- Eyebrow：`品牌感 x 轉換率`
- Title：`讓品牌被看見，也被記住`
- Description：
  `從首頁敘事、服務架構到響應式切版，打造兼具品牌辨識與商務說服力的形象網站。`
- Primary CTA：`加 LINE 談網站案`
- Secondary CTA：`查看網站作品`
- Stats：
  - `品牌首頁設計`
  - `RWD 響應式切版`
  - `內容導購節奏`

#### App Slide

- Eyebrow：`產品邏輯 x 使用手感`
- Title：`把想法變成好上手的產品`
- Description：
  `以清楚的資訊架構、操作流程與高保真介面，把 App 概念整理成可以進開發的產品設計。`
- Primary CTA：`加 LINE 談 App 案`
- Secondary CTA：`查看 App 作品`
- Stats：
  - `流程規劃`
  - `元件系統`
  - `Dashboard / 數據 UI`

### 10.4 About 文案

本區塊先走「能力定位」而非長篇故事。

- Section Label：`About`
- Title：`我不只做畫面，也協助把專案整理成能推進的設計方案`
- Intro：
  `主要承接形象網站、遊戲相關頁面與 App UI 設計，擅長把視覺風格、內容邏輯與開發實作整合成同一條工作流程。`

建議 3 個能力點：

- `品牌與體驗整合`
  `從第一眼的視覺印象，到使用者操作路徑，都會一起考慮。`
- `跨類型專案適應力`
  `能處理網站、遊戲宣傳頁、產品介面等不同形式的數位需求。`
- `設計可落地`
  `在提案階段就預留後續切版、互動與元件化的思考，降低實作落差。`

### 10.5 Services 文案

- Section Label：`Services`
- Title：`把不同型態的數位需求整理成清楚可執行的方案`

#### Service Card 1

- Title：`形象網站`
- Description：
  `品牌官網、活動頁、服務介紹頁與作品頁，強化第一印象與轉換節奏。`

#### Service Card 2

- Title：`遊戲專案`
- Description：
  `遊戲官網、活動主視覺、角色頁與宣傳頁設計，讓世界觀與介面表現更一致。`

#### Service Card 3

- Title：`App 設計`
- Description：
  `從資訊架構、使用流程到高保真 UI，協助產品更順利進入開發與驗證。`

### 10.6 Process 文案

本版先採 4 步驟。

- Section Label：`Process`
- Title：`從需求到交付，流程簡潔但不省略關鍵判斷`

#### Step 1

- Title：`需求諮詢`
- Description：
  `先了解專案目標、受眾、時程與預算區間，確認方向是否適合合作。`

#### Step 2

- Title：`提案與排程`
- Description：
  `整理頁面架構、設計方向與交付內容，讓合作範圍與時程一開始就清楚。`

#### Step 3

- Title：`設計與製作`
- Description：
  `依照確認後的方向進行視覺設計、介面細化與必要的互動規劃。`

#### Step 4

- Title：`交付與優化`
- Description：
  `完成交付後進行調整與驗收，讓設計能順利進入上線或開發流程。`

### 10.7 Portfolio 文案

- Section Label：`Portfolio`
- Title：`精選作品`
- Intro：
  `從品牌網站到遊戲頁與 App 介面，挑幾個最能代表工作方式的案例。`

作品卡命名建議：

- `奇幻動作遊戲官網`
- `品牌形象網站改版`
- `生活數據 App 介面`

作品卡輔助標籤建議：

- `Game`
- `Website`
- `App`

### 10.8 Testimonial 文案

- Section Label：`Client Notes`
- Title：`合作時最常被提到的是溝通清楚、風格準、執行穩定`

短評示意：

- `很快抓到品牌想傳達的氣質，設計不只是好看，也很知道怎麼說服客戶。`
- `在視覺之外，也幫我們整理了頁面架構與開發方向，溝通效率很高。`

### 10.9 Chat Widget 文案

聊天小視窗建議文案：

- Header：`立即聊聊`
- Online Text：`通常 5 分鐘內回覆`
- Placeholder：`輸入你的專案需求...`
- Button：`送出`

示意訊息：

- User：`我想做品牌形象網站，方便估時程嗎？`
- Agent：`可以，先聊需求與頁數，我會提供初步規劃。`
- User：`之後也可能要加即時聊天功能。`
- Agent：`沒問題，前端介面可以先預留，後續再接 WebSocket。`

### 10.10 Footer CTA 文案

- Section Label：`Start a Project`
- Title：`有專案想一起合作嗎？`
- Description：
  `如果你正在規劃網站、遊戲頁或 App 介面，歡迎直接加 LINE 討論需求。`
- Primary CTA：`加 LINE 諮詢`
- Secondary CTA：`查看作品`

## 11. 元件拆分 Spec

若使用 Nuxt 3，首頁可先這樣拆：

- `pages/index.vue`
- `components/layout/AppNavbar.vue`
- `components/hero/HeroCarousel.vue`
- `components/hero/HeroSlideGame.vue`
- `components/hero/HeroSlideWebsite.vue`
- `components/hero/HeroSlideApp.vue`
- `components/sections/AboutSection.vue`
- `components/sections/ServicesSection.vue`
- `components/sections/ProcessSection.vue`
- `components/sections/PortfolioSection.vue`
- `components/sections/TestimonialsSection.vue`
- `components/sections/FooterCtaSection.vue`
- `components/chat/ChatWidget.vue`

Pinia store 建議：

- `stores/ui.ts`
  - 管理 navbar、section 狀態、聊天窗開關
- `stores/hero.ts`
  - 管理 carousel 當前 slide、切換行為、自動輪播
- `stores/chat.ts`
  - 管理聊天訊息、未讀數、連線狀態、後續 WebSocket 邏輯

## 12. 後續討論建議

在進入正式開發前，下一輪建議討論：

1. LINE 導流形式
2. About 區塊是否需要放個人照片或角色化頭像
3. Portfolio 要先放真作品還是示意稿
4. Chat widget 之後要做真人客服，還是 AI + 真人混合

## 13. Reference Assets

目前已固定留存的設計 reference 如下：

- Mobile 定案稿（含聊天小視窗）：
  [mobile-final-with-chat.png](C:\Users\abc102601\Documents\Codex\2026-04-25-new-chat\creative-tech-studio\assets\references\mobile-final-with-chat.png)
- Desktop 定案稿（單一 hero carousel）：
  [desktop-hero-carousel-final.png](C:\Users\abc102601\Documents\Codex\2026-04-25-new-chat\creative-tech-studio\assets\references\desktop-hero-carousel-final.png)
- Logo 概念稿：
  [logo-concept-board-v1.png](C:\Users\abc102601\Documents\Codex\2026-04-25-new-chat\creative-tech-studio\assets\references\logo-concept-board-v1.png)

Logo 使用決策：

- 目前選用概念板中的「方案四」
- 現階段先以 reference direction 視為定案
- 正式進入開發時，建議再重繪為 `SVG` 版本，方便用於 navbar、favicon、LINE 官方帳號與深淺底切換

## 14. 目前仍缺的實作細節

以下項目不會推翻目前 spec，但若不先補，正式開發時會一直遇到需要臨時猜測的地方：

### 14.1 聯絡導流細節

- `LINE 官方帳號` 的實際連結尚未定義
- CTA 點擊後是直接開 LINE、開新分頁，還是先跳站內說明，尚未定案
- 聊天小視窗與 LINE CTA 的角色邊界尚未完全切開
  - 目前 spec 只說主 CTA 走 LINE
  - 但 chat widget 仍保留 WebSocket 對話方向
  - 需要明確定義兩者在首頁中的分工

### 14.2 RWD 行為細節

- 桌機版是單一 hero carousel，但手機版是否也保留 carousel，或改成單張主視覺 + 直向內容，尚未明確定義
- Navbar 在手機版是漢堡選單、抽屜選單，還是簡化錨點列，尚未定案
- 聊天小視窗在手機版的展開尺寸、覆蓋範圍與收合位置尚未定義

### 14.3 資產交付清單

- Logo 目前只有概念方向，尚缺正式 `SVG` 主檔
- 尚未定義 favicon、社群縮圖、OG image 是否在本階段製作
- Hero 圖與作品縮圖的實際輸出尺寸、格式與命名規則尚未整理

### 14.4 動畫與互動規範

- Hero carousel 的自動輪播秒數、hover/drag/keyboard 行為尚未明確定義
- 頁面 scroll reveal、卡片浮動、聊天窗進出場等動態語言還沒有獨立規範
- `prefers-reduced-motion` 是否支援、如何降級，尚未寫入 spec

### 14.5 無障礙與可用性規範

- 鍵盤操作需求尚未定義
  - Navbar
  - Carousel arrows / dots
  - Chat widget
- 色彩對比與 focus state 規範尚未列出
- 圖像替代文字策略與 decorative image 的處理方式尚未定義

### 14.6 SEO 與站點資訊

- 首頁 `title`、`meta description` 目前只有初版方向，尚未正式定稿
- Open Graph、社群分享標題與預覽圖尚未定義
- 是否需要 sitemap、robots、schema.org 基本標記，尚未決定

### 14.7 內容資料結構深度

- `works` 目前只有示意卡片名稱，尚缺真正實作會需要的欄位定義
  - slug
  - cover image
  - category
  - summary
  - external/internal link
- `testimonials` 尚缺 avatar、公司名、排序與是否輪播的規則
- `slides` 尚缺圖像資產與 CTA target 的具體欄位定義

### 14.8 開發結構細節

- spec 目前已列出元件拆分方向，但還沒定義資料是寫死在頁面、集中在 `content/`、還是抽成 constants
- Pinia store 已有方向，但各 store 的最終 state shape 尚未正式定稿
- 尚未決定首頁切版是否在第一版就拆成完整 section components，或先集中在 `pages/index.vue` 再逐步拆分
