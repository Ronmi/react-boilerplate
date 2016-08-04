[![Build Status](https://travis-ci.org/Ronmi/react-boilerplate.svg?branch=master)](https://travis-ci.org/Ronmi/react-boilerplate)

# Synopsis

### Existing project

```sh
# with wget
wget -q -O - https://raw.githubusercontent.com/Ronmi/react-boilerplate/master/init.js | node

# or with curl
curl https://raw.githubusercontent.com/Ronmi/react-boilerplate/master/init.js | node

# or even with node itself
echo 'require("https").get("https://raw.githubusercontent.com/Ronmi/react-boilerplate/master/init.js",r=>{r.on("data",d=>{process.stdout.write(d);});});' | node | node
```

### Create new project

```sh
# with wget
wget -q -O - https://raw.githubusercontent.com/Ronmi/react-boilerplate/master/init.js | env NEW=1 node

# or with curl
curl https://raw.githubusercontent.com/Ronmi/react-boilerplate/master/init.js | env NEW=1 node

# or even with node itself
echo 'require("https").get("https://raw.githubusercontent.com/Ronmi/react-boilerplate/master/init.js",r=>{r.on("data",d=>{process.stdout.write(d);});});' | node | env NEW=1 node
```

# What's inside

For existing project, it adds these features to you project environment

- typescript compiler `typescript` which supports es6 taget, so you can write `async` and `await` with ease
- type manager `typings`
- test environment based on `enzyme`, `karma`, `mocha`, `chai` and `sinon`
- test coverage support
- `sinon-chai` and `chai-as-promised` for testing asynchronized requests
- few helper scripts in `package.json`

For newly created project, it adds even more

- two `webpack` configuration to pack your files with/without compressing
- a `Hello world` application with test codes
- git ignorance setting file
- `browser-sync` for showing your modification on-the-fly
- `lodash` and relative webpack settings. It will not included in packed file if you're not using it.

It's suggested to install these packages globally.
- typescript
- typings
- karma
- webpack

# Special notes

- This config transpiles your ts codes twice: using `ts-loader` and `babel`. If you are not going to use `async`/`await`, you can remove `babel` in webpack config and change target to `es5` in `tsconfig.json`. This will greatly speed up your compiling.
- Since `phantomjs` does not support es2015, it is essential to transpile the codes transpiled by `tsc` with `babel`, which is the default setting in this test environment.
- `babel-polyfill` is the default es5/es6 polyfilling tool. Change it to fit your need.
- You have to install `react` and `react-dom` packages on your own.
- You may want to add `coverage` and `build` in your `.gitignore`.

# Tips of success

- When introducing new node modules to the project, use `-S` (`--save`) for external dependency (like jquery), `-D` for others. Webpack will read your `package.json` and pack external dependencies into `vendor.js`.
- In most cases, you'll find it easier to use global typings for external dependencies.
- Use `async`/`await` only for replacing `.then(...).then(..)`.
- Always test your codes. `npm run test:w` will be your best friend.