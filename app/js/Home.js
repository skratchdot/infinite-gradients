import React from 'react';
import { Router, History } from 'react-router';
import ReactZeroClipboard from 'react-zeroclipboard';
import Header from './Header';
import Control from './Control';
import throttle from 'lodash.throttle';
import pathGet from 'object-path-get';
import pathSet from 'object-path-set';
import infiniteGradients from '../../lib/index';
require('window.requestanimationframe');
// functions
var getAngle = infiniteGradients.getAngle;
var getDistance = infiniteGradients.getDistance;
var randomColor = infiniteGradients.randomColor;

module.exports = React.createClass({
	mixins: [History],
	getDefaultProps: function () {
		return {
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
		query = this.props.location.search;
		colors = pathGet(query, 'colors', '41f850,406f85,63ea4c,ce583f');
		radialMode = pathGet(query, 'type', 'linear');
		speed = getFloat(pathGet(query, 'speed', 0.2));
		offset = getFloat(pathGet(query, 'offset', 16.0)) % 100;
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
	getRandomState: function () {
		var colors = [];
		for (var i = 0; i < 4; i++) {
			colors.push(infiniteGradients.randomColor());
		}
		return {
			colors: colors,
			radialMode: Math.random() < 0.5,
			speed: infiniteGradients.floatBetween(0, 1),
			offset: infiniteGradients.floatBetween(0, 100),
			angle: infiniteGradients.floatBetween(0, 360),
			posX: infiniteGradients.floatBetween(0, 1),
			posY: infiniteGradients.floatBetween(0, 1)
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
				if (offset <= -100) {
					offset = 0;
					direction = -1;
				} else if (offset >= 100) {
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
		window.requestAnimationFrame(this.tick);
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
		if (!document.querySelector('header').contains(e.target) &&
			!document.querySelector('#css-container .well').contains(e.target) &&
			document.querySelector('#app').contains(e.target)) {
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
		} else if (char === 'V') {
			this.toggleState('lockedColor1');
		} else if (char === 'B') {
			this.toggleState('lockedColor2');
		} else if (char === 'N') {
			this.toggleState('lockedColor3');
		} else if (char === 'M') {
			this.toggleState('lockedColor4');
		} else if (char === 'R') {
			this.setState(this.getRandomState());
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
	getCssBase: function () {
		return  '' + (this.state.radialMode ?
			infiniteGradients.getRadialGradient(this.state.colors.slice(), this.state.offset, this.state.posX, this.state.posY) :
			infiniteGradients.getLinearGradient(this.state.colors.slice(), this.state.offset, this.state.angle + 90));
	},
	getCssText: function () {
		return 'background-image: ' + this.getCssBase() + ';';
	},
	handleCopyToClipboard: function () {
		return [
			'/*',
			' * css generated at: ' + document.location.toString(),
			' */',
			'body {',
			'  ' + this.getCssText(),
			'}',
			''
		].join('\n');
	},
	componentDidMount: function () {
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('mouseup', this.handleClick);
		window.addEventListener('keydown', this.handleKeydown);
		window.requestAnimationFrame(this.tick);
	},
	componentWillUnmount: function () {
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('mouseup', this.handleClick);
		window.removeEventListener('keydown', this.handleKeydown);
	},
	updateUrl: function () {
		if (this.props.history.isActive('/infinite-gradients')) {
			this.history.replaceState(null, '/infinite-gradients', {
				type: this.state.radialMode ? 'radial' : 'linear',
				speed: this.state.speed.toFixed(3),
				offset: this.state.offset.toFixed(2),
				angle: this.state.angle.toFixed(1),
				posX: this.state.posX.toFixed(3),
				posY: this.state.posY.toFixed(3),
				colors: this.state.colors.join(',').replace('#','')
			});
		}
	},
	componentDidUpdate: function () {
		// update url
		if (typeof this.updateUrlThrottled !== 'function') {
			this.updateUrlThrottled = throttle(this.updateUrl, 500);
		}
		this.updateUrlThrottled();
	},
	render: function () {
		var $this = this, controls = [], keyNum = 0,
			getColorValue, getControl;
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

		document.body.style.backgroundImage = this.getCssBase();
		return (
			<div id="page-home">
				<Header controls={controls} />
				<div
					style={{
						transform: 'translateX(-50%) ' +
							'translateY(-50%) rotate(' + this.state.angle + 'deg)',
						display: this.state.radialMode ? 'none' : 'block'
					}}
					id="arrow">&rarr;</div>
				<div style={{
					visibility:(this.state.angle > 200 && this.state.angle < 201 && this.state.speed > 0.9)?'visible':'hidden',
					position: 'absolute',
					top: '50px',
					left: '20px',
					width: 100,
					height: 30
				}}
				>For Gena &hearts;</div>
				<div id="css-container">
					<div className="well">
						<strong>
							{this.getCssText()}
						</strong>
						<br /><br />
						<ReactZeroClipboard getText={this.handleCopyToClipboard}>
							<div className="zeroclip-click-zone">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 700.4">
								  <path d="M439.4 41.7v-29c0-7-5.7-12.7-12.6-12.7H188.3L0 188.3V615c0 7 5.6 12.6 12.6 12.6h414.2c7 0 12.5-5.6 12.5-12.5V42zM72.2 555.4v-342h128.6c7 0 12.6-5.6 12.6-12.6V72.2H367v483.2H72.3z"/>
								  <path d="M501 167.8h-25.2v485.5c0 6-5 11-11 11h-359v25c0 6.2 5 11 11 11H501c6 0 11-4.8 11-11V179c0-6-5-11-11-11z"/>
								</svg>
								&nbsp;&nbsp;&nbsp;
								<small>
									copy CSS
									<span className="to-clipboard">&nbsp;to clipboard by clicking here</span>
								</small>
							</div>
						</ReactZeroClipboard>
					</div>
				</div>
			</div>
		);
	}
});
