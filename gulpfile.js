var gulp = require('gulp'),
	concatCSS = require('gulp-concat-css'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	prefix = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	notify_growl = require('gulp-notify-growl'),
	browserSync = require('browser-sync'),
	googlecdn = require('gulp-google-cdn'),
	notify = require('gulp-notify');

    return gulp.src('index.html')
        .pipe(googlecdn(require('./bower.json')))
        .pipe(gulp.dest('./'));
});

gulp.task('server',function(){
	browserSync({
		port:9000,
		server:{
			baseDir:'./'
		}
	})
})

gulp.task('style', function() {
  gulp.src('css/*.css')
  	.pipe(concatCSS("bundle.css"))
  	.pipe(minifyCSS(""))
  	.pipe(rename("bundle.min.css"))
		.pipe(prefix({
			browsers: ['last 40 versions'],
			cascade: false
		}))
  	.pipe(notify("изменения вступили в силу!!!!"))
  	.pipe(gulp.dest('app/css'))
  	;
})


gulp.task('watch',function(){
	gulp.watch('css/*.css',['style']);
	gulp.watch([
		'*.html',
		'app/js/**/*.js',
		'js/**/*.js',
		'app/css/**/*.css'
		]).on('change',browserSync.reload);
})

gulp.task('default',['watch','server']);