# Infinite Gradients

An HTML experiment built on [React](https://facebook.github.io/react/)
for generating randomly created CSS3 gradients (both linear and radial).

[Infinite Gradients](https://github.com/skratchdot/infinite-gradients)
comes in 3 forms (
a [website](http://projects.skratchdot.com/infinite-gradients/),
a [command line utility](#command-line-utility),
and a [node.js library](#node-js-library)
).


## Website

The [website](http://projects.skratchdot.com/infinite-gradients/) is built
on [React](http://facebook.github.io/react/), and allows you to pause and start an
infinite stream of gradients.  You can toggle features on and off by clicking on
items in the header.  You can lock features such as:

- **linear gradients**: angle, speed, offset, colors 1-4
- **radial gradients**: position X & Y, speed, offset, colors 1-4

You can toggle the random generation on and off by clicking either the mouse button,
or by hitting your spacebar.

- [View the website](http://projects.skratchdot.com/infinite-gradients/)

### Website Keyboard Controls

| Feature    | Toggle Key | Description                                              |
|:----------:|:----------:|----------------------------------------------------------|
| Status     | Space Bar  | Pauses all features so you can look at the gradient      |
| Type       | T          | Toggles between 'linear' and 'radial' gradients          |
| Offset     | O          | Moves the offset of the gradient                         |
| Speed      | S or 0-9   | Determines how fast the offset changes                   |
| Angle      | A          | Determines the angle (in degrees) of the linear gradient |
| X Position | X          | Determines the x-origin of the radial gradient           |
| Y Position | Y          | Determines the y-origin of the radial gradient           |
| Color 1    | V          | Locks/Unlocks Color 1 from being randomly generated      |
| Color 2    | B          | Locks/Unlocks Color 1 from being randomly generated      |
| Color 3    | N          | Locks/Unlocks Color 1 from being randomly generated      |
| Color 4    | M          | Locks/Unlocks Color 1 from being randomly generated      |
| Randomize  | R          | Randomizes the current settings


## Command Line Utility

Infinite Gradients is available as a command line tool that outputs random
(or specific) CSS gradient functions.  You can install it by running:

```bash
npm install -g infinite-gradients
```

After installation, you will have a global executable called `infinite-gradients`.

### Help

To print help information, run: `infinite-gradients --help`

```bash
  Usage: infinite-gradients [options]

  Options:

    -h, --help             output usage information
    -v, --version          output the version number
    -t, --type <type>      type of gradient: linear or radial
    -a, --angle <angle>    angle of linear gradient in degrees (0-360)
    -x, --x <x>            x coordinate of radial gradient center (% between 0-1)
    -y, --y <y>            y coordinate of radial gradient center (% between 0-1)
    -o, --offset <offset>  the offset of the gradient (between 0-100)
    -c, --colors <colors>  a list of 4 css colors
```


### Example

Generate a random gradient:
```bash
$ infinite-gradients
linear-gradient(303.6deg, #c621e9 -26.73%, #1ab128 73.27%, #3366ae 173.27%, #0eac81 273.27%)
```

Do it again and it's different:
```bash
$ infinite-gradients
radial-gradient(circle at 52.7% 59.0%, #debe11 -60.07%, #fcf501 39.93%, #ecae8f 139.93%, #23f5d1 239.93%)
```

Now you can make sure that it's a linear gradient:
```bash
$infinite-gradients --type linear
linear-gradient(239.2deg, #35cdca -13.53%, #2bc3bf 86.47%, #8146cb 186.47%, #ae06f9 286.47%)
```

Now you can specify the colors and angle:
```bash
$ infinite-gradients --type linear --angle 55.4 --colors 123123,ff00ff,9911f5,a36b3f
linear-gradient(55.4deg, #123123 -39.68%, #ff00ff 60.32%, #9911f5 160.32%, #a36b3f 260.32%)
```


## Node JS Library

You can use the infinite-gradients functions within node by running:

```bash
npm install --save infinite-gradients
```

and including the library in your code:

```javascript
var infiniteGradients = require('infinite-gradients');
```


The Infinite Gradients library contains a few functions for generating
gradients, and a few helper functions that may or may not be useful to you.

The **API** is described below:


### infinite-gradients.toDegrees(radians) 

Converts from radians to degrees

**Parameters**

**radians**: , the value in radians

**Returns**: , the value in degrees

**Example**:
```js
infiniteGradients.toDegrees(Math.PI); // returns: 180
infiniteGradients.toDegrees(0); // returns: 0
```


### infinite-gradients.getAngle(x1, y1, x2, y2) 

Get the angle between 2 points with x/y coordinates

**Parameters**

**x1**: , the x coordinate of point 1

**y1**: , the y coordinate of point 1

**x2**: , the x coordinate of point 2

**y2**: , the y coordinate of point 2

**Returns**: , the angle in degrees

**Example**:
```js
infiniteGradients.getAngle(0,0,0,1); // returns: 90
infiniteGradients.getAngle(0,0,10,10); // returns 45
```


### infinite-gradients.getDistance(x1, y1, x2, y2) 

Get the distance between 2 points with x/y coordinates

**Parameters**

**x1**: , the x coordinate of point 1

**y1**: , the y coordinate of point 1

**x2**: , the x coordinate of point 2

**y2**: , the y coordinate of point 2

**Returns**: , the distance between the 2 points

**Example**:
```js
infiniteGradients.getDistance(0,0,10,10); // returns: 14.142135623730951
infiniteGradients.getDistance(0,0,0,5); // returns: 5
```


### infinite-gradients.toHex(num) 

Convert a decimal to hexidecimal format. pads to at least 2 digits.

**Parameters**

**num**: , The number in decimal format

**Returns**: , the number converted to hexidecimal format

**Example**:
```js
infiniteGradients.toHex(255); // returns: 'ff'
infiniteGradients.toHex(11); // returns: '0b'
```


### infinite-gradients.floatBetween(min, max) 

Returns a random float between min (inclusive) and max (exclusive)

**Parameters**

**min**: , the minimum number (inclusive)

**max**: , the maximum number (exclusive)

**Returns**: , a random float between min and max

**Example**:
```js
infiniteGradients.floatBetween(20,21); // returned: 20.045959329465404
infiniteGradients.floatBetween(0,100); // returned: 77.16259211301804
```


### infinite-gradients.intBetween(min, max) 

Returns a random integer between min (inclusive) and max (inclusive)

**Parameters**

**min**: , the minimum number (inclusive)

**max**: , the maximum number (inclusive)

**Returns**: , a random integer between min and max

**Example**:
```js
infiniteGradients.intBetween(50,55); // returned: 52
infiniteGradients.intBetween(0,100); // returned: 86
```


### infinite-gradients.randomColor() 

Return a random RGB color in hex format

**Returns**: , a random RGB color in hex string format

**Example**:
```js
infiniteGradients.randomColor(); // returned: '#97b0ee'
infiniteGradients.randomColor(); // returned: '#5bb023'
```


### infinite-gradients.getRadialGradient(colors, offset, x, y) 

Gets a radial gradient CSS function as a string

**Parameters**

**colors**: , Gets a radial gradient CSS function as a string

**offset**: , Gets a radial gradient CSS function as a string

**x**: , Gets a radial gradient CSS function as a string

**y**: , Gets a radial gradient CSS function as a string

**Returns**: , a radial gradient CSS function as a string

**Example**:
```js
// returns: 'radial-gradient(circle at 2.1% 33.5%, #ff0000 -75.00%, #286554 25.00%, #0000ff 125.00%, #9619e2 225.00%)'
infiniteGradients.getRadialGradient(['red','#286554','blue','#9619e2'], 25, .021, .335);
```


### infinite-gradients.getLinearGradient(colors, offset, angle) 

Gets a linear gradient CSS function as a string

**Parameters**

**colors**: , Gets a linear gradient CSS function as a string

**offset**: , Gets a linear gradient CSS function as a string

**angle**: , Gets a linear gradient CSS function as a string

**Returns**: , a linear gradient CSS function as a string

**Example**:
```js
// returns: 'linear-gradient(142.3deg, #ff0000 -75.00%, #286554 25.00%, #0000ff 125.00%, #9619e2 225.00%)'
infiniteGradients.getLinearGradient(['red','#286554','blue','#9619e2'], 25, 142.3);
```


## Source Code

- [Source Code on Github](https://github.com/skratchdot/infinite-gradients)


## For Developers

### Clone the Project

```
git clone https://github.com/skratchdot/infinite-gradients.git
cd infinite-gradients
```

### Install the Dependencies

```
npm install
```

### Run the Application (and watch for changes)

```
gulp
```

Now browse to the app at [http://localhost:8080/infinite-gradients](http://localhost:8080/infinite-gradients)


## License

Copyright (c) 2015 [skratchdot](http://skratchdot.com/)  
Licensed under the MIT license.

