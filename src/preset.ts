export interface Pkgs {
    dev?: string[];
    dep?: string[];
    typings?: { [prop: string]: string[] };
}

export const base_url = "https://raw.githubusercontent.com/Ronmi/react-boilerplate/master/tmpl/";

export const files = [
    "karma.conf.js",
    "coverage.karma.js",
    "tsconfig.json",
    "require.d.ts",
];

export const new_files = [
    ".gitignore",
    "package.json",
    "require.d.ts",
    "webpack.config.js",
    "webpack.minify.js",
    "bs-config.js",
    "public/index.html",
    "src/main.tsx",
    "src/App.tsx",
    "test/AppTest.tsx"
];

export const script_tmpl = {
    "postinstall": "typings install",
    "typings": "typings",
    "webpack": "webpack",
    "webpack:w": "webpack -w",
    "webpack:m": "webpack --config webpack.minify.js",
    "server": "browser-sync start -c bs-config.js",
    "build": "tsc && npm run webpack:m",
    "start": "tsc && webpack && concurrently \"npm run webpack:w\" \"npm run server\"",
    "tsc": "tsc",
    "tsc:w": "tsc -w",
    "test:w": "karma start --browsers PhantomJS",
    "test:f": "karma start --browsers Firefox",
    "test:c": "karma start --browsers Chrome",
    "test:a": "karma start --browsers PhantomJS,Firefox,Chrome",
    "coverage": "rm -fr build ; tsc && mkdir -p coverage && touch coverage/coverage-final.json && karma start coverage.karma.js && remap-istanbul -i coverage/coverage-final.json -t html -o coverage",
    "test": "karma start --single-run --browsers PhantomJS"
};

export const base_pkgs: Pkgs = {
    dev: [
        "typings", "typescript", "webpack", "ts-loader", "react-addons-test-utils",
        "karma", "karma-mocha-reporter", "karma-coverage",
        "karma-remap-istanbul", "remap-istanbul",
        "karma-sourcemap-loader", "karma-webpack",
        "karma-firefox-launcher", "karma-chrome-launcher", "karma-phantomjs-launcher", "phantomjs-prebuilt",
        "karma-mocha", "karma-chai-sinon", "karma-chai-as-promised",
        "mocha", "chai", "sinon", "sinon-chai", "chai-as-promised", "enzyme",
        "istanbul-instrumenter-loader", "source-map-loader",
        "url-loader", "css-loader", "style-loader", "file-loader", "json-loader",
        "babel-loader", "babel-preset-es2015", "babel-core",
        "browser-sync", "concurrently",
        "lodash", "lodash-webpack-plugin", "babel-plugin-lodash",
    ],
    dep: ["babel-polyfill"],
    typings: {
        "-D": ["enzyme"],
        "-DG": [
            "dt~mocha", "dt~chai", "dt~sinon", "dt~sinon-chai",
            "dt~chai-as-promised", "dt~promises-a-plus",
            "file:require.d.ts",
        ],
        "-SG": ["dt~react", "dt~react-dom"]
    }
};

export const additional_pkgs: Pkgs = {
    dep: ["react", "react-dom"],
};
