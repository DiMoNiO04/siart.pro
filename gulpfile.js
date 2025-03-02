const gulp = require('gulp');

require('./gulp/dev.js');
require('./gulp/build.js');
require('./gulp/fontsDev.js');
require('./gulp/fontsBuild.js');

gulp.task(
  'default',
  gulp.series(
    'clean:dev',
    'fontsDev',
    gulp.parallel(
      'html:dev',
      'sass:dev',
      'images:dev',
      gulp.series('svgStack:dev', 'svgSymbol:dev'),
      'files:dev',
      'js:dev'
    ),
    gulp.parallel('server:dev', 'watch:dev')
  )
);

gulp.task(
  'build',
  gulp.series(
    'clean:build',
    'fontsBuild',
    gulp.parallel(
      'html:build',
      'sass:build',
      'images:build',
      gulp.series('svgStack:build', 'svgSymbol:build'),
      'files:build',
      'js:build'
    ),
    gulp.parallel('server:build')
  )
);
