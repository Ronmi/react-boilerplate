#!/bin/bash
set -e

DIR=$(pwd)

function run_test {
    cat "$DIR/init.js" | node
    npm test
    npm run coverage
    ./node_modules/.bin/webpack
    ./node_modules/.bin/webpack --config webpack.minify.js
}

WD=$(mktemp -d)
echo "Test init.js in $WD"
pushd "$WD"
(
    export NEW=1
    run_test
)
popd

WD=$(mktemp -d)
echo "Test template in $WD"
cp -r tmpl/* "$WD/"
pushd "$WD"
(
    # since the package.json contains no dependencies info,
    # we need to install react ourself.
    npm i -D react react-dom
    run_test
)
popd
