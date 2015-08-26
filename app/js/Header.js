/** @jsx React.DOM */
"use strict";
var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
	render: function () {
		return (
			<header>
				<h1>
					<Router.Link to="/infinite-gradients" params={{}}>Infinite Gradients</Router.Link>
					&nbsp;
					<small><a href="http://skratchdot.com/">by skratchdot</a></small>
				</h1>
			</header>
		);
	}
});
