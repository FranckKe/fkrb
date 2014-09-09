var gulp = require('gulp'); 


var htmlmin = require('gulp-htmlmin');

var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uncss = require('gulp-uncss');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

// var imagemin = require('gulp-imagemin');

var concat = require('gulp-concat');
var rename = require('gulp-rename');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
        // .pipe(uncss({
        //     html: ['index.html']
        // }))
// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(gulp.dest('stylesheets')); 
});


        // .pipe(uncss({
        //     html: ['index.html']
        // }))


gulp.task('css', function() {
    return gulp.src('stylesheets/*.css')
        .pipe(concat('all.css'))
        .pipe(rename('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});

//TODO minify html

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


//TODO img/svg/webp compression

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('css/*.css', ['css']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'css', 'scripts', 'watch']);