/** @jsx React.DOM */
"use strict";
var React = require('react');

module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			title: '',
			value: ''
		};
	},
	render: function () {
		return (
			<div className="control">
				<strong>{this.props.value}</strong>
				<small>{this.props.title}</small>
			</div>
		);
	}
});
