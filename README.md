# Synopsis

*CAUTION*: You must have `wget` and `node` in your path, and a valid `package.json` in current working directory.

```sh
wget -q -O - https://raw.githubusercontent.com/Ronmi/react-boilerplate/master/init.js | node
```

# What's inside

- typescript compiler `typescript` which supports es6 taget, so you can write `async` and `await` with ease
- type manager `typings`
- test environment based on `enzyme`, `karma`, `mocha`, `chai` and `sinon`
- test coverage support

It's suggested to install these packages globally.
- typescript
- typings
- karma
- webpack

# Special notes

- You have to modify the `karma.conf.js` and `coverage.karma.js` for including correct source and test files.
- Since `phantomjs` does not support es2015, it is essential to transpile the codes transpiled by `tsc` with `babel`, which is the default setting in this test environment.
- `babel-polyfill` is the default es5/es6 polyfilling tool. Change it to fit your need.
- You have to install `react` and `react-dom` packages on your own.
- You may want to add `coverage` and `build` in your `.gitignore`.