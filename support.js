const colors = { 
    child: '\x1b[34m', error: '\x1b[31m', 
    reset: '\x1b[0m' 
  };
  
  const config = {
    minDelay: 500,
    maxDelay: 2500,
    errorChance: 0.2,
    log: (pid, msg) => console.log(`${colors.child}[PID ${pid}] ${msg}${colors.reset}`)
  };
  
  class ChildProcess {
    constructor(id) {
      this.id = id;
      this.pid = process.pid;
      this.start = Date.now();
      
      process.on('message', msg => this.handleMessage(msg));
      ['SIGINT', 'SIGTERM'].forEach(s => process.on(s, () => this.shutdown(s)));
      
      this.work();
    }
  
    async work() {
      await new Promise(r => setTimeout(r, this.delay));
      
      try {
        if (Math.random() < config.errorChance) throw new Error('Simulated error');
        this.sendResult(`Completed in ${Date.now() - this.start}ms`);
      } catch (err) {
        this.sendError(err);
      }
    }
  
    get delay() {
      return Math.random() * (config.maxDelay - config.minDelay) + config.minDelay;
    }
  
    handleMessage(msg) {
      config.log(this.pid, `Received: ${JSON.stringify(msg)}`);
      process.send({ ack: true, id: this.id });
    }
  
    sendResult(message) {
      config.log(this.pid, message);
      if (process.send) process.send({ id: this.id, message });
    }
  
    sendError(err) {
      console.error(`${colors.error}[PID ${this.pid}] ERROR: ${err.message}${colors.reset}`);
      if (process.send) process.send({ id: this.id, error: err.message });
    }
  
    shutdown(signal) {
      config.log(this.pid, `Shutting down (${signal})`);
      process.exit(0);
    }
  }
  
  try {
    new ChildProcess(process.argv[2]);
  } catch(err) {
    console.error(`${colors.error}Fatal error: ${err.message}${colors.reset}`);
    process.exit(1);
  }