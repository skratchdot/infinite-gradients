/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var Header = require('./Header');
var infiniteGradients = require('../../lib/index');
// functions
var getAngle = infiniteGradients.getAngle;
var getDistance = infiniteGradients.getDistance;
var randomColor = infiniteGradients.randomColor;

module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			intervalTime: 20,
			speedCoefficient: 10
		};
	},
	getInitialState: function () {
		return {
			colors: ['#41f850', '#406f85', '#63ea4c', '#ce583f'],
			radialMode: false,
			speed: 0.5,
			offset: 0,
			angle: 270,
			posX: 0.5,
			posY: 0.5,
			stopped: false
		};
	},
	tick: function () {
		var offset, colors;
		if (!this.state.stopped) {
			offset = this.state.offset + (this.props.speedCoefficient * this.state.speed);
			if (offset < -100) {
				colors = this.state.colors.slice(1, 4);
				colors.push(randomColor());
				offset = 0;
			} else if (offset > 100) {
				colors = this.state.colors.slice(0, 3);
				colors.unshift(randomColor());
				offset = 0;
			} else {
				colors = this.state.colors.slice();
			}
			this.setState({
				offset: offset,
				colors: colors
			});
		}
	},
	setEventState: function (e) {
		var height, width, originY, originX, distance, distanceNormalized;
		height = 'innerHeight' in window ?
			window.innerHeight :
			document.documentElement.offsetHeight;
		width = 'innerWidth' in window ?
			window.innerWidth :
			document.documentElement.offsetWidth;
		originY = height / 2;
		originX = width / 2;
		distance = getDistance(originX, originY, e.clientX, e.clientY);
		distanceNormalized = distance / (Math.sqrt((originY*originY) + (originX*originX)));
		this.setState({
			speed: distanceNormalized,
			angle: getAngle(originX, originY, e.clientX, e.clientY),
			posX: e.clientX / width,
			posY: e.clientY / height,
		});
	},
	handleMouseMove: function (e) {
		if (!this.state.stopped) {
			this.setEventState(e);
		}
	},
	handleClick: function (e) {
		this.setEventState(e);
		this.setState({
			stopped: !this.state.stopped
		});
	},
	componentDidMount: function () {
		this.interval = setInterval(this.tick, this.props.intervalTime);
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('click', this.handleClick);
	},
	componentWillUnmount: function () {
		clearInterval(this.interval);
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('click', this.handleClick);
	},
	render: function () {
		document.body.style.background = '' +
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
				<Header />
				<div
					style={{
						transform: 'translateX(-50%) ' +
							'translateY(-50%) rotate(' + this.state.angle + 'deg)'
					}}
					id="arrow">&rarr;</div>
			</div>
		);
	}
});
