'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
var server = require('gulp-server-livereload');
var gutil = require('gulp-util');
var fs = require('fs');
var sass = require('gulp-sass');




gulp.task('default', ['cssConcat', 'jsUglify', 'watch','webserver', 'sass:watch']);


gulp.task('release', function() {
  var number =gutil.env.number;
  console.log('Number', number);

  if(fs.existsSync('./releases/' + number)){
    return console.error('Number ' + number +'already exists');
  }

  console.log('Making release' + number + ' ');
  gulp.src("./dist/**/*.*")
    .pipe(gulp.dest("./releases/" + number + "/"));
});

//html
gulp.task('htmlConcat', function(){
  gulp.src('./html/**/*.html')
    .pipe(autoprefixer())
    .pipe(concat('index.html'))
    .pipe(gulp.dest(''));

})

gulp.task('sass', function() {
    gulp.src('./sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
  });

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.sass', ['sass']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('watch', function () {
  gulp.watch('./css/**/*.css', ['cssConcat']);
  gulp.watch('./js/**/*.js', ['jsUglify']);
    });

gulp.task('imagemin', function() {
      gulp.src('./img/**/*.*')
        .pipe(imagemin({
          optimizationLevel: 7
        }))
        .pipe(gulp.dest('./dist'));
  });

gulp.task('cssConcat', function() {
  gulp.src('./css/**/*.css')
    .pipe(autoprefixer())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('cssMin', function() {
  gulp.src('./css/**/*.css')
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(concat('all.min.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('jsUglify', function() {
  // place code for your default task here
  gulp.src('./js/**/*.js')
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist'));
});
