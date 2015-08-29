/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var Header = require('./Header');
var readmeHtml = require('../../lib/readme').getReadme();

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<Header />
				<div id="page-about" className="well" dangerouslySetInnerHTML={{__html: readmeHtml}}>
				</div>
			</div>
		);
	}
});
