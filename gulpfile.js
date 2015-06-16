var gulp = require('gulp');
var tscompile = require('gulp-typescript');
var rename = require('gulp-rename');
var typescript = require('typescript');

var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var del = require('del');

var path = {
	ROOT: "./",
	HTML: "./src/index.html",
	TS_SRC: "./src/**/*.ts",
	BUILD: "./build/",
	DIST: "./public/",
	DIST_SRC: "./public/src/",	
	ENTRY: "./build/app.js",
	MINIFIED: "build.min.js",
	OUT: "build.js"
};

// Convert TS Files
gulp.task('compile:ts', function() {
	return gulp.src(path.TS_SRC)
	  .pipe(tscompile({
		  typescript: typescript,
		  noImplicitAny: false,
		  outDir: path.BUILD,
		  target: 'ES5',
		  module: 'commonjs',
		  removeComments: true,
		  //noEmitOnError: true
	  }))
	  .pipe(gulp.dest(path.BUILD));
});

// Copy over and replace script src in index.html
gulp.task('compile:html', function() {
	gulp.src(path.HTML)
	.pipe(gulp.dest(path.DIST))
	.pipe(htmlreplace({
		'buildjs': './src/' + path.MINIFIED,
		'vendorjs': './src/vendor.min.js'
	}))
	.pipe(gulp.dest(path.DIST));
});

// Watch
gulp.task('watch', function() {
	function callback() {
		gulp.watch(path.HTML, ['compile:html']);
		gulp.watch(path.TS_SRC, ['compile:ts']);
		
		var watcher = watchify(browserify({
			entries: [path.ENTRY],
			debug: true,
			cache: {}, packageCache: {}, fullPaths: true
		}));
		return watcher.on('update', function() {
			watcher.bundle()
			.pipe(source(path.OUT))
			.pipe(gulp.dest(path.DIST_SRC));
		})
		.bundle()
		.pipe(source(path.OUT))
		.pipe(gulp.dest(path.DIST_SRC));
	};
	return callback();
});

// Create public folder
gulp.task('public', function(){
	browserify({
		entries: [path.ENTRY],	
	})
	.bundle()
	.pipe(source(path.MINIFIED))
	.pipe(streamify(uglify({file:path.MINIFIED})))
	.pipe(gulp.dest(path.DIST_SRC));
});

// Create build folder
gulp.task('build', ['compile:ts','compile:html']);

gulp.task('build:dev', ['build'], function() {
	browserify({
		entries: [path.ENTRY],
	})
	.bundle()
	.pipe(source(path.OUT))
	.pipe(gulp.dest(path.DIST_SRC));
});

gulp.task('watch:dev', ['build'], function() {
	gulp.run('watch'); // <-- until v4.0 replaces gulp.run with something else
});
gulp.task('dist', ['build'], function() {
	gulp.run('public'); // <-- until v4.0 replaces gulp.run with something else
});
gulp.task('clean', function() {
	del([path.BUILD, path.DIST]);
});
gulp.task('default', function() {return 'options for gulp are: build:dev, watch:dev, dist, and clean';});