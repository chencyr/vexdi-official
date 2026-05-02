# Vexdi 維思迪 — 官方網站

純靜態多頁網站。設計與內容同步自 [chencyr/ui-design-vexdi-official](https://github.com/chencyr/ui-design-vexdi-official)。

## 結構

```
.
├── index.html              # 首頁
├── about/index.html        # 關於
├── services/index.html     # 服務
├── cases/index.html        # 概念作品
├── process/index.html      # 合作流程
├── founding/index.html     # 創始客戶
├── blog/                   # 觀點（index + 文章）
├── legal/                  # privacy / terms / security
├── assets/
│   ├── style.css           # 共用樣式
│   └── partial.js          # nav/footer 注入、互動（reveal、FAQ、drawer、hero canvas）
└── monbyw53-header-logo-pic-font-white.png
```

頁面透過 `<body data-base="">`（首頁）或 `<body data-base="../">`（子頁）告訴 `partial.js` 如何展開連結與資源路徑。

## 本地預覽

無需 build，任一 static server 即可：

```bash
python3 -m http.server 8000
```

開 `http://localhost:8000`。

## 部署

Cloudflare Pages 直接從 repo root 服務檔案。

- Build command：**留空**
- Build output directory：**`/`**（或留空）
- Root directory：`/`

無 Node 依賴、無 build pipeline。
