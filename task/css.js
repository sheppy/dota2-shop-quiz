var path = require("path");
var gulp = require("gulp");
var config = require("./config");
var plugins = require("gulp-load-plugins")();

gulp.task("css", function () {
    return gulp.src(path.join(config.dir.src, config.dir.scss, config.glob.scss))
        .pipe(plugins.sass().on("error", plugins.sass.logError))
        .pipe(gulp.dest(path.join(config.dir.dist, config.dir.css)));
});
