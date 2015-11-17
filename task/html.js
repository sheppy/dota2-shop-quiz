import path from "path";
import gulp from "gulp";
import config from "./config";


gulp.task("html", function () {
    return gulp
        .src(path.join(config.dir.src, "html", config.glob.html))
        .pipe(gulp.dest(config.dir.dist));
});
