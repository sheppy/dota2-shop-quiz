var path = require("path");
var gulp = require("gulp");
var config = require("./config");
var plugins = require("gulp-load-plugins")();

gulp.task("html", function () {
    gulp.src(path.join(config.dir.page, config.glob.swig))
        .pipe(plugins.swig())
        .pipe(gulp.dest(config.dir.dist));
});
