import React from 'react';
import Header from './Header';
import { Router, Link } from 'react-router';

module.exports = React.createClass({
	render: function () {
		return (
			<div id="page-not-found">
				<Header />
				<div className="well">
					<h1>404 - Page Not Found</h1>
					<p>
						<h4>Sorry, we couldn't find the page you were looking for.</h4>
						<h5>
							Try going to the
							&nbsp;
							<Link to="/infinite-gradients">Homepage</Link>
							&nbsp;
							instead.
						</h5>
					</p>
				</div>
			</div>
		);
	}
});
