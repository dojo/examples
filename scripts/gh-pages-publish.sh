#!/bin/bash

cd todo-mvc

dojo build webpack

cd ..

cd monster-cards

grunt stylus:dist
dojo build webpack

cd ..

git checkout -B gh-pages

mkdir samples
mkdir samples/todo-mvc
mkdir samples/monster-cards

cp index.html samples/index.html
cp -r monster-cards/dist/* samples/monster-cards/
cp -r todo-mvc/dist/* samples/todo-mvc/

git add -f samples
git commit -am "built example"

git filter-branch -f --prune-empty --subdirectory-filter samples

git push -f origin gh-pages

git checkout -

