#!/bin/bash
if [ "$PROJECT_DIR" = "auto-deploy" ]
then
	echo "Skipping install for deployment matrix."
else
	cd $PROJECT_DIR
	travis_retry npm install grunt-cli
	travis_retry npm install
fi
