const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "fs": false,
      "util": require.resolve("util/"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "assert": require.resolve("assert/"),
      "url": require.resolve("url/"),
    },
  },
};
