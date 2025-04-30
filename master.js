const { exec, spawn, fork } = require('child_process');
const path = require('path');
const util = require('util');

const colors = {
  exec: '\x1b[36m', spawn: '\x1b[33m', fork: '\x1b[35m',
  error: '\x1b[31m', reset: '\x1b[0m', 
};

const config = {
  script: path.join(__dirname, 'support.js'),
  count: 3,
  log: (method, msg) => console.log(`${colors[method]}${msg}${colors.reset}`)
};

class ProcessRunner {
  constructor() {
    this.timers = {};
    this.pids = new Map();
  }

  async runAll() {
    config.log('success', 'Starting demonstration');
    
    await this.run('exec');
    await this.run('spawn');
    await this.run('fork');

    config.log('success', 'All methods completed');
  }

  async run(method) {
    this.timers[method] = Date.now();
    config.log(method, `Starting ${method}()`);
    
    const workers = Array.from({ length: config.count }, (_, i) => 
      this[`create${method}`](i)
    );

    await Promise.all(workers);
    config.log(method, `${method}() completed in ${Date.now() - this.timers[method]}ms`);
  }

  createexec(i) {
    return new Promise(resolve => {
      const worker = exec(`node ${config.script} ${i}`, (err, stdout, stderr) => {
        config.log('exec', `Process ${i}:\n${stdout}${stderr}`);
        resolve();
      });
      this.pids.set(`exec-${i}`, worker.pid);
    });
  }

  createspawn(i) {
    return new Promise(resolve => {
      const worker = spawn('node', [config.script, i]);
      this.pids.set(`spawn-${i}`, worker.pid);

      worker.stdout.on('data', d => config.log('spawn', `PID ${worker.pid} stdout: ${d}`));
      worker.on('close', code => {
        config.log('spawn', `PID ${worker.pid} exited (${code})`);
        resolve();
      });
    });
  }

  createfork(i) {
    return new Promise(resolve => {
      const worker = fork(config.script, [i], { silent: true });
      this.pids.set(`fork-${i}`, worker.pid);

      worker.on('message', msg => 
        config.log('fork', `PID ${worker.pid} message: ${util.inspect(msg)}`)
      );
      worker.on('close', code => {
        config.log('fork', `PID ${worker.pid} exited (${code})`);
        resolve();
      });
      worker.send({ task: `Task ${i}` });
    });
  }
}

new ProcessRunner().runAll();