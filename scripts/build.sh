#!/bin/bash

function runCommandAndCheckStatus {
	#run command
	"$@"
	local status=$?
	if [ $status -ne 0 ]; then
		echo "error with $@" >&2
		exit $status
	fi
	return $status
}

if [ "$PROJECT_DIR" = "auto-deploy" ]
then
	echo "Skipping build for deployment matrix."
else
	cd $PROJECT_DIR
	if [ "$PROJECT_DIR" != "dojo-cli-example" ]
	then
		runCommandAndCheckStatus ./node_modules/.bin/dojo test -a -c "browserstack"
		runCommandAndCheckStatus ./node_modules/.bin/dojo build webpack
	else
		runCommandAndCheckStatus ./node_modules/.bin/grunt
		runCommandAndCheckStatus ./node_modules/.bin/grunt ci --combined
		runCommandAndCheckStatus ./node_modules/.bin/grunt remapIstanbul:ci
	fi
	cd ..
fi
