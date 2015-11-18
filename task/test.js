import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import config from "./config";

const plugins = gulpLoadPlugins();

gulp.task("test", () => gulp
    .src(path.join(config.dir.test, config.glob.js), { read: false })
    .pipe(plugins.plumber())
    .pipe(plugins.mocha({ reporter: "spec" }))
);
