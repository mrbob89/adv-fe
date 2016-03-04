var baseDir = 'client_src';
var destDir = 'client_build';

var gulp = require('gulp');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

gulp.task('default', ['libs', 'build']);
gulp.task('build', ['copy-static', 'css']);

gulp.task('bower', function () {
    return bower();
});

gulp.task('less', function () {
  return gulp.src(baseDir + '/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(destDir + '/static'));
});

gulp.task('css', function () {
    return gulp.src(baseDir + '/less/**/*.less')
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(gulpif(argv.prod, cssnano()))
        .pipe(gulp.dest(destDir + '/static'));
});

gulp.task('clean', function (cb) {
    return gulp.src('client_build/*', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('copy-static', function () {
    return gulp.src([
        baseDir + '/**',
            '!' + baseDir + '/libs{,/**}',
            '!' + baseDir + '/less{,/**}',
            '!' + baseDir + '/node_modules{,/**}',
        ])
        .pipe(gulp.dest(destDir));
});

gulp.task('libs', function () {
    return gulp.src(baseDir + '/libs/**/*.min.js')
        .pipe(gulp.dest(destDir + '/libs'));
});

gulp.task( 'watch', function () {
    gulp.watch(baseDir + '*.html', [ 'copy-static' ] );
    gulp.watch(baseDir + '**/*.@(png|jpg|js)', [ 'copy-static' ] );
    gulp.watch(baseDir + '/less/**/*.*', [ 'css' ] );
    gulp.watch(baseDir + '**/*.@(html|js|less)', [ 'default' ] );
});