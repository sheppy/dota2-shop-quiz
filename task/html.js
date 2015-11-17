import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import config from "./config";

const plugins = gulpLoadPlugins();

gulp.task("html", function () {
    return gulp
        .src(path.join(config.dir.src, config.dir.page, config.glob.swig))
        .pipe(plugins.plumber())
        .pipe(plugins.swig())
        .pipe(gulp.dest(config.dir.dist));
});
