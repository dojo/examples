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
	runCommandAndCheckStatus npm run lint
	runCommandAndCheckStatus npm run test:ci
	runCommandAndCheckStatus npm run build
	cd ..
fi
