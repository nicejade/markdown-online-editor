#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

# 进入生成的文件夹
cd ./dist

# 如果是发布到自定义域名
echo 'vue-cli3.lovejade.cn' > CNAME

git init
git add -A
git commit -m '🎉 update release'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/nicejade/awesome-vue-cli3-example.git master:gh-pages
cd -