import gulp from "gulp";

gulp.task("build", ["html", "css", "js"]);

gulp.task("dev", ["html", "css", "server"]);

gulp.task("default", ["build"]);
