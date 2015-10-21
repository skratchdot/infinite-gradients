import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import About from './About';
import Home from './Home';
import NotFound from './NotFound';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Header from './Header';

const App = React.createClass({
	render() {
		return (<div>{this.props.children}</div>);
	}
});

// create and render routes
var routes = (
	<Route component={App}>
		<Route name="Home" component={Home} path="/infinite-gradients" />
		<Route name="About" component={About} path="/infinite-gradients/about" />
		<Route name="NotFound" path="*" component={NotFound} />
	</Route>
);

ReactDOM.render(<Router history={createBrowserHistory()}>{routes}</Router>, document.getElementById('app'));
