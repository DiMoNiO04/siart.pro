const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const typograf = require('gulp-typograf');
const svgsprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');

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
  shape: {
    transform: [
      {
        svgo: {
          js2svg: { indent: 4, pretty: true },
        },
      },
    ],
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
          js2svg: { indent: 4, pretty: true },
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

gulp.task('clean:dev', function (done) {
  if (fs.existsSync('./dev/')) {
    return gulp.src('./dev/', { read: false }).pipe(clean({ force: true }));
  }
  done();
});

gulp.task('html:dev', function () {
  return gulp
    .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(changed('./dev/', { hasChanged: changed.compareContents }))
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
    .pipe(gulp.dest('./dev/'));
});

gulp.task('sass:dev', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(changed('./dev/css/'))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(
      replace(
        /(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        '$1$2$3$4$6$1'
      )
    )
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./dev/css/'));
});

gulp.task('images:dev', function () {
  return gulp
    .src(['./src/img/**/*', '!./src/img/svgicons/**/*'])
    .pipe(changed('./dev/img/'))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./dev/img/'));
});

gulp.task('svgStack:dev', function () {
  return gulp.src('./src/img/svgicons/**/*.svg').pipe(svgsprite(svgStack)).pipe(gulp.dest('./dev/img/svgsprite/'));
});

gulp.task('svgSymbol:dev', function () {
  return gulp.src('./src/img/svgicons/**/*.svg').pipe(svgsprite(svgSymbol)).pipe(gulp.dest('./dev/img/svgsprite/'));
});

gulp.task('files:dev', function () {
  return gulp.src('./src/files/**/*').pipe(changed('./dev/files/')).pipe(gulp.dest('./dev/files/'));
});

gulp.task('js:dev', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./dev/js/'))
    .pipe(babel())
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(gulp.dest('./dev/js/'));
});

gulp.task('server:dev', function () {
  return gulp.src('./dev/').pipe(server(serverOptions));
});

gulp.task('watch:dev', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
  gulp.watch(['./src/html/**/*.html', './src/html/**/*.json'], gulp.parallel('html:dev'));
  gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
  gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
  gulp.watch('./src/img/svgicons/*', gulp.series('svgStack:dev', 'svgSymbol:dev'));
});
