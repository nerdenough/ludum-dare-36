'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';

const files = [
  './src/objects/*.js',
  './src/entities/*.js',
  './src/hud/*.js',
  './src/states/*.js',
  './src/game.js'
];

gulp.task('build', ['lint'], () => {
  return gulp
    .src(files)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('game.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('lint', () => {
  return gulp
    .src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch(files, ['build']);
});

gulp.task('default', ['build', 'watch']);
