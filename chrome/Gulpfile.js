var gulp = require('gulp'),
    zip = require('gulp-zip'),
    jade = require('gulp-jade');

var emojis = require('../shared/data/sprite.json');

var build = "./build/";

gulp.task('popup', function() {
  gulp.src('../shared/popup.jade')
    .pipe(jade({
      locals: {
        emojis: emojis,
        browser: "Chrome"
      }
    }))
    .pipe(gulp.dest(build));
});

gulp.task('manifest', function() {
  gulp.src("./manifest.json").pipe(gulp.dest(build));
});

gulp.task('vendor', function() {
  gulp.src("./vendor.js").pipe(gulp.dest(build + "src/"));
});

gulp.task('emoji', function () {
    return gulp.src([
      '../shared/img/emoji/clock9.png',
      '../shared/img/emoji/smiley.png',
      '../shared/img/emoji/cherry_blossom.png',
      '../shared/img/emoji/bell.png',
      '../shared/img/emoji/oncoming_automobile.png',
      '../shared/img/emoji/symbols.png',
      '../shared/img/emoji/hatched_chick.png',
      '../shared/img/emoji/snake.png',
      '../shared/img/emoji/heart.png'
    ]).pipe(gulp.dest(build + 'img/emoji/'));
});

gulp.task('shared', function() {
  gulp.src([
    "../shared/**/*",
    "!../shared/popup.jade",
    "!../shared/img/emoji/*"
  ]).pipe(gulp.dest(build));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('../shared/popup.jade', ['build']);
  gulp.watch('../shared/src/*.js', ['build']);
  gulp.watch('../shared/style/*.css', ['build']);
  gulp.watch('./vendor.js', ['build']);
});

gulp.task('release', function () {
  gulp.src([build + '**/*'])
      .pipe(zip('emoji-helper.zip'))
      .pipe(gulp.dest("../release/latest/chrome/"));
});

gulp.task('build', ['shared', 'manifest', 'vendor', 'popup', 'emoji']);

gulp.task('default', ['build', 'watch']);
