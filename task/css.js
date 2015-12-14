import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import cssAutoprefixer from "autoprefixer";
import cssNested from "postcss-nested";
import cssPartialImport from "postcss-partial-import";
import cssSimpleVars from "postcss-simple-vars";
import cssScss from "postcss-scss";
import cssComments from "postcss-discard-comments";
import cssReporter from "postcss-reporter";
import styleLint from "stylelint";
import styleLintConfig from "../stylelint.config";
import colorGuard from "colorguard";
import config from "./config";

const plugins = gulpLoadPlugins();

gulp.task("css", ["lint-css"], function () {
    let cssProcessors = [
        cssPartialImport({
            extension: "scss"
        }),
        cssNested(),
        cssComments(),
        cssSimpleVars(),
        cssAutoprefixer({ browsers: ["last 1 version"] }),
        cssReporter({
            clearMessages: true
        })
    ];

    return gulp
        .src([
            path.join(config.dir.src, config.dir.scss, config.glob.scss),
            "!" + path.join(config.dir.src, config.dir.scss, config.glob.scssPartial)
        ])
        .pipe(plugins.plumber())
        .pipe(plugins.postcss(cssProcessors, { syntax: cssScss }))
        .pipe(plugins.rename({
            extname: ".css"
        }))
        .pipe(gulp.dest(path.join(config.dir.dist, config.dir.css)));
});


gulp.task("lint-css", function () {
    return gulp.src(path.join(config.dir.src, config.dir.scss, config.glob.scss))
        .pipe(plugins.postcss([
            styleLint(styleLintConfig),
            cssPartialImport({
                extension: "scss"
            }),
            colorGuard(),
            cssReporter({
                clearMessages: true
            })
        ], { syntax: cssScss }))
});
