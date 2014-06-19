var gulp = require('gulp'),
    shell = require('gulp-shell'),
    jade = require('gulp-jade');

var emojis = require('../shared/sprite/sprite.json');

var build = "./build/";

gulp.task('popup', function() {
  gulp.src('../shared/popup.jade')
    .pipe(jade({
      locals: {
        emojis: emojis,
        browser: "Firefox"
      }
    }))
    .pipe(gulp.dest(build + "data/"));
});

gulp.task('js', function() {
  gulp.src("./vendor.js").pipe(gulp.dest(build + "data/src/"));
  gulp.src("./main.js").pipe(gulp.dest(build + "lib/"));
  gulp.src("./helper.js").pipe(gulp.dest(build + "data/"));
});

gulp.task('shared', function() {
  gulp.src([
    "../shared/**/*",
    "!../shared/popup.jade"
  ]).pipe(gulp.dest(build + "data/"));
  gulp.src("../package.json").pipe(gulp.dest(build));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('../shared/popup.jade', ['build']);
  gulp.watch('../shared/src/*.js', ['build']);
  gulp.watch('../shared/style/*.css', ['build']);
  gulp.watch('./*.js', ['build']);
});

gulp.task('release', shell.task([
  'mkdir -p ../release/latest/firefox',
  'cd build && cfx xpi --output-file="../../release/latest/firefox/emoji-helper.xpi"'
]));

gulp.task('build', ['popup', 'shared', 'js']);

gulp.task('default', ['build', 'watch']);
