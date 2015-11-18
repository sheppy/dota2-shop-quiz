var babelify = require("babelify");
var wallabify = require("wallabify");

var wallabyPostprocessor = wallabify({
    debug: true,
    extensions: [".js", ".jsx"]
}, function (b) {
    return b.transform(babelify, { presets: ["es2015", "react"] });
});

module.exports = function (wallaby) {
    return {
        debug: true,

        files: [
            { pattern: "node_modules/babel/node_modules/babel-core/browser-polyfill.js", instrument: false },
            { pattern: "src/js/**/*.js*", load: false },

            { "pattern": "test/helpers/*.js", "instrument": false }
        ],

        tests: [
            { pattern: "test/**/*Spec.js", load: false }
        ],

        postprocessor: wallabyPostprocessor,
        testFramework: "mocha",

        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    }
};
