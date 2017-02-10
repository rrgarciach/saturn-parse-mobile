import del from 'del';
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
import inject from 'gulp-inject';
import babel from 'gulp-babel';
import _ from 'lodash';
import lazypipe from 'lazypipe';
import gulpLoadPlugins from 'gulp-load-plugins';

let plugins = gulpLoadPlugins();

const srcPath = './src';
const distPath = './www/js';
const paths = {
  sass: ['./scss/**/*.scss'],
  css: ['./www/assets/css/*.min.css'],
  scripts: {
    src: [`${srcPath}/**/*.js`, `!${srcPath}/**/*.spec.js`],
    dist: [`${distPath}/**/*.js`]
  },
  test: {
    unit: [`${srcPath}/**/*.spec.js`],
  }
};

gulp.task('install', ['git-check'], () => {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', done => {
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

gulp.task('default', ['injector']);

gulp.task('injector', ['script'], () => {
  return gulp.src('./www/index.html')
    .pipe(inject(gulp.src(paths.scripts.dist, {read: false}), {relative: true}))
    .pipe(gulp.dest('./www'))
});

gulp.task('sass', ['babel'], done => {
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

gulp.task('babel', ['clean:dist'], () => {
  return gulp.src(_.union(paths.scripts.src))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('clean:dist', () => del([`${distPath}/**/*`]));

gulp.task('watch', () => {
  gulp.watch(_.union(paths.scripts.src, paths.css), ['default']);
});

let jasmine = lazypipe()
  .pipe(plugins.jasmine, {
    reporter: new require('jasmine-reporters').JUnitXmlReporter(),
    timeout: 5000,
    verbose: true,
    errorOnFail: false
  });

gulp.task('test', ['babel'], () => {
  return gulp.src(paths.test.unit)
    .pipe(jasmine());
});

gulp.task('test:watch', () => {
  return gulp.watch([`${srcPath}/**/**.js`], ['test']);
});


var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

gulp.task('script', ['clean:dist'], () => {
  var sources = browserify({
    entries: 'src/app.module.js',
    // debug: true
  })
    .transform(babelify.configure());

  return sources.bundle()
    .pipe(vinylSourceStream('app.min.js'))
    .pipe(vinylBuffer())
    // Do stuff to the output file
    .pipe(gulp.dest('www/js/'))
});
