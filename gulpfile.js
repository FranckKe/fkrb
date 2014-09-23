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

function errorLog(err) {
  console.log(err.toString());
  console.log('\007 \007 \007');
  this.emit('end');
}

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/app.scss')
        .pipe(concat('apps.css'))
        .pipe(sass())
        .on('error', errorLog)
        .pipe(autoprefix())
        .pipe(gulp.dest('stylesheets'));
});


// gulp.task('csslibraries', function() {
//     return gulp.src(['stylesheets/*.css','!stylesheets/apps.css'])
//         .pipe(concat('libraries.css'))
//         .pipe(uncss({
//             html: ['index.html', '404.html']
//         }))
//         .pipe(gulp.dest('stylesheets'));     
// });

gulp.task('css', function() {
    return gulp.src(['stylesheets/*.css'])
        .pipe(concat('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});

//TODO minify html

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        'js/jquery-2.1.1.min.js',
        // 'js/jquery-ui-1.10.4.min.js',
        'js/modernizr.min.js',
        'js/foundation.min.js',
        'js/skrollr.min.js',
        'js/wow.min.js',
        'js/app.js'])
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('dist'))
        // .pipe(rename('all.min.js'))
        // .pipe(uglify())
        // .pipe(gulp.dest('dist'));
});


//TODO img/svg/webp compression

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('stylesheets/*.css', ['css']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'css', 'scripts', 'watch']);