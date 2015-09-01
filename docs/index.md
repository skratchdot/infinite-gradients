# infinite-gradients

infinite-gradients.js
A library for generating CSS gradients



**Example:**
```js
var infiniteGradients = require('infinite-gradients');
```

* * *

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



* * *










