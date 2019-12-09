const cluster = require('cluster');
const os = require('os');

// eslint-disable-next-line no-shadow
const createWorker = cluster => {
  const worker = cluster.fork();
  console.log(`Worker created, it's pid:${worker.process.pid}`);
  worker.on('exit', () => {
    console.log(`Worker died with pid:${worker.process.pid}`);
    cluster.fork();
  });
};

cluster.setupMaster({
  exec: './moduleLoader.js',
});

if (cluster.isMaster) {
  let i = os.cpus().length;
  console.log(`Master started. CPU num is ${i}`);
  while (i > 0) {
    createWorker(cluster);
    // eslint-disable-next-line no-plusplus
    i--;
  }
}
module.exports = cluster;
