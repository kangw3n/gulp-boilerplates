var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: './client',
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: true
    }//browserSync
  });

  gulp.watch('dev/sass/*.scss', ['sass']);
  gulp.watch('dev/js/*.js', ['scripts']);
  gulp.watch('client/*.html').on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('dev/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('client/css'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('scripts', ['compress'], function() {
  return gulp.src('dev/dist/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('client/js/'));
});

gulp.task('compress', function() {
  return gulp.src('dev/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dev/dist/'));
});

gulp.task('default', ['serve']);
