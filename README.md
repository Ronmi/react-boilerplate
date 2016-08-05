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

- Typescript compiler `typescript` which supports es6 taget, so you can write `async` and `await` with ease.
- Type manager `typings`.
- Test environment based on `enzyme`, `karma`, `mocha`, `chai` and `sinon`.
- Test coverage support.
- `sinon-chai` and `chai-as-promised` for testing asynchronized requests.
- Few helper scripts in `package.json`.
- Tnstall correct type definition of `require`. You can use webpack-specific require feature like code-splitting and load css file.

For newly created project, it adds even more

- Two `webpack` configuration to pack your files with/without compressing.
- A `Hello world` application with test codes.
- Sample `.gitignore`.
- Ready-to-work `browser-sync` for static pages. To integrate with your backend or mock server, related configuration is leaved in `bs-config.js`.
- `lodash` and related webpack settings. It will not be included in packed file if you're not using it. **You'll have to run `typings i -S lodash` to install lodash typing info manually before using it.**

It's suggested to install these packages globally.

- typescript
- typings
- karma
- webpack

# Special notes

- `async`/`await` in typescript needs es2015 target, so this config transpiles your ts codes twice using `ts-loader` and `babel`. If you are not going to use `async`/`await`, you can remove `babel` in webpack config and change target to `es5` in `tsconfig.json`. This will greatly speed up your compiling.
- `babel-polyfill` is the default es5/es6 polyfilling tool, mostly for genertor. If you don't need `async`/`await` and changed target to `es5`, you may want to use `es5-shim` and `es6-shim` instead, which can reduce the size of packed js.
- For existing project, you have to install `react` and `react-dom` packages on your own.
- For existing project, you may want to add `public/js`, `coverage` and `build` in your `.gitignore`.

# Tips of success

- When introducing new node modules to the project, use `-S` (`--save`) for external dependency (like jquery), `-D` for others. Webpack will read your `package.json` and pack external dependencies into `vendor.js`.
- In most cases, you'll find it easier to use global typings for external dependencies.
- Use `async`/`await` only for replacing `.then(...).then(..)`.
- Always test your code. `npm run test:w` will be your best friend.