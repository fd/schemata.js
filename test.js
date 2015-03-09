var spawn = require('child_process').spawn;

var batches = require('./test_browsers.js');

jspmInstall(function(err, code) {
  assertOK(err, code);
  runBatches(batches.length);
});

function jspmInstall(clb) {
  var ps = spawn('jspm', ['install']);
  handleChildProcess(ps, clb);
}

function runBatches(n, i) {
  if (i === undefined) {
    i = 0;
  }

  if (i >= n) return;

  runBatch(i+1, function(err, code) {
    assertOK(err, 0);
    runBatches(n, i+1);
  });
}

function runBatch(batch_id, clb) {
  process.env.BATCH_ID = batch_id;
  var ps = spawn('node_modules/karma/bin/karma', ['start']);
  handleChildProcess(ps, clb);
}

function assertOK(err, code) {
  if (err) {
    console.log("error: "+err);
  }
  if (code !== 0) {
    process.exit(code);
  }
}

function handleChildProcess(ps, clb) {
  var done = false;

  ps.on('error', function (err) {
    if (!done) {
      done = true;
      clb(err, 1);
    }
  });

  ps.stdout.on('data', function (data) {
    process.stdout.write(data);
  });

  ps.stderr.on('data', function (data) {
    process.stderr.write(data);
  });

  ps.on('close', function (code) {
    if (!done) {
      done = true;
      clb(null, code);
    }
  });
}
