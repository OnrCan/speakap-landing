const gulp = require('gulp')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const nodemon = require('gulp-nodemon')
const prefix = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const reload = browserSync.reload

gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  })
  gulp.watch('./*.html').on('change', reload)
  gulp.watch('./js/*.js', ['js'])
  gulp.watch('./scss/**/*.scss', ['css'])
})

gulp.task('css', () => {
  return gulp.src('./scss/*.scss')
    .pipe(plumber([{ errorHandler: false }]))
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
});

gulp.task('js', () =>
  gulp.src('./js/main.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
);

gulp.task('default', ['browser-sync', 'css', 'js']);
