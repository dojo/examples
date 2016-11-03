#!/bin/bash
if [ "$PROJECT_DIR" = "auto-deploy" ]
then
	echo "Skipping install for deployment matrix."
else
	cd $PROJECT_DIR
	npm install dojo-cli
	npm install grunt-cli
	npm install
fi
