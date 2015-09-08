var gulp = require("gulp");

gulp.task("build", ["html", "css", "js"]);

gulp.task("default", ["build", "server"]);
