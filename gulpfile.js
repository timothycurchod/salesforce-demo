var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var karma = require('karma').server;
var jsdoc = require('gulp-jsdoc3');
var todo = require('gulp-todo');

var paths = {
  sass: ['./scss/**/*.scss']
};

var testFiles = {
  testFiles: ['./test/**/*.js']
};

gulp.task('default', ['sass']);

/** JSDoc task */
gulp.task('docs', function (cb) {
    var config = require('./conf.json');
    gulp.src(['./www/js/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});

/** generate a todo.md from your javascript files */
gulp.task('todo', function() {
    gulp.src('./www/js/**/*.js')
        .pipe(todo())
        .pipe(gulp.dest('./'));
        // -> Will output a TODO.md with your todos 
});

/** Test task, run test once and exit.
Trying '/karma.conf.js' as well as '/tests/my.conf.js', */
gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(testFiles.testFiles, ['test']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
