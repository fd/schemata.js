// Karma configuration
// Generated on Fri Mar 06 2015 12:58:28 GMT+0100 (CET)


var batches = require('./test_browsers.js');
module.exports = function(config) {
  var batch = batches[parseInt(process.env.BATCH_ID, 10) - 1];
  var customLaunchers = batch;

  config.set({
    sauceLabs: {
      testName:          'Schemata.js',
      startConnect:      false,
      // recordVideo:       false,
      // recordScreenshots: false,
      // captureHtml:       false,
      commandTimeout:    600,
      idleTimeout:       1000
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['dots', 'saucelabs'],
    singleRun: true,
    browserDisconnectTimeout: 30000,
    browserNoActivityTimeout: 4 * 600000,
    captureTimeout: 4 * 600000,
    browserDisconnectTolerance: 2,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'jspm_packages/system.js',
      'config.js',
      'test/runner.js',
      { pattern: 'jspm_packages/**/*', included: false },
      { pattern: 'src/**/*.js',        included: false },
      { pattern: 'test/**/*.json',     included: false },
      { pattern: 'test/**/*.js',       included: false }
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
  });
};
