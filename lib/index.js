
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
