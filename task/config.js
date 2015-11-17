const config = {
    glob: {
        html: "**/*.html",
        swig: "**/*.swig",
        css: "**/*.css",
        scss: "**/*.scss",
        js: "**/*.js"
    },
    dir: {
        src: "src",
        dist: "dist",
        js: "js",
        css: "css",
        scss: "scss",
        page: "template/page",
        template: "template"
    },
    file: {
        vendorJs: "vendor.js"
    },

    libs: [
        "lodash",
        "swig"
    ]
};

export default config;
