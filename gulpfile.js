"use strict";
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var connect = require('gulp-connect');
var cssmin = require('gulp-cssmin');
var exec = require('child_process').exec;
var fs = require('fs');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jsdox = require('jsdox');
var jsxhint = require('jsxhint');
var less = require('gulp-less');
var marked = require('marked');
var reactify = require('reactify');
var rimraf = require('gulp-rimraf');
var size = require('gulp-size');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

var port = 8080;
var devRoot = __dirname + '/build/dev';
var devDir = __dirname + '/build/dev/infinite-gradients';
var prodDir = __dirname + '/build/prod';

var displaySize = function (title) {
	return size({
		title: title || '',
		showFiles: true
	});
};

gulp.task('clean', function () {
	return gulp.src([devDir + '/*', prodDir + '/*', '!' + prodDir + '/.git'], {read: false})
		.pipe(rimraf());
});

gulp.task('lint', function () {
	exec([
			'node',
			'./node_modules/jsxhint/cli.js',
			//'--show-non-errors',
			'--exclude-path',
			'./.jshintignore',
			'--config',
			'./.jshint',
			'./app/js/**/*.js',
			'./lib',
			'./gulpfile.js'
		].join(' '),
	function (err, stdout, stderr) {
		if (stdout) {
			console.log(stdout);
		}
	});
});

gulp.task('styles', function () {
	gulp.src('./app/less/app.less')
		.pipe(less())
		.pipe(gulp.dest(devDir + '/css/'))
		.pipe(displaySize('dev'))
		.pipe(cssmin())
		.pipe(gulp.dest(prodDir + '/css/'))
		.pipe(displaySize('prod'));
});

gulp.task('scripts', function () {
	// set up the browserify instance on a task basis
	var b = browserify({
		entries: './app/js/App.js',
		debug: true,
		// defining transforms here will avoid crashing your stream
		transform: [reactify]
	});
	return b.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest(devDir + '/js/'))
		.pipe(displaySize('dev'))
		// Add transformation tasks to the pipeline here.
		.pipe(uglify())
		.pipe(gulp.dest(prodDir + '/js/'))
		.pipe(displaySize('prod'));
});

gulp.task('fonts', function () {
	gulp.src('./node_modules/bootstrap/dist/fonts/*')
		.pipe(gulp.dest(devDir + '/fonts/'))
		.pipe(gulp.dest(prodDir + '/fonts/'));
	gulp.src('./node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest(devDir + '/fonts/'))
		.pipe(gulp.dest(prodDir + '/fonts/'));
});

gulp.task('images', function () {
	gulp.src([
			'./app/img/**/*.png',
			'./app/img/**/*.jpg',
			'./app/img/**/*.gif'
		])
		.pipe(imagemin())
		.pipe(gulp.dest(devDir + '/img/'))
		.pipe(gulp.dest(prodDir + '/img/'));
});

gulp.task('copy', function () {
	gulp.src([
			'./app/*.html',
			'./app/favicon.ico',
			'./README.md'
		])
		.pipe(gulp.dest(devDir))
		.pipe(gulp.dest(prodDir));
});

gulp.task('readme', function () {
	var contents = fs.readFileSync(__dirname + '/README.md', 'utf-8');
	fs.writeFileSync(
		__dirname + '/lib/readme.js',
		[
			'/* autogenerated by gulpfile.js */',
			'exports.getReadme = function () {',
			'  return ' + JSON.stringify(marked(contents)) + ';',
			'};'
		].join('\n'),
		'utf-8'
	);
});

gulp.task('jsdox', function () {
	jsdox.generateForDir('./lib/index.js', './docs', null, function () {
		var contents = fs.readFileSync(__dirname + '/README.md', 'utf-8');
		var startString = '\n## Node JS Library';
		var indexStart = ((new RegExp(startString)).exec(contents)).index;
		var indexEnd = (/\n## Source Code/.exec(contents)).index;
		var start = contents.slice(0, indexStart + startString.length);
		var end = contents.slice(indexEnd);
		var docs = fs.readFileSync(__dirname + '/docs/index.md', 'utf-8').split('* * *');
		var docHeader = [
			'You can use the infinite-gradients functions within node by running:\n',
			'```bash',
			'npm install --save infinite-gradients',
			'```',
			'\nand including the library in your code:\n',
			'```javascript',
			'var infiniteGradients = require(\'infinite-gradients\');',
			'```',
			'\n\nThe Infinite Gradients library contains a few functions for generating',
			'gradients, and a few helper functions that may or may not be useful to you.',
			'\nThe **API** is described below:\n\n\n'			
		].join('\n');
		var newReadme = [
			start,
			docHeader + docs[1].trim(),
			end
		].join('\n\n');
		fs.writeFileSync(__dirname + '/README.md', newReadme, 'utf-8');
	});
});

gulp.task('watch', function () {
	gulp.watch(['./app/js/**/*.js', './lib/**/*.js'], ['scripts', 'lint']);
	gulp.watch('./app/less/**/*.less', ['styles']);
	gulp.watch('./app/img/**/*', ['images']);
	gulp.watch('./app/*.*', ['copy']);
	gulp.watch(['./README.md', './gulpfile.js'], ['build']);
});

gulp.task('server', function () {
	connect.server({
		livereload: false,
		middleware: function (connect, opts) {
			return [function (req, res, next) {
				if (/\.(js|json|svg|css|png|jpg|gif|ico|eot|ttf|woff|otf)($|\?)/.test(req.url)) {
					return next();
				} else {
					require('fs').createReadStream('./build/dev/infinite-gradients/404.html').pipe(res);
				}
			}];
		},
		//fallback: './app/404.html',
		port: port,
		root: [devRoot]
	});
});

gulp.task('build-clean', ['clean', 'build']);
gulp.task('build', ['readme', 'styles', 'scripts', 'fonts', 'images', 'copy', 'lint']);
gulp.task('default', ['build', 'server', 'watch']);

// handle errors
process.on('uncaughtException', function (e) {
	console.error(e);
});