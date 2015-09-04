var path = require("path");
var gulp = require("gulp");
var config = require("./config");
var plugins = require("gulp-load-plugins")();

gulp.task("html", function () {
    return gulp.src(path.join(config.dir.src, config.dir.page, config.glob.swig))
        .pipe(plugins.swig())
        .pipe(gulp.dest(config.dir.dist));
});
