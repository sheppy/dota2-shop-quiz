import path from "path";
import gulp from "gulp";
import browserSync from "browser-sync";
import config from "./config";

gulp.task("server", function () {
    browserSync({
        server: {
            baseDir: config.dir.dist
        },
        ui: false,
        files: [
            path.join(config.dir.dist, config.dir.css, config.glob.css),
            path.join(config.dir.dist, config.dir.js, config.glob.js),
            path.join(config.dir.dist, config.glob.html)
        ],
        open: false,
        notify: false
    });

    gulp.watch(path.join(config.dir.src, config.dir.scss, config.glob.scss), ["css"]);
    gulp.watch(path.join(config.dir.src, config.dir.js, config.glob.js), ["js"]);
    gulp.watch([
        path.join(config.dir.src, config.dir.template, config.glob.swig),
        path.join(config.dir.src, config.dir.template, config.glob.html)
    ], ["html"]);
});
