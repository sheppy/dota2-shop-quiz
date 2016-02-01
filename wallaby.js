var babel = require("babel-core");

process.env.BABEL_ENV = "test";


module.exports = function (wallaby) {
    var babelCompiler = wallaby.compilers.babel({
        babel: babel,
        sourceMap: true,
        presets: ["es2015", "react"]
    });

    return {
        files: [
            { pattern: "src/js/**/*.js*", load: false }
        ],

        tests: [
            "test/**/*Spec.js"
        ],

        env: {
            type: "node"
        },

        compilers: {
            "**/*.js*": babelCompiler
        }
    };
};
