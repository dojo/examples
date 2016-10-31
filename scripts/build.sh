#!/bin/bash
if [ "$PROJECT_DIR" = "auto-deploy" ]
then
	echo "Skipping build for deployment matrix."
else
	grunt
	grunt ci --combined
	grunt remapIstanbul:ci
	cd ..
fi
