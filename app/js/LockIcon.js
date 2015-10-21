/*
 * SVG Image Locations
 * 
 * open:   http://uxrepo.com/download.php?img=static/icon-sets/mfg-labs/svg/lock-open-alt.svg&color=000000
 * closed: http://uxrepo.com/download.php?img=static/icon-sets/mfg-labs/svg/lock-alt.svg&color=000000
 * 
 * compression done here: https://jakearchibald.github.io/svgomg/
 * 
 */
import React from 'react';

module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			fill: null,
			height: 32,
			width: 32,
			locked: false
		};
	},
	render: function () {
		var fill = this.props.fill;
		if (typeof fill !== 'string') {
			fill = this.props.locked ? '#c80000' : '#666';
		}
		var open = (
			<svg height={this.props.height} width={this.props.width} viewBox="0 0 689.5 1000" xmlns="http://www.w3.org/2000/svg">
				<path fill={fill} fill-rule="evenodd" d="M0 880V487q0-14 10-23.6t24.6-9.5h449V305q0-63.4-42-107.8-41.4-42.4-97-42.4t-97.2 42.4q-41.5 44-41.5 108v38H79v-38q0-54.8 20.3-104.5t56.4-88q35.6-38 84.6-59.4T344 31.8t104 21.5 85 59.5q36 38 56 88T609 305v149h46q14.5 0 24.5 9.8t10 23.7v393q0 12.6-8 19T655 913q-10 4.5-34.8 12.3t-66 18.3-98 17.8-111.7 7.4q-154.7 0-310-55.7-16.3-5-25.5-12t-9-21zm187-170.6q0 12 8.2 20.2l85.4 83.5q8.4 9 20.4 9 13.7 0 21-8l175-171q9-8.7 9-20.6t-9-20.7q-8.2-8.4-20.4-8.4t-20.6 8L301 752l-63.7-63q-8.8-8.6-21-8.6t-21 8.7q-8.3 9-8.3 21z" />
			</svg>
		);
		var closed = (
			<svg height={this.props.height} width={this.props.width} viewBox="0 0 689.5 1000" xmlns="http://www.w3.org/2000/svg">
				<path fill={fill} fill-rule="evenodd" d="M0 880V487q0-14 10-23.6t24.6-9.5h45V305q0-54.6 20.2-104.3t56.4-88q35.6-38 84.6-59.4t103.7-21.5 104 21.5 85 59.5q36 38 56 88t20 104.3v149H655q14.5 0 24.5 10t10 24v393q0 12.8-8 19T655 913q-10 4.5-34.8 12.3t-66 18.3-98 17.8-111.7 7.4q-154.7 0-310-55.7-16.3-5-25.5-12t-9-21zm206-426h277.6V305q0-63.4-42-107.8-41.4-42.4-97-42.4t-97.2 42.4q-41.5 44-41.5 108V454zm28 334q0 11.2 8.3 19.5 8.8 8.8 19.6 8.8 11 0 19-8.8l63-62.4 63 63q7.2 9 19 9 10.5 0 19.3-9 8.3-8 8.3-19.3t-8-19.2l-63-63 63-62.4q8.4-8.2 8.4-19.7t-8.2-20-19.4-8T407 604l-63 63-63-63q-8-8.2-19.2-8.2t-20 8.2-8.3 19.8 8 19.8l63 62.5-63 63q-8 8.8-8 20z"/>
			</svg>
		);
		return this.props.locked ? closed : open;
	}
});
