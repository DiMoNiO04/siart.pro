const gulp = require('gulp');
const replace = require('gulp-replace');
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const webpHTML = require('gulp-webp-retina-html');
const typograf = require('gulp-typograf');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webImagesCSS = require('gulp-web-images-css');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const rename = require('gulp-rename');
const svgsprite = require('gulp-svg-sprite');

const fileIncludeSetting = {
  prefix: '@@',
  basepath: '@file',
};

const svgStack = {
  mode: {
    stack: {
      example: true,
    },
  },
};

const svgSymbol = {
  mode: {
    symbol: {
      sprite: '../sprite.symbol.svg',
    },
  },
  shape: {
    transform: [
      {
        svgo: {
          plugins: [
            {
              name: 'removeAttrs',
              params: {
                attrs: '(fill|stroke)',
              },
            },
          ],
        },
      },
    ],
  },
};

const serverOptions = {
  livereload: true,
  open: true,
};

gulp.task('clean:build', function (done) {
  if (fs.existsSync('./build/')) {
    return gulp.src('./build/', { read: false }).pipe(clean({ force: true }));
  }
  done();
});

gulp.task('html:build', function () {
  return gulp
    .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(changed('./build/'))
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(
      replace(
        /(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        '$1./$4$5$7$1'
      )
    )
    .pipe(
      typograf({
        locale: ['ru', 'en-US'],
        htmlEntity: { type: 'digit' },
        safeTags: [
          ['<\\?php', '\\?>'],
          ['<no-typography>', '</no-typography>'],
        ],
      })
    )
    .pipe(
      webpHTML({
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        retina: {
          1: '',
          2: '@2x',
        },
      })
    )
    .pipe(htmlclean())
    .pipe(gulp.dest('./build/'));
});

gulp.task('sass:build', function () {
  return (
    gulp
      .src('./src/scss/*.scss')
      .pipe(changed('./build/css/'))
      .pipe(sourceMaps.init())
      .pipe(autoprefixer())
      .pipe(sassGlob())
      // .pipe(groupMedia())
      .pipe(sass())
      .pipe(
        webImagesCSS({
          mode: 'webp',
        })
      )
      .pipe(
        replace(
          /(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
          '$1$2$3$4$6$1'
        )
      )
      .pipe(csso())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('./build/css/'))
  );
});

gulp.task('images:build', function () {
  return gulp
    .src(['./src/img/**/*', '!./src/img/svgicons/**/*'])
    .pipe(changed('./build/img/'))
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 85, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest('./build/img/'))
    .pipe(gulp.src('./src/img/**/*.{jpg,jpeg,png}'))
    .pipe(imagemin([imageminWebp({ quality: 85 })]))
    .pipe(rename({ extname: '.webp' }))
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('svgStack:build', function () {
  return gulp.src('./src/img/svgicons/**/*.svg').pipe(svgsprite(svgStack)).pipe(gulp.dest('./build/img/svgsprite/'));
});

gulp.task('svgSymbol:build', function () {
  return gulp.src('./src/img/svgicons/**/*.svg').pipe(svgsprite(svgSymbol)).pipe(gulp.dest('./build/img/svgsprite/'));
});

gulp.task('files:build', function () {
  return gulp.src('./src/files/**/*').pipe(changed('./build/files/')).pipe(gulp.dest('./build/files/'));
});

gulp.task('js:build', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./build/js/'))
    .pipe(babel())
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('server:build', function () {
  return gulp.src('./build/').pipe(server(serverOptions));
});
