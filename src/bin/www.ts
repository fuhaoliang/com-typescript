const http = require('http');
import app from '../app';

const server = http.createServer(app.callback());

server.listen(3000, () => {
  console.info('启动3000端口');
});