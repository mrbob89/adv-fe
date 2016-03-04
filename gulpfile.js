var destDir = 'client_build';
var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function () {
    return bower();
});

gulp.task('copy-static', function () {
    return gulp.src(['client_src/**/*.*', '!libs/**', '!node_modules/**'])
        .pipe(gulp.dest(destDir));
});


gulp.task('default', ['libs', 'build']);