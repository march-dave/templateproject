'use strict';

let annotate = require('gulp-ng-annotate');
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let del = require('del');
let eslint = require('gulp-eslint');
let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let plumber = require('gulp-plumber');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify');

// gulp.task  - define a task
// gulp.src   - (source) input files
// gulp.dest  - output files
// gulp.watch - watch files/directories for changes
// *.pipe     - chain actions together

/////// GENERAL TASKS /////////

gulp.task('default', ['build', 'watch', 'serve']);

gulp.task('build', ['js', 'css']);

gulp.task('watch', ['watch.js', 'watch.css']);

gulp.task('serve', () => {
  nodemon({
    ignore: ['client', 'public', 'Gulpfile.js']
  });
});

/////// JAVASCRIPT /////////

gulp.task('js', () => {
  return gulp.src('./client/js/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(annotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch.js', () => {
  return gulp.watch('./client/js/**/*.js', ['js'])
});

let lintingGlobs = [
  './**/*.js',
  '!bundle.js',
  '!Gulpfile.js',
  '!./node_modules/**',
  '!./public/bower_components/**'
];

gulp.task('lint', () => {
  return gulp.src(lintingGlobs)
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('watch.lint', () => {
  return gulp.watch(lintingGlobs, ['lint'])
});

//////////// CSS //////////////

gulp.task('css', ['clean.css'], () => {
  return gulp.src(['./client/scss/**/*.scss',
                   './client/scss/**/*.sass'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch.css', () => {
  return gulp.watch('./client/scss/**', ['css'])
});

gulp.task('clean.css', () => {
  return del('./public/css');
});
