/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var Header = require('./Header');
var Router = require('react-router');

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<Header />
				<div id="page-not-found" className="well">
					<h1>404 - Page Not Found</h1>
					<p>
						<h4>Sorry, we couldn't find the page you were looking for.</h4>
						<h5>
							Try going to the
							&nbsp;
							<Router.Link to="Home">Homepage</Router.Link>
							&nbsp;
							instead.
						</h5>
					</p>
				</div>
			</div>
		);
	}
});
