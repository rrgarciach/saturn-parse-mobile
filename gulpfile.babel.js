const gulp = require('gulp');
const gutil = require('gulp-util');
const bower = require('bower');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const sh = require('shelljs');
const del = require('del');
const inject = require('gulp-inject');
const babel = require('gulp-babel');
const _ = require('lodash');
const lazypipe = require('lazypipe');
const gulpLoadPlugins = require('gulp-load-plugins');
const replace = require('gulp-replace-task');
const args    = require('yargs').argv;
const fs = require('fs');

const babelify = require('babelify');
const browserify = require('browserify');
const vinylSourceStream = require('vinyl-source-stream');
const vinylBuffer = require('vinyl-buffer');

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

gulp.task('sass', done => {
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

gulp.task('watch', ['default'], () => {
  gulp.watch(_.union(paths.scripts.src), ['default']);
});

gulp.task('sass:watch', ['sass'], () => {
  gulp.watch(_.union(paths.sass), ['sass']);
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

gulp.task('script', ['replace'], () => {
  let sources = browserify({
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

gulp.task('replace', ['clean:dist'], () => {
    // Get the environment from the command line
    const env = args.env || process.env.APP_ENV || 'development';

    // Read the settings from the right file
    const filename = env + '.json';
    const settings = JSON.parse(fs.readFileSync('config/' + filename, 'utf8'));

    // Replace each placeholder with the correct value for the variable.
    gulp.src('config/app.env.js')
        .pipe(replace({
            patterns: [
                {
                    match: 'parseServerUrl',
                    replacement: settings.parseServerUrl
                }
            ]
        }))
        .pipe(gulp.dest('src/'));
});

