import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import config from "./config";

const plugins = gulpLoadPlugins();

gulp.task("css", function () {
    return gulp
        .src(path.join(config.dir.src, config.dir.scss, config.glob.scss))
        .pipe(plugins.plumber())
        .pipe(plugins.sass().on("error", plugins.sass.logError))
        .pipe(gulp.dest(path.join(config.dir.dist, config.dir.css)));
});
