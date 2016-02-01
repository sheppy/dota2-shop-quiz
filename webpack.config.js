const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");


const TARGET = process.env.npm_lifecycle_event || "start";
process.env.BABEL_ENV = TARGET;


const PATHS = {
    app: path.join(__dirname, "src", "js"),
    build: path.join(__dirname, "dist", "js/")
};

const common = {
    entry: {
        index: [PATHS.app],
        vendor: [
            "lodash",
            "react",
            "react-dom",
            "immutable",
            "redux",
            "react-redux",
            "classnames",
            "axios"
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    output: {
        path: PATHS.build,
        publicPath: "/js/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                include: PATHS.app,
                loaders: ["babel-loader?cacheDirectory"]
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin("vendor", "[name].js"),
        new webpack.DefinePlugin({
            __PRODUCTION__: JSON.stringify(TARGET === "build")
        })
    ]
};

const devServer = {
    contentBase: PATHS.build,

    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    // Display only errors to reduce the amount of output.
    stats: "errors-only",
    colors: true,

    // Parse host and port from env so this is easy to customize.
    host: process.env.HOST,
    port: process.env.PORT
};

// Default configuration
if (TARGET === "start" || !TARGET) {
    console.info("Webpack Export: DEV MODE!");
    common.entry["index"].unshift("webpack-hot-middleware/client");

    module.exports = merge(common, {
        devtool: "eval-source-map",
        devServer: devServer,
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
    });
}

if (TARGET === "build") {
    console.info("Webpack Export: BUILD MODE!");
    module.exports = merge(common, {
        production: true,
        debug: false
    });
}
