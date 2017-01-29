const jshint = require('gulp-jshint');
const gulp   = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const _ = require('lodash');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

const webpackConf = require('./webpack.config');

gulp.task('js', ['app'], () => {
  var config = _.assign({}, webpackConf);
  
  config.output.filename = 'bundle.prod.js';
  config.devtool = null;
  
  config.plugins = _.get(config, 'plugins', []).concat([
    new ngAnnotatePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      compress: {
        warnings: false
      }
    })
  ]);
  
  return gulp
      .src('src/client/app/entry.js')
      .pipe(webpackStream(config))
      .pipe(gulp.dest('dist/public/app/'))
});

gulp.task('app', () => {
  return gulp
    .src('src/client/app/*.js')
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('html', () => {
  return gulp.src('./src/client/**/*.html')
    .pipe(gulp.dest('dist/public'));
});

gulp.task('server', () => {
  return gulp.src('./src/server/**/*.*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', () => {
  return gulp.src('./src/client/fonts/*.*')
    .pipe(gulp.dest('dist/public/fonts'));
});

gulp.task('scss', () => {
  return gulp.src('src/client/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
      browsers: ['last 2 versions', 'safari 9', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/public/css'));
});

gulp.task('default', ['scss', 'fonts', 'js', 'html', 'server']);