var gulp = require("gulp")
var babel = require("gulp-babel")

gulp.task('babel', function () {
    return gulp.src("./index.es15.js")
        .pipe(babel())
        .pipe(gulp.dest('./index.js'));
});
