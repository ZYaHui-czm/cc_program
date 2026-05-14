# 备忘录 (Memo App)

一款类似 Microsoft To Do 的移动端备忘录 PWA 应用，支持**离线运行**、深色/浅色主题、中英文切换。

---

## 功能特性

- **三个栏目**：想法 / 规划 / 提醒
- **收藏管理**：星标收藏，独立筛选视图
- **提醒通知**：设置提醒时间，到期浏览器通知
- **主题切换**：浅色 / 深色一键切换
- **中英文**：全界面双语支持
- **本地账号**：用户名 + emoji 头像，数据存于浏览器
- **完全离线**：不依赖网络，IndexedDB 本地存储
- **PWA**：可安装到手机主屏幕，像原生 App 一样使用

---

## 环境要求

- **Node.js** >= 18
- **npm** >= 9

---

## 快速开始

```bash
# 1. 进入项目目录
cd memo-app

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

浏览器访问 `http://localhost:5173`，按 `F12` → 切换移动端视图即可预览手机效果。

---

## 构建部署

### 本地构建

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 部署到静态服务器

将 `dist/` 目录下的所有文件上传到任意静态文件服务器即可。以下为几种常见方式：

#### 方式一：使用 Vite 预览（本地测试）

```bash
npm run preview
```

#### 方式二：部署到 GitHub Pages

```bash
# 1. 构建
npm run build

# 2. 将 dist 推送到 gh-pages 分支
npx gh-pages -d dist
```

然后在仓库 Settings → Pages 中选择 `gh-pages` 分支。

#### 方式三：使用 serve 一键部署

```bash
npx serve dist
```

#### 方式四：部署到 Vercel / Netlify

直接将项目目录导入 Vercel 或 Netlify，构建命令设为 `npm run build`，输出目录设为 `dist`。

---

## PWA 安装到手机

1. 将构建后的 `dist/` 部署到支持 HTTPS 的服务器
2. 用手机浏览器（Safari/Chrome）打开网址
3. **iOS**：点击底部「分享」→「添加到主屏幕」
4. **Android**：点击浏览器菜单 →「安装应用」或「添加到主屏幕」

> 注意：PWA 需要 HTTPS 才能安装。本地开发时 `localhost` 例外。

---

## 项目结构

```
src/
├── main.tsx              # 入口文件
├── App.tsx               # 路由 + Provider 组装
├── index.css             # 全局样式 + CSS 变量主题
├── db/index.ts           # Dexie IndexedDB 数据库
├── types/index.ts        # TypeScript 类型定义
├── i18n/                 # 国际化翻译文件
│   ├── index.ts
│   └── locales/
│       ├── zh.json       # 中文翻译
│       └── en.json       # 英文翻译
├── contexts/             # React Context
│   ├── ThemeContext.tsx   # 主题管理
│   ├── LocaleContext.tsx  # 语言管理
│   └── AuthContext.tsx    # 用户认证
├── hooks/                # 自定义 Hooks
├── services/             # 通知服务 + 提醒轮询
├── pages/                # 页面组件
├── components/           # UI 组件
│   ├── Layout/           # 布局组件
│   ├── Items/            # 列表项组件
│   ├── Profile/          # 头像组件
│   └── Common/           # 通用组件
└── utils/                # 工具函数
```

---

## 技术栈

| 技术 | 用途 |
|---|---|
| React 19 | UI 框架 |
| TypeScript | 类型安全 |
| Vite 8 | 构建工具 |
| Dexie.js | IndexedDB 数据库封装 |
| react-router-dom v7 | 路由 |
| i18next | 国际化 |
| vite-plugin-pwa | PWA / Service Worker |

---

## 配置说明

### 修改 PWA 图标

替换 `public/icons/` 下的 `icon-192.png` 和 `icon-512.png`，
或修改 `scripts/generate-icons.js` 中的图标生成逻辑，然后运行：

```bash
node scripts/generate-icons.js
```

### 修改主题色

编辑 `vite.config.ts` 中 `VitePWA` 插件的 `theme_color` 和 `manifest` 配置。

### 修改默认语言

编辑 `src/i18n/index.ts` 中的 `lng` 和 `fallbackLng` 字段（`'zh'` / `'en'`）。

### 添加新语言

1. 在 `src/i18n/locales/` 下新建翻译文件（如 `ja.json`）
2. 在 `src/i18n/index.ts` 的 `resources` 中添加新语言
3. 在 `src/types/index.ts` 的 `Language` 类型中添加新语言代码
4. 在 `src/contexts/LocaleContext.tsx` 和 `src/pages/SettingsPage.tsx` 中添加切换选项

---

## 数据存储说明

所有数据存储在浏览器的 **IndexedDB** 中，包括：

- 用户信息（用户名、头像、偏好设置）
- 所有备忘录条目（标题、备注、收藏状态、提醒时间等）

数据不会上传到任何服务器。清除浏览器数据或卸载 PWA 会导致数据丢失，请在设置页使用「清空所有数据」功能。
