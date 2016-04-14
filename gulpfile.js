var gulp = require('gulp');

var day = '20160413',
    mincss = 'app.css',
    minjs = 'app.js';

// 引入组件
var sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),    
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    zip = require('gulp-zip');




//编译Sass，Autoprefix及缩小化
gulp.task('sass', function() {
    return gulp.src('./'+ day +'/src/scss/main.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./'+ day +'/tmp/css'))
        .pipe(rename(mincss))
        .pipe(minifycss())
        .pipe(gulp.dest('./'+ day +'/build/css/'))
        .pipe(reload({stream: true}))
        .pipe(notify({ message: 'Styles  task complete' }));
});


gulp.task('images', () => {
	return gulp.src('./'+ day +'/src/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./'+ day +'/build/images'));
});

gulp.task('scripts',function(){
    return gulp.src('./'+ day +'/src/js/*.js')
        .pipe(concat(minjs))
        .pipe(gulp.dest('./'+ day +'/tmp/js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'+ day +'/build/js/'))
        .pipe(reload({stream: true}))
        .pipe(notify({ message: 'Scripts task complete' }));

});


gulp.task('onescss', function() {
    return gulp.src('./'+ day +'/images/edm/emd.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename('emd.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./'+ day +'/images/edm/'))
        .pipe(reload({stream: true}))
        .pipe(notify({ message: 'onescss  task complete' }));

});

gulp.task('home', function() {
    return gulp.src('./home/scss/main.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./home/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./home/css/'))
        .pipe(reload({stream: true}))
        .pipe(notify({ message: 'home style  task complete' }));

});

gulp.task('html',function(){
    gulp.src('./'+ day +'/*.html')
        .pipe(reload({stream: true}))
});

gulp.task('homeHtml',function(){
    gulp.src('./*.html')
        .pipe(reload({stream: true}))
});




//zip
gulp.task('zip', function () {
    return gulp.src(['./'+ day +'/main.min.css','./'+ day +'/host.html'])
        .pipe(zip('special'+ day +'.zip'))
        .pipe(gulp.dest(''+ day +''))
        .pipe(notify({ message: 'zip task complete' }));
});



// 静态服务器 + 监听 scss/html 文件
gulp.task('dev', ['sass'], function() {

    browserSync.init({
        server: './'+day+'/'
    });

    // 看守.scss 档
    gulp.watch('./'+ day +'/src/scss/*.scss', ['sass']);
    gulp.watch('./home/scss/*.scss', ['home']);
    // 看守所有.js档
    gulp.watch('./'+ day +'/*.js', ['scripts']);
    gulp.watch('./'+ day +'/src/js/*.js', ['html','scripts']);
    gulp.watch('./'+ day +'/src/images/*', ['images']);

    // 看守所有.html
    gulp.watch('./'+ day +'/*.html').on('change', reload);;
    gulp.watch('./*.html').on('change', reload);;

});


/* 监听 文件变化  */

gulp.task('watch', function() {

    // 看守.scss 档
    gulp.watch(['./'+ day +'/src/scss/*.scss','./'+ day +'/src/scss/index/*.scss'], ['sass']);
    gulp.watch('./home/scss/*.scss', ['home']);
    // 看守所有.js档
    gulp.watch('./'+ day +'/*.js', ['scripts']);
    gulp.watch('./'+ day +'/src/js/*.js', ['html','scripts']);

    // 看守所有.html
    gulp.watch('./'+ day +'/*.html',['html','zip']);
    gulp.watch('./*.html',['homeHtml']);

});

gulp.task('serve',['connect','watch']);

gulp.task('default', ['dev']);
