<p align="center">
  <a href="https://affiliate.postiz.com">
    <img src="https://github.com/user-attachments/assets/af9f47b3-e20c-402b-bd11-02f39248d738" />
  </a>
</p>

<p align="center">
  <a href="https://postiz.com/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/765e9d72-3ee7-4a56-9d59-a2c9befe2311">
    <img alt="Postiz Logo" src="https://github.com/user-attachments/assets/f0d30d70-dddb-4142-8876-e9aa6ed1cb99" width="280"/>
  </picture>
  </a>
</p>


<p align="center">
<a href="https://opensource.org/licenses/Apache-2.0">
  <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License">
</a>
</p>

<div align="center">
  <strong>
  <h2>Your ultimate AI social media scheduling tool</h2><br />
  <a href="https://postiz.com">Postiz</a>: An alternative to: Buffer.com, Hypefury, Twitter Hunter, Etc...<br /><br />
  </strong>
  Postiz offers everything you need to manage your social media posts,<br />build an audience, capture leads, and grow your business.
</div>


<div class="flex" align="center">
  <br />
  <img alt="Instagram" src="https://postiz.com/svgs/socials/Instagram.svg" width="32">
  <img alt="Youtube" src="https://postiz.com/svgs/socials/Youtube.svg" width="32">
  <img alt="Dribbble" src="https://postiz.com/svgs/socials/Dribbble.svg" width="32">
  <img alt="Linkedin" src="https://postiz.com/svgs/socials/Linkedin.svg" width="32">
  <img alt="Reddit" src="https://postiz.com/svgs/socials/Reddit.svg" width="32">
  <img alt="TikTok" src="https://postiz.com/svgs/socials/TikTok.svg" width="32">
  <img alt="Facebook" src="https://postiz.com/svgs/socials/Facebook.svg" width="32">
  <img alt="Pinterest" src="https://postiz.com/svgs/socials/Pinterest.svg" width="32">
  <img alt="Threads" src="https://postiz.com/svgs/socials/Threads.svg" width="32">
  <img alt="X" src="https://postiz.com/svgs/socials/X.svg" width="32">
  <img alt="X" src="https://postiz.com/svgs/socials/Slack.svg" width="32">
  <img alt="X" src="https://postiz.com/svgs/socials/Discord.svg" width="32">
  <img alt="X" src="https://postiz.com/svgs/socials/Mastodon.svg" width="32">
  <img alt="X" src="https://postiz.com/svgs/socials/Bluesky.svg" width="32">
</div>

<p align="center">
  <br />
  <a href="https://docs.postiz.com" rel="dofollow"><strong>Explore the docs »</strong></a>
  <br />

  <br/>
    <a href="https://platform.postiz.com">Register</a>
    ·
    <a href="https://discord.postiz.com">Join Our Discord (devs only)</a>
    ·
    <a href="https://twitter.com/getpostiz">X</a>
    ·
    <a href="https://gitroom.com">Gitroom</a>
    ·
    <a href="https://git.sn/telegram">Telegram (Crypto)</a>
  </p>

<br />

<p align="center">
  <video src="https://github.com/user-attachments/assets/05436a01-19c8-4827-b57f-05a5e7637a67" width="100%" />
</p>

## ✨ Features

| ![Image 1](https://github.com/user-attachments/assets/a27ee220-beb7-4c7e-8c1b-2c44301f82ef) | ![Image 2](https://github.com/user-attachments/assets/eb5f5f15-ed90-47fc-811c-03ccba6fa8a2) |
|--------------------------------|--------------------------------|
| ![Image 3](https://github.com/user-attachments/assets/d51786ee-ddd8-4ef8-8138-5192e9cfe7c3) | ![Image 4](https://github.com/user-attachments/assets/91f83c89-22f6-43d6-b7aa-d2d3378289fb) |

# Intro

- Schedule all your social media posts (many AI features)
- Measure your work with analytics.
- Collaborate with other team members to exchange or buy posts.
- Invite your team members to collaborate, comment, and schedule posts.
- At the moment there is no difference between the hosted version to the self-hosted version

## Tech Stack

- NX (Monorepo)
- NextJS (React)
- NestJS
- Prisma (Default to PostgreSQL)
- Redis (BullMQ)
- Resend (email notifications)

## Quick Start
To have the project up and running, please follow the [Quick Start Guide](https://docs.postiz.com/quickstart)

## Invest in the Postiz Coin :)
DMsTbeCfX1crgAse5tver98KAMarPWeP3d6U3Gmmpump

# License

This repository's source code is available under the [AGPL-3.0 license](LICENSE).

<br /><br /><br />

<p align="center">
  <a href="https://www.g2.com/products/postiz/take_survey" target="blank"><img alt="g2" src="https://github.com/user-attachments/assets/892cb74c-0b49-4589-b2f5-fbdbf7a98f66" /></a>
</p>

# 社交媒体营销平台

基于Postiz框架构建的社交媒体营销管理平台，帮助用户高效管理和规划社交媒体内容。

## 功能特点

- 多平台社交媒体内容管理
- 发布日历和内容调度
- 数据分析和性能监控
- AI辅助内容创建
- 团队协作工具

## 技术架构

- **前端**: Next.js, TypeScript, TailwindCSS
- **后端**: NestJS, Prisma ORM
- **数据库**: PostgreSQL, Redis
- **认证**: OAuth 2.0 (Google, GitHub等)
- **部署**: Docker, Google Cloud Run

## 本地开发

### 先决条件

- Node.js (v20+)
- PNPM (v10+)
- PostgreSQL
- Redis

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/Sliense-ysd/SocialMediaMarketing.git
cd SocialMediaMarketing
```

2. 安装依赖
```bash
pnpm install
```

3. 配置环境变量
```bash
cp .env.example .env
# 编辑.env文件，填写必要的配置
```

4. 推送数据库架构
```bash
pnpm run prisma-db-push
```

5. 启动开发服务器
```bash
pnpm run dev
```

前端将在 http://localhost:4200 启动，后端API将在 http://localhost:3000 提供服务。

## 生产环境部署

### Google Cloud Run部署

1. 安装Google Cloud SDK
2. 配置生产环境变量
```bash
cp .env.example .env.production
# 编辑.env.production文件
```

3. 部署前端
```bash
cd apps/frontend
gcloud run deploy frontend --source . --platform managed
```

4. 部署后端
```bash
cd ../backend
gcloud run deploy backend --source . --platform managed
```

5. 配置数据库
```bash
# 创建Cloud SQL实例
gcloud sql instances create postiz-db --tier=db-f1-micro

# 创建数据库
gcloud sql databases create postiz-db --instance=postiz-db
```

## 许可证

AGPL-3.0


