var karmaLoaded = window.__karma__.loaded;
window.__karma__.loaded = function() {
  System.import('test/test')
    .then(function(m) {
      return m.setup();
    })
    .then(function() {
      karmaLoaded.call(window.__karma__);
    });
};
