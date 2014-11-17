var gulp = require('gulp');
var copy = require('gulp-copy');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');

gulp.task('copy', function() {
	return gulp.src('src/*.js')
		.pipe(copy('dist'));
});

gulp.task('uglify', function() {
	return gulp.src('src/*.js')
		.pipe(uglify('jQuery.jPulse.min.js', {
			outSourceMap: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy', 'uglify'])
