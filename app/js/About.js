import React from 'react';
import Header from './Header';
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
