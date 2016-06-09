import gulp from 'gulp';

const day = '20160413', mincss = 'app.css', minjs = 'app.js';

import sass from 'gulp-sass';
import connect from 'gulp-connect';
import minifycss from 'gulp-minify-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import autoprefixer from 'gulp-autoprefixer';
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import spritesmith from 'gulp.spritesmith';
import zip from 'gulp-zip';
import header       from 'gulp-header';
import pkg          from './package.json';


const banner = [
  '/*! ',
    '<%= pkg.name %> ',
    'v<%= pkg.version %> | ',
    `(c) ${new Date()} <%= pkg.author %> |`,
    ' <%= pkg.homepage %>',
  ' */',
  '\n'
].join('');

//编译Sass，Autoprefix及缩小化
gulp.task('sass', () => gulp.src(`./${day}/src/scss/main.scss`)
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(`./${day}/.tmp/css`))
    .pipe(rename(mincss))
    .pipe(minifycss())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(`./${day}/build/css/`))
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'Styles  task complete' })));


gulp.task('images', () => {
	return gulp.src(`./${day}/src/images/*`)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(`./${day}/build/images`));
});

gulp.task('scripts',() => gulp.src(`./${day}/src/js/*.js`)
    .pipe(concat(minjs))
    .pipe(gulp.dest(`./${day}/.tmp/js`))
    .pipe(uglify())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(`./${day}/build/js/`))
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'Scripts task complete' })));


gulp.task('onescss', () => gulp.src(`./${day}/images/edm/emd.scss`)
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename('emd.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(`./${day}/images/edm/`))
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'onescss  task complete' })));

gulp.task('home', () => gulp.src('./home/scss/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./home/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./home/css/'))
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'home style  task complete' })));

gulp.task('html',() => {
    gulp.src(`./${day}/*.html`)
        .pipe(reload({stream: true}))
});

gulp.task('homeHtml',() => {
    gulp.src('./*.html')
        .pipe(reload({stream: true}))
});


gulp.task('sprite', () => {
  const spriteData = gulp.src(`./${day}/src/images/icon/*.png`).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest(`./${day}/build/css/`));
});

//zip
gulp.task('zip', () => gulp.src([`./${day}/main.min.css`,`./${day}/host.html`])
    .pipe(zip(`special${day}.zip`))
    .pipe(gulp.dest(`${day}`))
    .pipe(notify({ message: 'zip task complete' })));



// 静态服务器 + 监听 scss/html 文件
gulp.task('dev', ['sass'], () => {

    browserSync.init({
        server: `./${day}/`
    });

    // 看守.scss 档
    gulp.watch(`./${day}/src/scss/*.scss`, ['sass']);
    gulp.watch('./home/scss/*.scss', ['home']);
    // 看守所有.js档
    gulp.watch(`./${day}/*.js`, ['scripts']);
    gulp.watch(`./${day}/src/js/*.js`, ['html','scripts']);
    gulp.watch(`./${day}/src/images/*`, ['images']);

    // 看守所有.html
    gulp.watch(`./${day}/*.html`).on('change', reload);;
    gulp.watch('./*.html').on('change', reload);;

});


/* 监听 文件变化  */

gulp.task('watch', () => {

    // 看守.scss 档
    gulp.watch([`./${day}/src/scss/*.scss`,`./${day}/src/scss/index/*.scss`], ['sass']);
    gulp.watch('./home/scss/*.scss', ['home']);
    // 看守所有.js档
    gulp.watch(`./${day}/*.js`, ['scripts']);
    gulp.watch(`./${day}/src/js/*.js`, ['html','scripts']);

    // 看守所有.html
    gulp.watch(`./${day}/*.html`,['html','zip']);
    gulp.watch('./*.html',['homeHtml']);

});

gulp.task('serve',['connect','watch']);

gulp.task('default', ['dev']);
