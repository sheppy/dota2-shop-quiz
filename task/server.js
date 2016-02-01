import path from "path";
import gulp from "gulp";
import browserSync from "browser-sync";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import config from "./config";
import webpackConfig from"../webpack.config";


gulp.task("server", () => {
    let webpackCompiler = webpack(webpackConfig);

    browserSync({
        ui: false,
        open: false,
        notify: false,
        server: {
            baseDir: config.dir.dist,
            middleware: [
                webpackDevMiddleware(webpackCompiler, {
                    publicPath: webpackConfig.output.publicPath,
                    stats: { colors: true },
                    noInfo: true
                }),
                webpackHotMiddleware(webpackCompiler, {
                    log: console.log,
                    path: "/__webpack_hmr",
                    heartbeat: 10000
                })
            ]
        },
        files: [
            path.join(config.dir.dist, config.dir.css, config.glob.css),
            path.join(config.dir.dist, config.glob.html)
        ]
    });

    gulp.watch(path.join(config.dir.src, config.dir.scss, config.glob.scss), ["css"]);
    gulp.watch(path.join(config.dir.src, "html", config.glob.html), ["html"]);
});
