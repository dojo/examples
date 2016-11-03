#!/bin/bash
if [ "$PROJECT_DIR" = "auto-deploy" ]
then
	echo "Skipping build for deployment matrix."
else
	cd $PROJECT_DIR
	./node_modules/.bin/grunt
	./node_modules/.bin/grunt ci --combined
	./node_modules/.bin/grunt remapIstanbul:ci
	./node_modules/.bin/dojo build webpack
	cd ..
fi
