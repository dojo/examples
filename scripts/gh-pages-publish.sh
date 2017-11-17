#!/bin/bash

function buildProject {
	export PROJECT_DIR=$@
	./scripts/install.sh
	cd $PROJECT_DIR
	npm run build
	cd ..
}

if [ "$PROJECT_DIR" = "auto-deploy" ]
then

	declare -r SSH_FILE="$(mktemp -u $HOME/.ssh/XXXXX)"
	openssl aes-256-cbc -K $encrypted_5db33ae36efe_key -iv $encrypted_5db33ae36efe_iv -in "id_rsa.enc" -out "$SSH_FILE" -d
	chmod 600 "$SSH_FILE" && printf "%s\n" "Host github.com"  "  IdentityFile $SSH_FILE" "  LogLevel ERROR" >> ~/.ssh/config

	buildProject "todo-mvc"
	buildProject "todo-mvc-kitchensink"
	buildProject "todo-mvc-tsx"
	buildProject "widget-showcase"
	buildProject "custom-element-menu"

	export PROJECT_DIR="auto-deploy"

	git checkout -B gh-pages

	mkdir samples
	mkdir samples/todo-mvc
	mkdir samples/todo-mvc-kitchensink
	mkdir samples/todo-mvc-tsx
	mkdir samples/widget-showcase
	mkdir samples/custom-element-menu

	cp index.html samples/index.html
	cp -r todo-mvc/dist/* samples/todo-mvc/
	cp -r todo-mvc-kitchensink/dist/* samples/todo-mvc-kitchensink
	cp -r todo-mvc-tsx/dist/* samples/todo-mvc-tsx
	cp -r widget-showcase/dist/* samples/widget-showcase
	cp -r custom-element-menu/dist/* samples/custom-element-menu

	git remote add ssh-remote git@github.com:dojo/examples.git

	git add -f samples
	git commit -am "built example"

	git filter-branch -f --prune-empty --subdirectory-filter samples

	git push -f ssh-remote gh-pages

	git checkout -
else
	echo "only deploy during auto deploy matrix"
fi
