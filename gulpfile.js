var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

gulp.task("server", function() {
    plugins.connect.server({
        root: "dist"
    });
});

gulp.task("default", ["server"]);
