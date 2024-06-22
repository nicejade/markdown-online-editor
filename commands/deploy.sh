#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

# 进入生成的文件夹
cd ./dist

# 如果是发布到自定义域名
echo 'markdown.lovejade.cn' > CNAME

git init
git add -A
git commit -m '🎉 update release'

git push -f git@github.com:nicejade/markdown-online-editor.git main:gh-pages
cd -