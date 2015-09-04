var gulp = require("gulp");

gulp.task("build", ["html"]);

gulp.task("default", ["build", "server"]);
