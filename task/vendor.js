var path = require("path");
var gulp = require("gulp");
var config = require("./config");
var bundleCollapser = require("bundle-collapser/plugin");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");

gulp.task("vendor", function () {
    var b = browserify({
        debug: false,
        plugin: [bundleCollapser]
    });

    config.libs.forEach(function (lib) {
        b.require(lib);
    });

    return b.bundle()
        .pipe(source(config.file.vendorJs))
        .pipe(buffer())
        .pipe(gulp.dest(path.join(config.dir.dist, config.dir.js)));
});
