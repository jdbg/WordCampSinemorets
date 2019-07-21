// Include modules
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass');
	cleanCSS = require ('gulp-clean-css');
	sourcemaps = require('gulp-sourcemaps');
	autoprefixer = require('gulp-autoprefixer');

// Configure BrowserSync
gulp.task('browser-sync', function() {
	var files = [
		'./style.css',
		'./*.php',
		'./**/*.php',
		'./**/*.js'
	];
	
	// Initiaze BrowserSync with Web server
	browserSync.init(files, {
		proxy: "https://2019-sinemorets.retreat.wordcamp.org"
	});
});

// Configure Sass task
gulp.task('sass', function() {
	return gulp.src('./assets/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({
			'outputStyle': 'compressed'
		}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./assets/css'))
		.pipe(browserSync.stream());
});

// Create the default watch task using 'gulp'

gulp.task('default', ['sass', 'browser-sync'], function() {
	gulp.watch("./assets/scss/**/*.scss", ['sass']);
})
