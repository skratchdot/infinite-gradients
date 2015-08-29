/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var Router = require('react-router');
var Header = require('./Header');
var Control = require('./Control');
var throttle = require('lodash.throttle');
var pathGet = require('object-path-get');
var pathSet = require('object-path-set');
var infiniteGradients = require('../../lib/index');
// functions
var getAngle = infiniteGradients.getAngle;
var getDistance = infiniteGradients.getDistance;
var randomColor = infiniteGradients.randomColor;

module.exports = React.createClass({
	mixins: [Router.Navigation, Router.State],
	getDefaultProps: function () {
		return {
			intervalTime: 20,
			speedCoefficient: 10
		};
	},
	getInitialState: function () {
		var i, colorLen = 4, query, getFloat, getBetween,
			colors, radialMode, speed, offset, angle, posX, posY;

		// helper function
		getFloat = function (val, defaultValue) {
			defaultValue = defaultValue || 0;
			val = parseFloat(val);
			if (Number.isNaN(val)) {
				val = defaultValue;
			}
			return val;
		};
		getBetween = function (val, min, max) {
			val = Math.max(val, min);
			val = Math.min(val, max);
			return val;
		};

		// get items from query string
		query = this.getQuery();
		colors = pathGet(query, 'colors', '41f850,406f85,63ea4c,ce583f');
		radialMode = pathGet(query, 'type', 'linear');
		speed = getFloat(pathGet(query, 'speed', 0.2));
		offset = getFloat(pathGet(query, 'offset', 16.0));
		angle = getFloat(pathGet(query, 'angle', 15));
		posX = getFloat(pathGet(query, 'posX', 0));
		posY = getFloat(pathGet(query, 'posY', 0));

		// correct values
		colors = ('' + colors).split(',').slice(0, 4);
		while (colors.length < colorLen) {
			colors.push(infiniteGradients.randomColor());
		}
		for (i = 0; i < colors.length; i++) {
			colors[i] = '#' + colors[i].toLowerCase().replace(/[^0-9a-f]/gi, '');
		}
		radialMode = radialMode === 'radial' ? true : false;
		speed = getBetween(speed, 0, 1);
		offset = getBetween(offset, 0, 100);
		angle = getBetween(angle, 0, 360);
		posX = getBetween(posX, 0, 1);
		posY = getBetween(posY, 0, 1);

		return {
			colors: colors,
			radialMode: radialMode,
			speed: speed,
			offset: offset,
			angle: angle,
			posX: posX,
			posY: posY,
			lockedColor1: false,
			lockedColor2: false,
			lockedColor3: false,
			lockedColor4: false,
			lockedAngle: false,
			lockedPosX: false,
			lockedPosY: false,
			lockedSpeed: false,
			lockedOffset: false,
			lockedEverything: true
		};
	},
	tick: function () {
		var i, offset,
			colors = [null, null, null, null],
			unlockedColors = [],
			direction = 0, newState = {};
		if (!this.state.lockedEverything) {
			if (!this.state.lockedOffset) {
				offset = this.state.offset + (this.props.speedCoefficient * this.state.speed);
				if (offset < -100) {
					offset = 0;
					direction = -1;
				} else if (offset > 100) {
					offset = 0;
					direction = 1;
				}
				newState.offset = offset;
			}
			if (direction < 0 || direction > 0) {
				// move locked colors
				for (i = 0; i < 4; i++) {
					if (this.state['lockedColor' + (i + 1)] === true) {
						colors[i] = this.state.colors[i];
					} else {
						unlockedColors.push(this.state.colors[i]);
					}
				}
				if (direction < 0) {
					unlockedColors = unlockedColors.slice(1, unlockedColors.length);
					unlockedColors.push(randomColor());
				} else if (direction > 0) {
					unlockedColors = unlockedColors.slice(0, unlockedColors.length - 1);
					unlockedColors.unshift(randomColor());
				}
				// now move in our unlocked colors
				for (i = 0; i < 4; i++) {
					if (typeof colors[i] !== 'string') {
						colors[i] = unlockedColors.shift();
					}
				}
			} else {
				colors = this.state.colors.slice();
			}
			newState.colors = colors;
			this.setState(newState);
		}
	},
	setEventState: function (e) {
		var height, width, originY, originX, distance, distanceNormalized, newState = {};
		height = 'innerHeight' in window ?
			window.innerHeight :
			document.documentElement.offsetHeight;
		width = 'innerWidth' in window ?
			window.innerWidth :
			document.documentElement.offsetWidth;
		originY = height / 2;
		originX = width / 2;
		distance = getDistance(originX, originY, e.clientX, e.clientY);
		distanceNormalized = distance / (Math.sqrt((originY * originY) + (originX * originX)));
		if (!this.state.lockedSpeed) {
			newState.speed = distanceNormalized;
		}
		if (!this.state.lockedAngle) {
			newState.angle = getAngle(originX, originY, e.clientX, e.clientY);
		}
		if (!this.state.lockedPosX) {
			newState.posX = e.clientX / width;
		}
		if (!this.state.lockedPosY) {
			newState.posY = e.clientY / height;
		}
		this.setState(newState);
	},
	handleMouseMove: function (e) {
		if (!this.state.lockedEverything) {
			this.setEventState(e);
		}
	},
	handleClick: function (e) {
		if (!document.querySelector('header').contains(e.target)) {
			this.setEventState(e);
			this.setState({
				lockedEverything: !this.state.lockedEverything
			});
		}
	},
	handleKeydown: function (e) {
		var char = String.fromCharCode(e.keyCode || e.charCode).toUpperCase(),
			charAsInt = parseInt(char);
		if (char === ' ') {
			this.toggleState('lockedEverything');
		} else if (char === 'A') {
			this.toggleState('lockedAngle');
		} else if (char === 'X') {
			this.toggleState('lockedPosX');
		} else if (char === 'Y') {
			this.toggleState('lockedPosY');
		} else if (char === 'O') {
			this.toggleState('lockedOffset');
		} else if (char === 'T') {
			this.toggleState('radialMode');
		} else if (char === 'S') {
			this.toggleState('lockedSpeed');
		} else if (charAsInt >= 0 && charAsInt < 10) {
			this.setState({
				lockedSpeed: true,
				speed: charAsInt / 10
			});
		}
	},
	toggleState: function (key) {
		var newState = {};
		if (this.state.hasOwnProperty(key)) {
			newState[key] = !this.state[key];
			this.setState(newState);
		}
	},
	toggleLockedState: function (key) {
		var $this = this;
		return function (e) {
			var obj = pathSet({}, 'locked' + key, !pathGet($this.state, 'locked' + key));
			$this.setState(obj);
		};
	},
	componentDidMount: function () {
		this.interval = setInterval(this.tick, this.props.intervalTime);
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('click', this.handleClick);
		window.addEventListener('keydown', this.handleKeydown);
	},
	componentWillUnmount: function () {
		clearInterval(this.interval);
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('click', this.handleClick);
		window.removeEventListener('keydown', this.handleKeydown);
	},
	updateUrl: function () {
		this.replaceWith('/infinite-gradients', {}, {
			type: this.state.radialMode ? 'radial' : 'linear',
			speed: this.state.speed.toFixed(3),
			offset: this.state.offset.toFixed(2),
			angle: this.state.angle.toFixed(1),
			posX: this.state.posX.toFixed(3),
			posY: this.state.posY.toFixed(3),
			colors: this.state.colors.join(',').replace('#','')
		});
	},
	componentDidUpdate: function () {
		// update url
		if (typeof this.updateUrlThrottled !== 'function') {
			this.updateUrlThrottled = throttle(this.updateUrl, 500);
		}
		this.updateUrlThrottled();
	},
	render: function () {
		var $this = this, controls = [], getColorValue, getControl, keyNum = 0;
		getColorValue = function (num, color) {
			return (
				<div>
					{num}:
					&nbsp;&nbsp;
					<span style={{
						background: color,
						border: '1px solid black',
						fontSize: '0.8em'
					}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				</div>
			);
		};
		getControl = function (title, value, showLock, locked, clickToggleName, smallAlign) {
			var onClick = function () {}, fill = null;
			if (typeof clickToggleName === 'string') {
				onClick = $this.toggleLockedState(clickToggleName);
			} else if (typeof clickToggleName === 'function') {
				onClick = clickToggleName;
			}
			if ($this.state.lockedEverything && locked === false) {
				fill = '#000';
			}
			return (
				<Control
					key={'controlKey-' + keyNum++}
					title={title}
					value={value}
					showLock={showLock}
					locked={locked}
					fill={fill}
					smallAlign={smallAlign}
					onClick={onClick}
				/>
			);
		};
		controls.push(getControl('about', '?', false, false, null, 'center'));
		controls.push(getControl('type', this.state.radialMode ? 'Radial' : 'Linear', false, false, function () {$this.toggleState('radialMode');}, 'right'));
		controls.push(getControl('speed', (this.state.speed * 10).toFixed(2), true, this.state.lockedSpeed, 'Speed', 'right'));
		controls.push(getControl('offset', this.state.offset.toFixed(2), true, this.state.lockedOffset, 'Offset', 'right'));
		controls.push(getControl('y', (this.state.posY * 100).toFixed(1) + '%', true, this.state.lockedPosY, 'PosY', 'right'));
		controls.push(getControl('x', (this.state.posX * 100).toFixed(1) + '%', true, this.state.lockedPosX, 'PosX', 'right'));
		controls.push(getControl('angle', this.state.angle.toFixed(1) + String.fromCharCode(176), true, this.state.lockedAngle, 'Angle', 'right'));
		controls.push(getControl(this.state.colors[3], getColorValue(4, this.state.colors[3]), true, this.state.lockedColor4, 'Color4', 'right'));
		controls.push(getControl(this.state.colors[2], getColorValue(3, this.state.colors[2]), true, this.state.lockedColor3, 'Color3', 'right'));
		controls.push(getControl(this.state.colors[1], getColorValue(2, this.state.colors[1]), true, this.state.lockedColor2, 'Color2', 'right'));
		controls.push(getControl(this.state.colors[0], getColorValue(1, this.state.colors[0]), true, this.state.lockedColor1, 'Color1', 'right'));
		controls.push(getControl('status', this.state.lockedEverything ? <div style={{color:'#c80000'}}>Off</div> : 'On', true, this.state.lockedEverything, 'Everything', 'right'));

		document.body.style.backgroundImage = '' +
			(
				this.state.radialMode ?
				'radial-gradient(circle at ' + (this.state.posX * 100) + '% ' + (this.state.posY * 100) + '%,' :
				'linear-gradient(' + ((this.state.angle + 90) % 360) + 'deg, '
			) +
			this.state.colors[0] + ' ' + (-100 + this.state.offset) + '%' +
			', ' +
			this.state.colors[1] + ' ' + (0 + this.state.offset) + '%' +
			', ' +
			this.state.colors[2] + ' ' + (100 + this.state.offset) + '%' +
			', ' +
			this.state.colors[3] + ' ' + (200 + this.state.offset) + '%' +
			')';
		return (
			<div>
				<Header controls={controls} />
				<div
					style={{
						transform: 'translateX(-50%) ' +
							'translateY(-50%) rotate(' + this.state.angle + 'deg)',
						display: this.state.radialMode ? 'none' : 'block'
					}}
					id="arrow">&rarr;</div>
			</div>
		);
	}
});
