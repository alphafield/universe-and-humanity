# Universe and Humanity

**α-Theory 官方网站** - 宇宙、生命、意识与文明的统一理论

🌐 **网站**: [universeandhumanity.com](https://universeandhumanity.com)

---

## 📖 项目简介

这是 **Universe and Humanity** 的官方网站，展示 α-Theory（Alpha Theory）—— 一个跨越47年研究的统一理论框架，连接：

- 🌌 **宇宙物理** - 从母场到粒子
- 🧬 **生命科学** - 自组织与进化
- 🧠 **意识结构** - 跨域耦合机制
- 🏛️ **文明演化** - 集体α动力学

**核心方程**：
```
α = Coherence / Decoherence
```

---

## ✨ 网站特性

### 🎨 视觉设计
- **Three.js 星系背景** - 30,000粒子螺旋星系
- **玻璃态UI** - 半透明卡片 + 毛玻璃效果
- **极简风格** - SpaceX/Apple 级设计语言
- **深色主题** - 黑色背景 + 蓝金点缀

### 📱 响应式
- ✅ 桌面端（1920px+）
- ✅ 平板端（768px-1024px）
- ✅ 移动端（<768px）

### 🎯 核心内容
1. **Hero Section** - 宇宙之问
2. **Ultimate Questions** - 四个终极问题
3. **Scientists Gallery** - 无限滚动时间线
4. **Discovery** - α的发现
5. **Works** - 九卷主干 + 四副卷

---

## 🚀 快速开始

### 本地预览

```bash
# 1. 克隆项目
git clone https://github.com/USERNAME/universeandhumanity.git
cd universeandhumanity

# 2. 启动本地服务器（任选一种）
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000

# 3. 打开浏览器
# http://localhost:8000
```

### 部署到 Netlify

```bash
# 1. 安装 Netlify CLI
npm install -g netlify-cli

# 2. 登录
netlify login

# 3. 初始化
netlify init

# 4. 部署
netlify deploy --prod
```

或者直接拖拽到 [Netlify Drop](https://app.netlify.com/drop)

---

## 📂 项目结构

```
universeandhumanity/
├── index.html              # 主页（完整版）
├── README.md               # 项目文档
├── netlify.toml            # Netlify配置
├── .gitignore              # Git忽略文件
└── assets/                 # 资源文件（未来）
    ├── images/
    └── fonts/
```

---

## 🎨 技术栈

### 前端
- **HTML5** - 语义化标签
- **CSS3** - 原生CSS（无框架）
  - CSS变量系统
  - Flexbox/Grid布局
  - 动画与过渡
- **JavaScript (ES6+)** - 原生JS（无框架）
- **Three.js (r128)** - 3D星系背景

### 部署
- **Netlify** - 自动部署 + CDN
- **GitHub** - 版本控制

### 性能
- ✅ 60+ FPS 动画
- ✅ CDN加速
- ✅ 自动缓存
- ✅ HTTPS

---

## 🎯 设计理念

### CSS变量系统
```css
:root {
    --color-bg: #000;
    --color-text: #FFFFFF;
    --color-alpha: #00D9FF;
    --color-accent: #FFD700;
    --color-gray: #888888;
}
```

### 色彩体系
- **主色**: #00D9FF (α蓝) - 科技感
- **强调**: #FFD700 (金色) - 文明级
- **背景**: #000000 (纯黑) - 宇宙感

### 字体系统
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 
             "Segoe UI", Arial, sans-serif;
```

---

## ⚙️ 配置说明

### 星系背景参数

```javascript
// 粒子数量
const particleCount = 30000;  // 3万颗

// 相机设置
camera.position.z = 6.5;  // 距离

// 旋转速度
particleSystem.rotation.y += 0.001;   // Y轴
particleSystem.rotation.x += 0.0005;  // X轴
```

### 透明度设置

```css
/* 问题卡片 */
.question-card { 
    background: rgba(0,0,0,0.15); 
    backdrop-filter: blur(8px);
}

/* 科学家卡片 */
.scientist-card { 
    background: rgba(0,0,0,0.1); 
    backdrop-filter: blur(8px);
}
```

---

## 🔧 自定义调整

### 调整星系大小
```javascript
// 更大
camera.position.z = 5;

// 更小
camera.position.z = 8;
```

### 调整旋转速度
```javascript
// 更快
particleSystem.rotation.y += 0.002;

// 更慢
particleSystem.rotation.y += 0.0005;
```

### 调整粒子数量
```javascript
// 更密集
const particleCount = 50000;

// 性能优化
const particleCount = 15000;
```

### 调整卡片透明度
```css
/* 更透明 */
background: rgba(0,0,0,0.05);

/* 更不透明 */
background: rgba(0,0,0,0.3);
```

---

## 📊 性能优化

### 已实施
- ✅ 粒子系统优化（30K粒子 @ 60fps）
- ✅ CSS动画硬件加速
- ✅ 图片懒加载
- ✅ 代码压缩
- ✅ CDN缓存

### 建议
- 生产环境使用 WebP 图片
- 启用 Brotli 压缩
- 使用 HTTP/2

---

## 🌐 浏览器支持

| 浏览器 | 版本 | 支持度 |
|--------|------|--------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |

**Three.js 要求**:
- WebGL 1.0+
- 现代浏览器（ES6+）

---

## 📝 待办事项

### 短期
- [ ] Interface 页面（α结构坐标图）
- [ ] Works 详细页（九卷内容）
- [ ] Academic 页面（论文状态）
- [ ] Dialogue 页面（三物种对话）

### 中期
- [ ] 搜索功能
- [ ] 多语言支持（中/英）
- [ ] 暗色/亮色切换
- [ ] 打印样式

### 长期
- [ ] 交互式α坐标可视化
- [ ] WebGPU升级（支持时）
- [ ] PWA支持
- [ ] 性能监控

---

## 🤝 贡献指南

### 提交流程
1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范
- 使用2空格缩进
- CSS类名使用kebab-case
- JavaScript使用camelCase
- 保持代码简洁可读

---

## 📄 许可证

**版权所有 © 2024 Alpha Coherence Institute**

本项目采用 [MIT License](LICENSE)

---

## 📬 联系方式

- **网站**: [universeandhumanity.com](https://universeandhumanity.com)
- **Email**: contact@alphafield.org
- **机构**: Alpha Coherence Institute

---

## 🙏 致谢

### 技术栈
- [Three.js](https://threejs.org/) - 3D图形库
- [Netlify](https://www.netlify.com/) - 部署平台
- [cdnjs](https://cdnjs.com/) - CDN服务

### 设计灵感
- SpaceX 官网
- Apple 产品页
- MIT OpenCourseWare
- Nature 期刊

### 特别感谢
- Bruno Simon (Three.js Journey)
- 所有贡献者

---

## 📚 相关链接

- [α-Theory 论文](https://universeandhumanity.com/papers)
- [Alpha Coherence Institute](https://alphafield.org)
- [九卷主干](https://universeandhumanity.com/works)

---

**Built with 🌌 by Alpha Coherence Institute**

*"Structure is invariant across languages."*
