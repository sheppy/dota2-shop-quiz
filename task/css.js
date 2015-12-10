import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import autoprefixer from "autoprefixer";
import cssNested from "postcss-nested";
import cssPartialImport from "postcss-partial-import";
import cssSimpleVars from "postcss-simple-vars";
import config from "./config";

const plugins = gulpLoadPlugins();

gulp.task("css", function () {
    let processors = [
        cssPartialImport({
            extension: "scss"
        }),
        cssNested(),
        cssSimpleVars(),
        autoprefixer({ browsers: ["last 1 version"] })
    ];

    return gulp
        .src([
            path.join(config.dir.src, config.dir.scss, config.glob.scss),
            "!" + path.join(config.dir.src, config.dir.scss, config.glob.scssPartial)
        ])
        .pipe(plugins.plumber())
        .pipe(plugins.postcss(processors))
        .pipe(plugins.rename({
            extname: ".css"
        }))
        .pipe(gulp.dest(path.join(config.dir.dist, config.dir.css)));
});
