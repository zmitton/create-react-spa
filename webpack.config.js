const {
  es6Bundle,
  es5Bundle
} = require('./webpack-helpers/base-bundles');
const {
  devCssRule,
  prodCssPlugin,
  prodHtmlPlugins,
  prodCssRule
} = require('./webpack-helpers/css-helpers');


module.exports = [
  // ES6+ version
  (_env, argv) => {
    if (argv.mode === 'development') {
      es6Bundle.module.rules.push(devCssRule);
      es6Bundle.output.globalObject = 'this'; // fixes 'window is not defined' error in dev server
    }
    if (argv.mode === 'production') {
      es6Bundle.plugins.push(prodCssPlugin, ...prodHtmlPlugins); // prodHtmlPlugins only for 1 bundle
      es6Bundle.module.rules.push(prodCssRule);
    }
    return es6Bundle;
  },

  // ES5 version
  (_env, argv) => {
    if (argv.mode === 'development') {
      es5Bundle.module.rules.push(devCssRule);
      es5Bundle.output.globalObject = 'this'; // fixes 'window is not defined' error in dev server
    }
    if (argv.mode === 'production') {
      es5Bundle.plugins.push(prodCssPlugin); // overwrites identical CSS file from es6Main (ok)
      es5Bundle.module.rules.push(prodCssRule);
    }
    return es5Bundle;
  }
];
