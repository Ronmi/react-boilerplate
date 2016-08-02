const fs = require("fs");
const exec = require("child_process").execSync;
const typings = "./node_modules/.bin/typings";
const base_url = "https://raw.githubusercontent.com/Ronmi/react-boilerplate/master/";
const files = [
  "tmpl/karma.conf.js",
  "tmpl/coverage.karma.js",
  "tmpl/tsconfig.json"
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
  "coverage": "rm -fr build ; tsc && mkdir -p coverage && touch coverage/coverage-final.json && karma start coverage.karma.js",
  "travis": "npm run coverage",
  "test": "karma start --single-run"
};

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


scripts();

exec("npm i -D typings typescript webpack " +
     "karma karma-mocha-reporter karma-coverage " +
     "karma-remap-istanbul remap-istanbul " +
     "karma-sourcemap-loader karma-webpack " +
     "karma-firefox-launcher karma-chrome-launcher karma-phantomjs-launcher phantomjs-prebuilt " +
     "karma-mocha karma-chai-sinon mocha chai sinon sinon-chai enzyme " +
     "istanbul-instrumenter-loader css-loader style-loader file-loader json-loader " +
     "babel-loader babel-preset-es2015 babel-core babel-polyfill");

exec(typings + " i -D enzyme");
exec(typings + " i -DG dt~mocha dt~chai dt~sinon dt~sinon-chai");
exec(typings + " i -SG dt~react dt~react-dom");

for (let k in files) {
  exec("wget " + base_url+files[k]);
}

console.log("\n\nDone");
