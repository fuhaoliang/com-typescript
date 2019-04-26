"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const app_1 = require("../app");
const server = http.createServer(app_1.default.callback());
server.listen(3000, () => {
    console.info('启动3000端口');
});
//# sourceMappingURL=www.js.map