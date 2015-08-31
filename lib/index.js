var onecolor = require('onecolor');

exports.toDegrees = function (radians) {
	return radians * (180 / Math.PI);
};

exports.getAngle = function (x1, y1, x2, y2) {
	var angle = exports.toDegrees(Math.atan2(y2 - y1, x2 - x1));
	if (angle < 0) {
		angle += 360;
	}
	return angle;
};

exports.getDistance = function (x1, y1, x2, y2) {
	var distY = Math.abs(y2 - y1);
	var distX = Math.abs(x2 - x1);
	return Math.sqrt((distY * distY) + (distX * distX));
};

exports.toHex = function (num) {
	var hex = num.toString(16);
	if (hex.length === 1) {
		hex = '0' + hex;
	}
	return hex;
};

exports.randomBetween = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.randomColor = function () {
	return '#' +
		exports.toHex(exports.randomBetween(0, 255)) +
		exports.toHex(exports.randomBetween(0, 255)) +
		exports.toHex(exports.randomBetween(0, 255));
};

var gradientSuffix = function (colors, offset) {
	var i, currentColor;
	offset = parseFloat(offset) % 100;
	if (!Array.isArray(colors)) {
		colors = [];
	}
	// ensure an array of at least 4
	while (colors.length < 4) {
		colors.push(exports.randomColor());
	}
	for (i = 0; i < colors.length; i++) {
		currentColor = onecolor(colors[i]);
		if (currentColor.isColor !== true) {
			colors[i] = exports.randomColor();
		} else {
			colors[i] = currentColor.hex();
		}
	}
	return '' +
		colors[0] + ' ' + (-100 + offset).toFixed(2) + '%' +
		', ' +
		colors[1] + ' ' + (0 + offset).toFixed(2) + '%' +
		', ' +
		colors[2] + ' ' + (100 + offset).toFixed(2) + '%' +
		', ' +
		colors[3] + ' ' + (200 + offset).toFixed(2) + '%' +
		')';
};

exports.getRadialGradient = function (colors, offset, x, y) {
	return 'radial-gradient(circle at ' + (x * 100).toFixed(1) + '% ' +
		(y * 100).toFixed(1) + '%, ' + gradientSuffix(colors, offset);
};

exports.getLinearGradient = function (colors, offset, angle) {
	return 	'linear-gradient(' + (angle % 360).toFixed(1) + 'deg, ' +
		gradientSuffix(colors, offset);
};
