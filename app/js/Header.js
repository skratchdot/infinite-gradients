/** @jsx React.DOM */
"use strict";
var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			controls: []
		};
	},
	render: function () {
		return (
			<header>
				<div id="header-title">
					<h1>
						<Router.Link to="/infinite-gradients" params={{}}>Infinite Gradients</Router.Link>
						&nbsp;
						<small><a href="http://skratchdot.com/">by skratchdot</a></small>
					</h1>
				</div>
				<div id="header-controls">
					{this.props.controls}
				</div>
			</header>
		);
	}
});
