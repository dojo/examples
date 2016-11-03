#!/bin/bash
if [ "$PROJECT_DIR" = "auto-deploy" ]
then
	git checkout -B gh-pages

	mkdir samples
	mkdir samples/todo-mvc
	mkdir samples/monster-cards

	cp index.html samples/index.html
	cp -r monster-cards/dist/* samples/monster-cards/
	cp -r todo-mvc/dist/* samples/todo-mvc/

	git remote add pages "https://$GH_TOKEN@github.com/dojo/examples.git"

	git add -f samples
	git commit -am "built example"

	git filter-branch -f --prune-empty --subdirectory-filter samples

	git push -f pages gh-pages

	git checkout -
fi
