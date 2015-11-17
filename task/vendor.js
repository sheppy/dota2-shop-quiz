import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import bundleCollapser from "bundle-collapser/plugin";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import browserify from "browserify";
import config from "./config";

const plugins = gulpLoadPlugins();

gulp.task("vendor", function () {
    var b = browserify({
        debug: false,
        plugin: [bundleCollapser]
    });

    config.libs.forEach(function (lib) {
        b.require(lib);
    });

    return b.bundle()
        .pipe(plugins.plumber())
        .pipe(source(config.file.vendorJs))
        .pipe(buffer())
        .pipe(gulp.dest(path.join(config.dir.dist, config.dir.js)));
});
