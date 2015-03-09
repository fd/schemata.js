var proc = require('child_process');

process.env.BATCH_ID = 1;
proc.execSync('node_modules/karma/bin/karma start');

process.env.BATCH_ID = 2;
proc.execSync('node_modules/karma/bin/karma start');
