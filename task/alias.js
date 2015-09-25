var gulp = require("gulp");

gulp.task("build", ["html", "css", "vendor", "js"]);

gulp.task("default", ["build", "server"]);
