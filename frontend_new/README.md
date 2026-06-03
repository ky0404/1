# 媛心烨语 - 新前端 (企业级重构版)

## 技术栈

- **React 19** + **TypeScript** (企业级类型安全)
- **Vite 6** (极速开发体验)
- **Tailwind CSS 3** (现代化 CSS 方案)
- **Framer Motion** (流畅动画)
- **shadcn/ui** 风格组件
- **lucide-react** (图标库)
- **Axios** + **Fetch** (API 调用)
- **Sonner** (Toast 通知)

## 项目结构

```
frontend_new/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui 风格基础组件
│   │   ├── AIStatus.tsx          # AI 状态指示器
│   │   ├── AuthModal.tsx         # 登录弹窗
│   │   ├── ChatMessage.tsx       # 聊天消息组件
│   │   ├── EmotionAnalysisCard.tsx  # 情绪分析卡片
│   │   ├── EmotionEnergyBall.tsx # 情绪能量球
│   │   ├── ModeSelector.tsx      # 模式选择器
│   │   ├── ParticleBackground.tsx # 粒子背景
│   │   └── SlideCaptcha.tsx      # 滑块验证码
│   ├── hooks/
│   │   └── useChat.ts    # 聊天逻辑 Hook
│   ├── lib/
│   │   ├── api.ts        # API 封装
│   │   ├── config.ts     # 配置常量
│   │   └── utils.ts      # 工具函数
│   ├── types/
│   │   └── index.ts      # TypeScript 类型定义
│   ├── App.tsx           # 主应用
│   ├── main.tsx          # 入口文件
│   └── index.css         # 全局样式
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 快速开始

### 1. 安装依赖

```bash
cd frontend_new
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 3. 构建生产版本

```bash
npm run build
```

## 对接后端 API

新前端已对接现有的后端服务：

| 后端接口 | 用途 |
|---------|------|
| `POST /api/emo_analysis` | 普通情绪分析 |
| `POST /api/emo_analysis_stream` | SSE 流式分析（推荐）|
| `POST /api/feedback` | 反馈提交 |
| `GET /api/auth/me` | 获取当前用户 |
| `POST /api/auth/github` | GitHub OAuth 登录 |
| `POST /api/auth/logout` | 登出 |

### 配置后端地址

修改 `vite.config.ts` 中的 proxy 配置：

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8000',  // 修改为你的后端地址
    changeOrigin: true,
  },
}
```

## 功能特性

### 已实现
- ✅ 三种对话模式（智能分析 / 暖心夸夸 / 温柔安慰）
- ✅ SSE 流式输出（打字机效果）
- ✅ 情绪分析卡片 + 能量球可视化
- ✅ 深色/浅色主题切换
- ✅ 滑块验证码
- ✅ GitHub OAuth 登录
- ✅ 聊天记录本地缓存
- ✅ 云端历史同步（登录用户）
- ✅ 粒子背景动画
- ✅ 消息反馈（点赞/踩/重试）

### 开发中
- 🔄 情绪趋势图表 (ECharts)
- 🔄 用户画像展示
- 🔄危机干预随访

## 企业级优化

| 优化项 | 说明 |
|--------|------|
| TypeScript | 完整类型定义，类型安全 |
| 错误处理 | API 降级、错误提示、边界处理 |
| 性能优化 | 代码分割、按需加载 |
| 可访问性 | ARIA 属性、键盘导航 |
| SEO | Meta 标签优化 |
| 安全 | 验证码、Cookie 认证 |

## 组件复用

`components/` 目录下的 UI 组件可直接复用：

```tsx
import ChatMessage from '@/components/ChatMessage';
import EmotionEnergyBall from '@/components/EmotionEnergyBall';
import ModeSelector from '@/components/ModeSelector';
```

## License

MIT © 2025 媛心烨语团队