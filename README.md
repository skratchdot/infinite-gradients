# Infinite Gradients

An HTML experiment built on [React](https://facebook.github.io/react/)
for generating randomly created CSS3 gradients (both linear and radial).

[Infinite Gradients](https://github.com/skratchdot/infinite-gradients)
comes in 2 forms (a [website](http://projects.skratchdot.com/infinite-gradients/)
and a [command line utility](#command-line-utility)).


### Website

The [website](http://projects.skratchdot.com/infinite-gradients/) is built
on [React](http://facebook.github.io/react/), and allows you to pause and start an
infinite stream of gradients.  You can toggle features on and off by clicking on
items in the header.  You can lock features such as:

- **linear gradients**: angle, speed, offset, colors 1-4
- **radial gradients**: position X & Y, speed, offset, colors 1-4

You can toggle the random generation on and off by clicking either the mouse button,
or by hitting your spacebar.

- [View the website](http://projects.skratchdot.com/infinite-gradients/)

#### Website Keyboard Controls

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


### Command Line Utility



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

