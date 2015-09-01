#!/usr/bin/env node
/*
 * infinite-gradients
 * http://skratchdot.com/projects/infinite-gradients
 *
 * Copyright (c) 2015 skratchdot
 * Licensed under the MIT license.
 */
'use strict';

var program = require('commander');
var infiniteGradients = require('./index');
var appInfo = require('../package.json');
var cssFunction = '';

// setup command line options
program
	.version(appInfo.version, '-v, --version')
	.option('-t, --type <type>', 'type of gradient: linear or radial', Math.random() < 0.5 ? 'linear' : 'radial')
	.option('-a, --angle <angle>', 'angle of linear gradient in degrees (0-360)', infiniteGradients.floatBetween(0, 360))
	.option('-x, --x <x>', 'x coordinate of radial gradient center (% between 0-1)', infiniteGradients.floatBetween(0, 1))
	.option('-y, --y <y>', 'y coordinate of radial gradient center (% between 0-1)', infiniteGradients.floatBetween(0, 1))
	.option('-o, --offset <offset>', 'the offset of the gradient (between 0-100)', infiniteGradients.floatBetween(0, 100))
	.option('-c, --colors <colors>', 'a list of 4 css colors', '')
	.parse(process.argv);

// convert colors argument to an array
program.colors = program.colors.toString().split(',');

// store either a linear or radial gradient in our cssFunction variable
if (program.type.toString().toLowerCase() === 'radial') {
	cssFunction = infiniteGradients.getRadialGradient(program.colors,
		program.offset, program.x, program.y);
} else {
	cssFunction = infiniteGradients.getLinearGradient(program.colors,
		program.offset, program.angle);
}

// display our css function
console.log(cssFunction);
