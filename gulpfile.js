var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

gulp.task("server", function () {
    plugins.connect.server({
        root: "dist"
    });
});

gulp.task("html", function () {
    gulp.src("src/swig/page/**/*.swig")
        .pipe(plugins.swig())
        .pipe(gulp.dest("dist"))
});

gulp.task("build", ["html"]);

gulp.task("default", ["build", "server"]);
