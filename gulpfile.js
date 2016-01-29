var gulp = require('gulp'),
	concatCSS = require('gulp-concat-css'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	prefix = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	notify_growl = require('gulp-notify-growl'),
	browserSync = require('browser-sync'),
	googlecdn = require('gulp-google-cdn'),
	modernizr = require('gulp-modernizr'),
	notify = require('gulp-notify'),
	spritesmith = require('gulp.spritesmith'),
	stylus = require('gulp-stylus');

gulp.task('server',function(){
	browserSync({
		port:9123,
		server:{
			baseDir:'app/'
		}
	})
})

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('app/img/all_icons_4sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }));

    spriteData.img.pipe(gulp.dest('app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/css/')); // путь, куда сохраняем стили
});

gulp.task('modernizr',function(){
	gulp.src('app/js/*.js')
		.pipe(modernizr(
			{
			// Подключение недостаточных опций
				"options":[
					"setClasess",
					"html5shiv"
				],
			// Подключение необходимых тестов
				"tests":["placeholder","cssanimations"],
				// собрать в миницикации
				"ugly":true,
			} 
			))
		.pipe(gulp.dest("app/js/vendor"))
});


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
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
		]).on('change',browserSync.reload);
})
// Работа по запуску -> gulp
gulp.task('default',['modernizr','server','watch']);