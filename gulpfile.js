"use strict";
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var connect = require('gulp-connect');
var cssmin = require('gulp-cssmin');
var exec = require('child_process').exec;
var fs = require('fs');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jsxhint = require('jsxhint');
var less = require('gulp-less');
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
	return gulp.src([devDir + '/*', prodDir + '/*'], {read: false})
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
			'./app/favicon.ico'
		])
		.pipe(gulp.dest(devDir))
		.pipe(gulp.dest(prodDir));
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
gulp.task('build', ['styles', 'scripts', 'fonts', 'images', 'copy', 'lint']);
gulp.task('default', ['build', 'server', 'watch']);

// handle errors
process.on('uncaughtException', function (e) {
	console.error(e);
});
