module.exports = {
  // Add files or directories here so browsersync can watch them
  "files": [
    "js",               // Executable js code is packed into js/ by webpack
    "index.html",
    "node_modules"
  ],
  // auto inject browser-sync script into html file
  "rewriteRules": [
    {
      match: /(<\/[Bb][Oo][Dd][Yy]>)/,
      replace: '<script async src="/browser-sync/browser-sync-client.2.14.0.js"><\/script>$1',
    },
  ],
  // Enable static server by default
  "server": true,
  // If you are running a backend or mock API server, set it up here
  // "proxy": "127.0.0.1:8000",

};
