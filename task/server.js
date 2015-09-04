var gulp = require("gulp");
var config = require("./config");
var plugins = require("gulp-load-plugins")();

gulp.task("server", function () {
    plugins.connect.server({
        root: config.dir.dist
    });
});
