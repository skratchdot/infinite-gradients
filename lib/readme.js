/* autogenerated by gulpfile.js */
exports.getReadme = function () {
  return "<h1 id=\"infinite-gradients\">Infinite Gradients</h1>\n<p>An HTML experiment built on <a href=\"https://facebook.github.io/react/\">React</a>\nfor generating randomly created CSS3 gradients (both linear and radial).</p>\n<p><a href=\"https://github.com/skratchdot/infinite-gradients\">Infinite Gradients</a>\ncomes in 3 forms (\na <a href=\"http://projects.skratchdot.com/infinite-gradients/\">website</a>,\na <a href=\"#command-line-utility\">command line utility</a>,\nand a <a href=\"#node-js-library\">node.js library</a>\n).</p>\n<h2 id=\"website\">Website</h2>\n<p>The <a href=\"http://projects.skratchdot.com/infinite-gradients/\">website</a> is built\non <a href=\"http://facebook.github.io/react/\">React</a>, and allows you to pause and start an\ninfinite stream of gradients.  You can toggle features on and off by clicking on\nitems in the header.  You can lock features such as:</p>\n<ul>\n<li><strong>linear gradients</strong>: angle, speed, offset, colors 1-4</li>\n<li><strong>radial gradients</strong>: position X &amp; Y, speed, offset, colors 1-4</li>\n</ul>\n<p>You can toggle the random generation on and off by clicking either the mouse button,\nor by hitting your spacebar.</p>\n<ul>\n<li><a href=\"http://projects.skratchdot.com/infinite-gradients/\">View the website</a></li>\n</ul>\n<h3 id=\"website-keyboard-controls\">Website Keyboard Controls</h3>\n<table>\n<thead>\n<tr>\n<th style=\"text-align:center\">Feature</th>\n<th style=\"text-align:center\">Toggle Key</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align:center\">Status</td>\n<td style=\"text-align:center\">Space Bar</td>\n<td>Pauses all features so you can look at the gradient</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">Type</td>\n<td style=\"text-align:center\">T</td>\n<td>Toggles between &#39;linear&#39; and &#39;radial&#39; gradients</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">Offset</td>\n<td style=\"text-align:center\">O</td>\n<td>Moves the offset of the gradient</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">Speed</td>\n<td style=\"text-align:center\">S or 0-9</td>\n<td>Determines how fast the offset changes</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">Angle</td>\n<td style=\"text-align:center\">A</td>\n<td>Determines the angle (in degrees) of the linear gradient</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">X Position</td>\n<td style=\"text-align:center\">X</td>\n<td>Determines the x-origin of the radial gradient</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">Y Position</td>\n<td style=\"text-align:center\">Y</td>\n<td>Determines the y-origin of the radial gradient</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">Color 1</td>\n<td style=\"text-align:center\">V</td>\n<td>Locks/Unlocks Color 1 from being randomly generated</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">Color 2</td>\n<td style=\"text-align:center\">B</td>\n<td>Locks/Unlocks Color 1 from being randomly generated</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">Color 3</td>\n<td style=\"text-align:center\">N</td>\n<td>Locks/Unlocks Color 1 from being randomly generated</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">Color 4</td>\n<td style=\"text-align:center\">M</td>\n<td>Locks/Unlocks Color 1 from being randomly generated</td>\n</tr>\n<tr>\n<td style=\"text-align:center\">Randomize</td>\n<td style=\"text-align:center\">R</td>\n<td>Randomizes the current settings</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"command-line-utility\">Command Line Utility</h2>\n<p>Infinite Gradients is available as a command line tool that outputs random\n(or specific) CSS gradient functions.  You can install it by running:</p>\n<pre><code class=\"lang-bash\">npm install -g infinite-gradients\n</code></pre>\n<p>After installation, you will have a global executable called <code>infinite-gradients</code>.</p>\n<h3 id=\"help\">Help</h3>\n<p>To print help information, run: <code>infinite-gradients --help</code></p>\n<pre><code class=\"lang-bash\">  Usage: infinite-gradients [options]\n\n  Options:\n\n    -h, --help             output usage information\n    -v, --version          output the version number\n    -t, --type &lt;type&gt;      type of gradient: linear or radial\n    -a, --angle &lt;angle&gt;    angle of linear gradient in degrees (0-360)\n    -x, --x &lt;x&gt;            x coordinate of radial gradient center (% between 0-1)\n    -y, --y &lt;y&gt;            y coordinate of radial gradient center (% between 0-1)\n    -o, --offset &lt;offset&gt;  the offset of the gradient (between 0-100)\n    -c, --colors &lt;colors&gt;  a list of 4 css colors\n</code></pre>\n<h3 id=\"example\">Example</h3>\n<p>Generate a random gradient:</p>\n<pre><code class=\"lang-bash\">$ infinite-gradients\nlinear-gradient(303.6deg, #c621e9 -26.73%, #1ab128 73.27%, #3366ae 173.27%, #0eac81 273.27%)\n</code></pre>\n<p>Do it again and it&#39;s different:</p>\n<pre><code class=\"lang-bash\">$ infinite-gradients\nradial-gradient(circle at 52.7% 59.0%, #debe11 -60.07%, #fcf501 39.93%, #ecae8f 139.93%, #23f5d1 239.93%)\n</code></pre>\n<p>Now you can make sure that it&#39;s a linear gradient:</p>\n<pre><code class=\"lang-bash\">$infinite-gradients --type linear\nlinear-gradient(239.2deg, #35cdca -13.53%, #2bc3bf 86.47%, #8146cb 186.47%, #ae06f9 286.47%)\n</code></pre>\n<p>Now you can specify the colors and angle:</p>\n<pre><code class=\"lang-bash\">$ infinite-gradients --type linear --angle 55.4 --colors 123123,ff00ff,9911f5,a36b3f\nlinear-gradient(55.4deg, #123123 -39.68%, #ff00ff 60.32%, #9911f5 160.32%, #a36b3f 260.32%)\n</code></pre>\n<h2 id=\"node-js-library\">Node JS Library</h2>\n<p>You can use the infinite-gradients functions within node by running:</p>\n<pre><code class=\"lang-bash\">npm install --save infinite-gradients\n</code></pre>\n<p>and including the library in your code:</p>\n<pre><code class=\"lang-javascript\">var infiniteGradients = require(&#39;infinite-gradients&#39;);\n</code></pre>\n<p>The Infinite Gradients library contains a few functions for generating\ngradients, and a few helper functions that may or may not be useful to you.</p>\n<p>The <strong>API</strong> is described below:</p>\n<h3 id=\"infinitegradients-todegrees-radians-\">infiniteGradients.toDegrees(radians)</h3>\n<p>Converts from radians to degrees</p>\n<p><strong>Parameters</strong></p>\n<p><strong>radians</strong>: , the value in radians</p>\n<p><strong>Returns</strong>: , the value in degrees</p>\n<p><strong>Example</strong>:</p>\n<pre><code class=\"lang-js\">infiniteGradients.toDegrees(Math.PI); // returns: 180\ninfiniteGradients.toDegrees(0); // returns: 0\n</code></pre>\n<h3 id=\"infinitegradients-getangle-x1-y1-x2-y2-\">infiniteGradients.getAngle(x1, y1, x2, y2)</h3>\n<p>Get the angle between 2 points with x/y coordinates</p>\n<p><strong>Parameters</strong></p>\n<p><strong>x1</strong>: , the x coordinate of point 1</p>\n<p><strong>y1</strong>: , the y coordinate of point 1</p>\n<p><strong>x2</strong>: , the x coordinate of point 2</p>\n<p><strong>y2</strong>: , the y coordinate of point 2</p>\n<p><strong>Returns</strong>: , the angle in degrees</p>\n<p><strong>Example</strong>:</p>\n<pre><code class=\"lang-js\">infiniteGradients.getAngle(0,0,0,1); // returns: 90\ninfiniteGradients.getAngle(0,0,10,10); // returns 45\n</code></pre>\n<h3 id=\"infinitegradients-getdistance-x1-y1-x2-y2-\">infiniteGradients.getDistance(x1, y1, x2, y2)</h3>\n<p>Get the distance between 2 points with x/y coordinates</p>\n<p><strong>Parameters</strong></p>\n<p><strong>x1</strong>: , the x coordinate of point 1</p>\n<p><strong>y1</strong>: , the y coordinate of point 1</p>\n<p><strong>x2</strong>: , the x coordinate of point 2</p>\n<p><strong>y2</strong>: , the y coordinate of point 2</p>\n<p><strong>Returns</strong>: , the distance between the 2 points</p>\n<p><strong>Example</strong>:</p>\n<pre><code class=\"lang-js\">infiniteGradients.getDistance(0,0,10,10); // returns: 14.142135623730951\ninfiniteGradients.getDistance(0,0,0,5); // returns: 5\n</code></pre>\n<h3 id=\"infinitegradients-tohex-num-\">infiniteGradients.toHex(num)</h3>\n<p>Convert a decimal to hexidecimal format. pads to at least 2 digits.</p>\n<p><strong>Parameters</strong></p>\n<p><strong>num</strong>: , The number in decimal format</p>\n<p><strong>Returns</strong>: , the number converted to hexidecimal format</p>\n<p><strong>Example</strong>:</p>\n<pre><code class=\"lang-js\">infiniteGradients.toHex(255); // returns: &#39;ff&#39;\ninfiniteGradients.toHex(11); // returns: &#39;0b&#39;\n</code></pre>\n<h3 id=\"infinitegradients-floatbetween-min-max-\">infiniteGradients.floatBetween(min, max)</h3>\n<p>Returns a random float between min (inclusive) and max (exclusive)</p>\n<p><strong>Parameters</strong></p>\n<p><strong>min</strong>: , the minimum number (inclusive)</p>\n<p><strong>max</strong>: , the maximum number (exclusive)</p>\n<p><strong>Returns</strong>: , a random float between min and max</p>\n<p><strong>Example</strong>:</p>\n<pre><code class=\"lang-js\">infiniteGradients.floatBetween(20,21); // returned: 20.045959329465404\ninfiniteGradients.floatBetween(0,100); // returned: 77.16259211301804\n</code></pre>\n<h3 id=\"infinitegradients-intbetween-min-max-\">infiniteGradients.intBetween(min, max)</h3>\n<p>Returns a random integer between min (inclusive) and max (inclusive)</p>\n<p><strong>Parameters</strong></p>\n<p><strong>min</strong>: , the minimum number (inclusive)</p>\n<p><strong>max</strong>: , the maximum number (inclusive)</p>\n<p><strong>Returns</strong>: , a random integer between min and max</p>\n<p><strong>Example</strong>:</p>\n<pre><code class=\"lang-js\">infiniteGradients.intBetween(50,55); // returned: 52\ninfiniteGradients.intBetween(0,100); // returned: 86\n</code></pre>\n<h3 id=\"infinitegradients-randomcolor-\">infiniteGradients.randomColor()</h3>\n<p>Return a random RGB color in hex format</p>\n<p><strong>Returns</strong>: , a random RGB color in hex string format</p>\n<p><strong>Example</strong>:</p>\n<pre><code class=\"lang-js\">infiniteGradients.randomColor(); // returned: &#39;#97b0ee&#39;\ninfiniteGradients.randomColor(); // returned: &#39;#5bb023&#39;\n</code></pre>\n<h3 id=\"infinitegradients-getradialgradient-colors-offset-x-y-\">infiniteGradients.getRadialGradient(colors, offset, x, y)</h3>\n<p>Gets a radial gradient CSS function as a string</p>\n<p><strong>Parameters</strong></p>\n<p><strong>colors</strong>: , Gets a radial gradient CSS function as a string</p>\n<p><strong>offset</strong>: , Gets a radial gradient CSS function as a string</p>\n<p><strong>x</strong>: , Gets a radial gradient CSS function as a string</p>\n<p><strong>y</strong>: , Gets a radial gradient CSS function as a string</p>\n<p><strong>Returns</strong>: , a radial gradient CSS function as a string</p>\n<p><strong>Example</strong>:</p>\n<pre><code class=\"lang-js\">// returns: &#39;radial-gradient(circle at 2.1% 33.5%, #ff0000 -75.00%, #286554 25.00%, #0000ff 125.00%, #9619e2 225.00%)&#39;\ninfiniteGradients.getRadialGradient([&#39;red&#39;,&#39;#286554&#39;,&#39;blue&#39;,&#39;#9619e2&#39;], 25, .021, .335);\n</code></pre>\n<h3 id=\"infinitegradients-getlineargradient-colors-offset-angle-\">infiniteGradients.getLinearGradient(colors, offset, angle)</h3>\n<p>Gets a linear gradient CSS function as a string</p>\n<p><strong>Parameters</strong></p>\n<p><strong>colors</strong>: , Gets a linear gradient CSS function as a string</p>\n<p><strong>offset</strong>: , Gets a linear gradient CSS function as a string</p>\n<p><strong>angle</strong>: , Gets a linear gradient CSS function as a string</p>\n<p><strong>Returns</strong>: , a linear gradient CSS function as a string</p>\n<p><strong>Example</strong>:</p>\n<pre><code class=\"lang-js\">// returns: &#39;linear-gradient(142.3deg, #ff0000 -75.00%, #286554 25.00%, #0000ff 125.00%, #9619e2 225.00%)&#39;\ninfiniteGradients.getLinearGradient([&#39;red&#39;,&#39;#286554&#39;,&#39;blue&#39;,&#39;#9619e2&#39;], 25, 142.3);\n</code></pre>\n<h2 id=\"source-code\">Source Code</h2>\n<ul>\n<li><a href=\"https://github.com/skratchdot/infinite-gradients\">Source Code on Github</a></li>\n</ul>\n<h2 id=\"for-developers\">For Developers</h2>\n<h3 id=\"clone-the-project\">Clone the Project</h3>\n<pre><code>git clone https://github.com/skratchdot/infinite-gradients.git\ncd infinite-gradients\n</code></pre><h3 id=\"install-the-dependencies\">Install the Dependencies</h3>\n<pre><code>npm install\n</code></pre><h3 id=\"run-the-application-and-watch-for-changes-\">Run the Application (and watch for changes)</h3>\n<pre><code>gulp\n</code></pre><p>Now browse to the app at <a href=\"http://localhost:8080/infinite-gradients\">http://localhost:8080/infinite-gradients</a></p>\n<h2 id=\"license\">License</h2>\n<p>Copyright (c) 2015 <a href=\"http://skratchdot.com/\">skratchdot</a><br>Licensed under the MIT license.</p>\n";
};