/** @jsx React.DOM */
"use strict";
var React = require('react');
var Router = require('react-router');
var Control = require('./Control');

module.exports = React.createClass({
	mixins: [Router.Navigation],
	getDefaultProps: function () {
		return {
			controls: []
		};
	},
	render: function () {
		var $this = this,
			onClick = function () {
				$this.transitionTo('/infinite-gradients/about');
			}, controls = [
				<Control
					key="control-about"
					title="about"
					value="?"
					smallAlign="center"
					onClick={onClick}
				/>
			].concat(this.props.controls);
		return (
			<header>
				<div id="header-title">
					<h1>
						<Router.Link to="Home">Infinite Gradients</Router.Link>
						&nbsp;
						<small><a href="http://skratchdot.com/">by skratchdot</a></small>
					</h1>
				</div>
				<div id="header-controls">
					{controls}
				</div>
				<base href={document.location.protocol + '//' + document.location.host + document.location.pathname} />
			</header>
		);
	}
});
