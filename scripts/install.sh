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
	echo "Skipping install for deployment matrix."
else
	cd $PROJECT_DIR
	runCommandAndCheckStatus npm install dojo-cli
	runCommandAndCheckStatus npm install grunt-cli
	runCommandAndCheckStatus npm install
fi
