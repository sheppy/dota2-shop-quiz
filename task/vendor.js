import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import bundleCollapser from "bundle-collapser/plugin";
import through2 from "through2";
import browserify from "browserify";
import babelify from "babelify";

import config from "./config";

const plugins = gulpLoadPlugins();

const onError = function (err) {
    console.error(err);
    this.emit("end");
};


gulp.task("vendor", function () {
    var bundler = through2.obj(function (file, enc, next) {
        browserify(file.path, {
            plugin: [bundleCollapser],
            extensions: [".js", ".jsx"],
            bundleExternal: true
        })
            .transform(babelify, { presets: ["es2015", "react"] })
            .bundle(function (err, res) {
                if (err) {
                    return next(err);
                }
                file.contents = res;
                next(null, file);
            });
    });

    return gulp
        .src(path.join(config.dir.src, config.dir.js, "vendor.js"))
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(bundler)
        .pipe(gulp.dest(path.join(config.dir.dist, config.dir.js)));
});
