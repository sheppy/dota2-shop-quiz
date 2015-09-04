var path = require("path");
var gulp = require("gulp");
var config = require("./config");
var bundleCollapser = require("bundle-collapser/plugin");
var swigify = require("swigify");
var through2 = require("through2");
var browserify = require("browserify");

gulp.task("js", function () {
    var bundler = through2.obj(function (file, enc, next) {
        browserify(file.path, {
            plugin: [bundleCollapser],
            bundleExternal: false   // Don't load external requires
        })
        .transform(swigify())
        .bundle(function (err, res) {
            if (err) {
                throw err;
            }
            file.contents = res;
            next(null, file);
        });
    });

    return gulp.src(path.join(config.dir.src, config.dir.js, "index.js"))
        .pipe(bundler)
        .pipe(gulp.dest(path.join(config.dir.dist, config.dir.js)));
});
