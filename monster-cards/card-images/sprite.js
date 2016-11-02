#! /usr/bin/env node
'use strict';

const sprity = require('sprity');

const largeFileName = 'card-sprite-large';
const smallFileName = 'card-sprite-small';
const spriteOutputDir = '../src/widgets/card/';
const { assign } = Object;

const defaultOptions = {
	out: spriteOutputDir,
	format: 'jpg',
	margin: 0,
	template: './card-sprite-template.hbs'
};

const largeOptions = {
	src: 'large/*.png',
	name: largeFileName,
	style: `${largeFileName}.styl`,
	prefix: largeFileName
};

const smallOptions = {
	src: 'small/*.png',
	name: smallFileName,
	style: `${smallFileName}.styl`,
	prefix: smallFileName
};

sprity.create(assign(defaultOptions, largeOptions), () => {
	sprity.create(assign(defaultOptions, smallOptions));
});
