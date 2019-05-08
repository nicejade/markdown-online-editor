#!/usr/bin/env sh

set -e

git checkout --orphan latest_branch

git add -A

git commit -am "✨ initial create & commit"

git branch -D master

git branch -m master

git push -f origin master
