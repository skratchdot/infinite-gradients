/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var Header = require('./Header');
var readmeHtml = require('../../lib/readme').getReadme();

module.exports = React.createClass({
	render: function () {
		return (
			<div id="page-about">
				<Header />
				<div className="well" dangerouslySetInnerHTML={{__html: readmeHtml}}>
				</div>
			</div>
		);
	}
});
