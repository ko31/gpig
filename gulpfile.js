var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var csso = require('gulp-csso');

gulp.task('js', function(){
    return gulp.src(["src/js/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'));
});

gulp.task('css', function(){
    return gulp.src(["src/css/*.css"])
    .pipe(minifyCSS())
    .pipe(csso())
    .pipe(gulp.dest('docs/css'));
});

gulp.task('html', function() {
    return gulp.src('./src/*.html')
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest('docs'));
});

gulp.task('default', ['js', 'css', 'html']);
