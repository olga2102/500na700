import gulp from 'gulp';
import pug from 'gulp-pug';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import gulpSass from 'gulp-sass';
import ttf2woff2 from 'gulp-ttftowoff2';
import ttf2woff from 'gulp-ttf2woff';
import ttf2svg from 'gulp-ttf-svg';
import ttf2eot from 'gulp-ttf2eot';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import bs from 'browser-sync';
import gulpIf from 'gulp-if';
import { deleteAsync } from 'del';
import * as dartSass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import { libs, paths, generalPath } from './config.js';
import webpack from 'webpack-stream';
import path from 'path';

const browserSync = bs.create();
const sass = gulpSass(dartSass);

// Live reload

function startWatchServer(cb) {
  browserSync.init({
    server: { baseDir: generalPath.bundle },
    notify: false,
  });
  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

// Cleans

function cleanDist(cb) {
  return deleteAsync(generalPath.bundle);
  cb();
}

// HTML

function html(cb) {
  return gulp.src(paths.pug.input).pipe(pug()).pipe(gulp.dest(paths.pug.output));
  cb();
}

// CSS

function css(cb) {
  return gulp
    .src(paths.css.input)
    .pipe(gulpIf(process.env.NODE_ENV === 'production', sourcemaps.init()))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', cleanCSS({ compatibility: 'ie8' })))
    .pipe(rename(paths.css.name))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', sourcemaps.write()))
    .pipe(gulp.dest(paths.css.output));
  cb();
}

// JS

function js(cb) {
  return gulp
    .src('./')
    .pipe(gulpIf(process.env.NODE_ENV === 'production', sourcemaps.init()))
    .pipe(
      webpack({
        mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
        entry: {
          main: paths.js.input,
        },
        output: {
          filename: paths.js.name.basename + paths.js.name.extname,
          path: path.resolve(path.dirname(''), paths.js.output),
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
            {
              test: /\.css$/,
              use: [
                "style-loader",
                {
                  loader: "css-loader",
                },
              ],
            },
          ],
        },
      })
    )
    .pipe(gulpIf(process.env.NODE_ENV === 'production', sourcemaps.write()))
    .pipe(gulp.dest(paths.js.output));
  cb();
}

// Fonts

function ttfToEot(cb) {
  return gulp.src(paths.font.input).pipe(ttf2eot()).pipe(gulp.dest(paths.font.output));
  cb();
}

function ttfToSvg(cb) {
  return gulp.src(paths.font.input).pipe(ttf2svg()).pipe(gulp.dest(paths.font.output));
  cb();
}

function ttfToWoff(cb) {
  return gulp.src(paths.font.input).pipe(ttf2woff()).pipe(gulp.dest(paths.font.output));
  cb();
}

function ttfToWoff2(cb) {
  return gulp.src(paths.font.input).pipe(ttf2woff2()).pipe(gulp.dest(paths.font.output));
  cb();
}

function ttf(cb) {
  return gulp.src(paths.font.input).pipe(gulp.dest(paths.font.output));
  cb();
}

function image(cb) {
  return gulp
    .src(paths.img.input)
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 75, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: true,
            },
            {
              name: 'cleanupIDs',
              active: false,
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest(paths.img.output));
  cb();
}

function video(cb) {
  return gulp.src(paths.mov.input).pipe(gulp.dest(paths.mov.output));
  cb();
}

function doc(cb) {
  return gulp.src(paths.doc.input).pipe(gulp.dest(paths.doc.output));
  cb();
}

function libsCss(cb) {
  return gulp
    .src(libs.css.paths)
    .pipe(gulpIf(process.env.NODE_ENV === 'production', sourcemaps.init()))
    .pipe(concat(libs.css.name.basename + libs.css.name.extname))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', cleanCSS({ compatibility: 'ie8' })))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', sourcemaps.write()))
    .pipe(gulp.dest(libs.css.output));
  cb();
}

function libsJs(cb) {
  return gulp
    .src(libs.js.paths)
    .pipe(gulpIf(process.env.NODE_ENV === 'production', sourcemaps.init()))
    .pipe(uglify())
    .pipe(rename(libs.js.name))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', sourcemaps.write()))
    .pipe(gulp.dest(libs.js.output));
  cb();
}

function startWatchFiles() {
  gulp.watch(paths.pug.watch, gulp.series(html, browsersyncReload));
  gulp.watch(paths.js.watch, gulp.series(js, browsersyncReload));
  gulp.watch(paths.css.watch, gulp.series(css, browsersyncReload));
  gulp.watch(paths.font.watch, gulp.series(ttf2eot, ttf2svg, ttf2woff, ttf2woff2, ttf, browsersyncReload));
  gulp.watch(paths.img.watch, gulp.series(image, browsersyncReload));
  gulp.watch(paths.mov.watch, gulp.series(video, browsersyncReload));
  gulp.watch(paths.doc.watch, gulp.series(doc, browsersyncReload));
  // gulp.watch(libs.css.watch, gulp.series(libsCss, browsersyncReload));
  // gulp.watch(libs.js.watch, gulp.series(libsJs, browsersyncReload));
}

export const clean = gulp.series(cleanDist);

export const build = gulp.series(
  cleanDist,
  html,
  js,
  css,
  ttfToEot,
  ttfToSvg,
  ttfToWoff,
  ttfToWoff2,
  ttf,
  image,
  video,
  doc,
  // libsJs,
  // libsCss
);
export const dev = gulp.series(cleanDist, build, startWatchServer, startWatchFiles);
