/** @jsx React.DOM */
"use strict";
var React = require('react');
var LockIcon = require('./LockIcon');

module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			onClick: function () {},
			title: '',
			value: '',
			fill: null,
			smallAlign: 'right',
			showLock: false,
			locked: false
		};
	},
	render: function () {
		var lock = null;
		if (this.props.showLock) {
			lock = (
				<div className="lock-container">
					<LockIcon width="100%" height="100%" locked={this.props.locked} fill={this.props.fill} />
				</div>
			);
		}
		return (
			<div className="control" onClick={this.props.onClick}>
				<strong>{this.props.value}</strong>
				<small style={{textAlign: this.props.smallAlign}}>{this.props.title}</small>
				{lock}
			</div>
		);
	}
});
