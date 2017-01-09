#!/bin/bash

function buildProject {
	export PROJECT_DIR=$@
	./scripts/install.sh
	cd $PROJECT_DIR
	npm install typings
	./node_modules/.bin/typings install
	./node_modules/.bin/dojo build webpack
	cd ..
}

if [ "$PROJECT_DIR" = "auto-deploy" ]
then
	if [ ! -z "$GH_TOKEN" ]
	then

		buildProject "todo-mvc"

		export PROJECT_DIR="auto-deploy"

		git checkout -B gh-pages

		mkdir samples
		mkdir samples/todo-mvc

		cp index.html samples/index.html
		cp -r todo-mvc/dist/* samples/todo-mvc/

		git remote add pages "https://$GH_TOKEN@github.com/dojo/examples.git"

		git add -f samples
		git commit -am "built example"

		git filter-branch -f --prune-empty --subdirectory-filter samples

		git push -f pages gh-pages

		git checkout -
	else
		echo "No GH_TOKEN detected"
	fi
else
	echo "only deploy during auto deploy matrix"
fi
