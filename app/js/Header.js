import React from 'react';
import { Router, Link, History } from 'react-router';
import Control from './Control';

module.exports = React.createClass({
	mixins: [History],
	getDefaultProps: function () {
		return {
			controls: []
		};
	},
	render: function () {
		var $this = this,
			onClick = function () {
				$this.history.pushState(null, '/infinite-gradients/about');
			}, controls = [
				<Control
					key="control-about"
					title="about"
					value="?"
					smallAlign="center"
					onClick={onClick}
				/>
			].concat(this.props.controls);
		return (
			<header>
				<div id="header-title">
					<h1>
						<Link to="/infinite-gradients">Infinite Gradients</Link>
						&nbsp;
						<small><a href="http://skratchdot.com/">by skratchdot</a></small>
					</h1>
				</div>
				<div id="header-controls">
					{controls}
				</div>
				<base href={document.location.protocol + '//' + document.location.host + document.location.pathname} />
			</header>
		);
	}
});
