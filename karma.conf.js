// Karma configuration
// Generated on Fri Mar 06 2015 12:58:28 GMT+0100 (CET)

module.exports = function(config) {
  var customLaunchers = {
    sl_chrome35: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '35'
    },
    sl_chrome36: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '36'
    },
    sl_chrome37: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '37'
    },
    sl_chrome38: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '38'
    },
    sl_chrome39: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '39'
    },
    sl_chrome40: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '40'
    },
    sl_firefox30: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    sl_firefox31: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '31'
    },
    sl_firefox32: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '32'
    },
    sl_firefox33: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '33'
    },
    sl_firefox34: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '34'
    },
    sl_firefox35: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '35'
    },
    sl_ie9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '9'
    },
    sl_ie10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '10'
    },
    sl_ie11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '11'
    }
  };

  config.set({
    sauceLabs: {
      testName: 'Schemata.js',
      build:    process.env.WERCKER_BUILD_ID
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
