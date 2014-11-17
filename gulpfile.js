var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');

gulp.task('copy', function() {
	return gulp.src('src/*.js', { base: 'src' })
		.pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
	return gulp.src('src/*.js')
		.pipe(uglify('jQuery.jPulse.min.js', {
			outSourceMap: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy', 'uglify'])
