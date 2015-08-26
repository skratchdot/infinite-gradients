/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var Home = require('./Home');
var NotFound = require('./NotFound');

var App = React.createClass({
	render: function () {
		return (<Router.RouteHandler />);
	}
});

// create and render routes
var routes = (
	<Route handler={App}>
		<Route handler={App} path="/infinite-gradients">
			<Route path="/infinite-gradients/?" handler={Home} scrollBehavior="scrollToTop" />
		</Route>
		<Route path="*" handler={NotFound} scrollBehavior="scrollToTop" />
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler />, document.getElementById('app'));
});

// we are using browserify. setup the browser.
exports.React = window.React = React;
