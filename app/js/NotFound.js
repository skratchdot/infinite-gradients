/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var Header = require('./Header');

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<Header />
				<div id="page-not-found">
					<h1>404 - Page Not Found</h1>
					<p>
						<h4>Sorry, we couldn't find the page you were looking for.</h4>
						<h5>Try going to the <a href="/infinite-gradients">Homepage</a> instead.</h5>
					</p>
				</div>
			</div>
		);
	}
});
