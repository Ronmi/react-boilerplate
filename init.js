const fs = require("fs");
const exec = require("child_process").execSync;
const typings = "./node_modules/.bin/typings";
const base_url = "https://raw.githubusercontent.com/Ronmi/react-boilerplate/master/tmpl/";
const is_new = process.env.NEW !== "";
const files = [
  "karma.conf.js",
  "coverage.karma.js",
  "tsconfig.json"
];
const new_files = [
  'package.json',
  'webpack.config.js',
  'webpack.minify.js',
  'index.html',
  'src/main.tsx',
  'src/App.tsx',
  'test/App.spec.tsx'
];
const script_tmpl = {
  "postinstall": "typings install",
  "typings": "typings",
  "tsc": "tsc",
  "tsc:w": "tsc -w",
  "test:w": "karma start --browsers PhantomJS",
  "test:f": "karma start --browsers Firefox",
  "test:c": "karma start --browsers Chrome",
  "test:a": "karma start --browsers PhantomJS,Firefox,Chrome",
  "coverage": "rm -fr build ; tsc && mkdir -p coverage && touch coverage/coverage-final.json && karma start coverage.karma.js && remap-istanbul -i coverage/coverage-final.json -t html -o coverage",
  "test": "karma start --single-run --browsers PhantomJS"
};

function download(f) {
  //exec("wget -O " + f + " " + base_url+f);
  console.log(f);
}

// installation scripts

function create() {
  // create src and test dir
  try {
    fs.mkdirSync("src");
  } catch (e) {
  }
  try {
  fs.mkdirSync("test");
  } catch (e) {
  }

  // download files
  for (let k in new_files) {
    download(new_files[k]);
  }

  // install react
  exec("npm i -S react react-dom");
}

function scripts() {
  // create scripts in package.json
  let modified = false;
  let conf = require("./package.json");
  if (!conf.scripts) {
    conf.scripts = {};
    modified = true;
  }

  for (let script in script_tmpl) {
    let cmd = script_tmpl[script];
    if (!conf.scripts[script]) {
      conf.scripts[script] = cmd;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync("./package.json", JSON.stringify(conf, 2));
  }
}

function install() {
  exec("npm i -D typings typescript webpack ts-loader react-addons-test-utils " +
       "karma karma-mocha-reporter karma-coverage " +
       "karma-remap-istanbul remap-istanbul " +
       "karma-sourcemap-loader karma-webpack " +
       "karma-firefox-launcher karma-chrome-launcher karma-phantomjs-launcher phantomjs-prebuilt " +
       "karma-mocha karma-chai-sinon karma-chai-as-promised " +
       "mocha chai sinon sinon-chai chai-as-promised enzyme " +
       "istanbul-instrumenter-loader source-map-loader " +
       "url-loader css-loader style-loader file-loader json-loader " +
       "babel-loader babel-preset-es2015 babel-core");
  exec("npm i -S babel-polyfill");

  exec(typings + " i -D enzyme");
  exec(typings + " i -DG dt~mocha dt~chai dt~sinon dt~sinon-chai dt~chai-as-promised dt~promises-a-plus");
  exec(typings + " i -SG dt~react dt~react-dom");

  for (let k in files) {
    download(files[k]);
  }
}

if (is_new) create();
scripts();
install();

console.log("\n\nDone");
