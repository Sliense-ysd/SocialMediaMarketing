#!/bin/bash

# 创建环境变量文件
echo "创建环境变量文件..."

# 前端环境变量
cat > apps/frontend/.env.local << EOL
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# 前端 URL 配置
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
EOL

echo "环境变量文件已创建！"
echo ""
echo "请编辑 apps/frontend/.env.local 文件，填入您的 Supabase URL 和匿名密钥。"
echo ""
echo "按照以下步骤获取 Supabase 凭据："
echo "1. 登录 Supabase 控制台 (https://app.supabase.com)"
echo "2. 选择您的项目"
echo "3. 进入项目设置 → API"
echo "4. 复制 '项目 URL' 作为 NEXT_PUBLIC_SUPABASE_URL"
echo "5. 复制 '匿名公钥' 作为 NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo ""
echo "完成后，运行以下命令启动应用："
echo "cd apps/frontend && npm run dev" 