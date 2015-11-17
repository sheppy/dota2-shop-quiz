import gulp from "gulp";

gulp.task("build", ["html", "css", "vendor", "js"]);

gulp.task("default", ["build", "server"]);
