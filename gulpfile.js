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
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({browsers: ["last 2 versions"]});


gulp.task('default', ['libs', 'build']);
gulp.task('build', ['copy-static', 'css', 'js']);

gulp.task('serve', function () {
    browserSync.init({
        server: destDir
    });

    browserSync.watch(destDir + '**/*.*').on('change', browserSync.reload);
});

gulp.task('bower', function () {
    return bower();
});

gulp.task('minify', function() {
  return gulp.src(baseDir + '/*.html')
    .pipe(gulpif(argv.prod, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(destDir))
});

gulp.task('less', function () {
  return gulp.src(baseDir + '/less/**/*.less')
    .pipe(less({plugins: [autoprefix]}))
    .pipe(gulp.dest(destDir + '/static'));
});

gulp.task('js', function () {
  return gulp.src(baseDir + '/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destDir + '/js'));
});

gulp.task('css', function () {
    return gulp.src(baseDir + '/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(gulpif(argv.prod, cssnano()))
        .pipe(sourcemaps.write('.'))
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
            '!' + baseDir + '/js{,/**}',
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