var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uncss = require('gulp-uncss');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

function errorLog(err) {
  console.log(err.toString());
  console.log('\007 \007 \007');
  this.emit('end');
}

gulp.task('lint', function() {
    return gulp.src('js/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    return gulp.src('scss/app.scss')
        .pipe(rename('apps.css'))
        .pipe(sass())
        .on('error', errorLog)
        .pipe(autoprefix())
        .pipe(minifycss())
        .pipe(rename('apps.min.css'))
        .pipe(gulp.dest('stylesheets'));
});

// gulp.task('css-min', function() {
//     return gulp.src(['stylesheets/apps.css'])
//         .pipe(rename('apps.min.css'))
//         .pipe(minifycss())
//         .pipe(gulp.dest('stylesheets'));
// });

gulp.task('css-combining', function() {
    return gulp.src(['stylesheets/*.css'])
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts-foundation', function() {
    return gulp.src([
        'js/foundation/foundation.js',
        'js/foundation/foundation.abide.js',
        'js/foundation/foundation.magellan.js',
        'js/foundation/foundation.tooltip.js'])
        .pipe(concat('foundation.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
});

gulp.task('scripts-min', function() {
    return gulp.src([
        'js/app.js'])
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
});

gulp.task('scripts-combining', function() {
    return gulp.src([
        'js/modernizr.min.js',
        'js/foundation.min.js',
        'js/skrollr.min.js',
        'js/wow.min.js',
        'js/slick.min.js',
        'js/app.min.js',
        ])
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts-foundation', 'scripts-min', 'scripts-combining']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('stylesheets/*.css', ['css-combining']);
});

gulp.task('default', ['lint', 'sass', 'css-combining', 'scripts-foundation', 'scripts-min', 'scripts-combining', 'watch']);