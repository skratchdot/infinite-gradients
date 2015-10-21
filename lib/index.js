/**
 * infinite-gradients
 * http://skratchdot.com/projects/infinite-gradients
 * 
 * @description A library for generating CSS gradients
 * @module infiniteGradients
 * @author skratchdot
 * @license MIT
 * @copyright Copyright (c) 2015 skratchdot.com
 * @example
 *   var infiniteGradients = require('infinite-gradients');
 */
var onecolor = require('onecolor');
var gradientSuffix;

/**
 * Converts from radians to degrees
 * @param radians the value in radians
 * @returns the value in degrees
 * @example
 * infiniteGradients.toDegrees(Math.PI); // returns: 180
 * infiniteGradients.toDegrees(0); // returns: 0
 */
exports.toDegrees = function (radians) {
	return radians * (180 / Math.PI);
};

/**
 * Get the angle between 2 points with x/y coordinates
 * @param x1 the x coordinate of point 1
 * @param y1 the y coordinate of point 1
 * @param x2 the x coordinate of point 2
 * @param y2 the y coordinate of point 2
 * @returns the angle in degrees
 * @example
 * infiniteGradients.getAngle(0,0,0,1); // returns: 90
 * infiniteGradients.getAngle(0,0,10,10); // returns 45
 */
exports.getAngle = function (x1, y1, x2, y2) {
	var angle = exports.toDegrees(Math.atan2(y2 - y1, x2 - x1));
	if (angle < 0) {
		angle += 360;
	}
	return angle;
};

/**
 * Get the distance between 2 points with x/y coordinates
 * @param x1 the x coordinate of point 1
 * @param y1 the y coordinate of point 1
 * @param x2 the x coordinate of point 2
 * @param y2 the y coordinate of point 2
 * @returns the distance between the 2 points
 * @example
 * infiniteGradients.getDistance(0,0,10,10); // returns: 14.142135623730951
 * infiniteGradients.getDistance(0,0,0,5); // returns: 5
 */
exports.getDistance = function (x1, y1, x2, y2) {
	var distY = Math.abs(y2 - y1);
	var distX = Math.abs(x2 - x1);
	return Math.sqrt((distY * distY) + (distX * distX));
};

/**
 * Convert a decimal to hexidecimal format. pads to at least 2 digits.
 * @param num The number in decimal format
 * @returns the number converted to hexidecimal format
 * @example
 * infiniteGradients.toHex(255); // returns: 'ff'
 * infiniteGradients.toHex(11); // returns: '0b'
 */
exports.toHex = function (num) {
	var hex = num.toString(16);
	if (hex.length === 1) {
		hex = '0' + hex;
	}
	return hex;
};

/**
 * Returns a random float between min (inclusive) and max (exclusive)
 * @param min the minimum number (inclusive)
 * @param max the maximum number (exclusive)
 * @returns a random float between min and max
 * @example
 * infiniteGradients.floatBetween(20,21); // returned: 20.045959329465404
 * infiniteGradients.floatBetween(0,100); // returned: 77.16259211301804
 */
exports.floatBetween = function (min, max) {
	return Math.random() * (max - min) + min;
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param min the minimum number (inclusive)
 * @param max the maximum number (inclusive)
 * @returns a random integer between min and max
 * @example
 * infiniteGradients.intBetween(50,55); // returned: 52
 * infiniteGradients.intBetween(0,100); // returned: 86
 */
exports.intBetween = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Return a random RGB color in hex format
 * @returns a random RGB color in hex string format
 * @example
 * infiniteGradients.randomColor(); // returned: '#97b0ee'
 * infiniteGradients.randomColor(); // returned: '#5bb023'
 */
exports.randomColor = function () {
	return '#' +
		exports.toHex(exports.intBetween(0, 255)) +
		exports.toHex(exports.intBetween(0, 255)) +
		exports.toHex(exports.intBetween(0, 255));
};

/**
 * Gets a radial gradient CSS function as a string
 * @param colors
 * @param offset
 * @param x
 * @param y
 * @returns a radial gradient CSS function as a string
 * @example
 *   // returns: 'radial-gradient(circle at 2.1% 33.5%, #ff0000 -75.00%, #286554 25.00%, #0000ff 125.00%, #9619e2 225.00%)'
 * infiniteGradients.getRadialGradient(['red','#286554','blue','#9619e2'], 25, .021, .335);
 */
exports.getRadialGradient = function (colors, offset, x, y) {
	return 'radial-gradient(circle at ' + (x * 100).toFixed(1) + '% ' +
		(y * 100).toFixed(1) + '%, ' + gradientSuffix(colors, offset);
};

/**
 * Gets a linear gradient CSS function as a string
 * @param colors
 * @param offset
 * @param angle
 * @returns a linear gradient CSS function as a string
 * @example
 *   // returns: 'linear-gradient(142.3deg, #ff0000 -75.00%, #286554 25.00%, #0000ff 125.00%, #9619e2 225.00%)'
 * infiniteGradients.getLinearGradient(['red','#286554','blue','#9619e2'], 25, 142.3);
 */
exports.getLinearGradient = function (colors, offset, angle) {
	return 'linear-gradient(' + (parseFloat(angle) % 360).toFixed(1) + 'deg, ' +
		gradientSuffix(colors, offset);
};

// helper function for getRadialGradient() and getLinearGradient()
gradientSuffix = function (colors, offset) {
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
