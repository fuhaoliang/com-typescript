"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koaBody = require('koa-body');
exports.updateMiddlrware = koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
});
//# sourceMappingURL=update.js.map