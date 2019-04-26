'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const jwt = require('jsonwebtoken');
const secret_1 = require('../config/secret');
const status_code_1 = require('../util/status-code');
const util = require('util');
const verify = util.promisify(jwt.verify);
/**
 * 判断token是否可用
 */
function default_1() {
  return async function (ctx, next) {
    try {
      const token = ctx.header.authorization; // 获取jwt
      if (token) {
        let payload;
        try {
          payload = await verify(token.split(' ')[1], secret_1.default.sign);
          ctx.user = {
            token: token.split(' ')[1],
            id: payload.id,
            username: payload.username,
          };
        }
        catch (err) {
          let msg = err.message;
          switch (msg) {
            case 'jwt expired':
              msg = '登陆过期，请重新登陆';
              break;
            default: msg = 'Unauthorized，请求需要用户的身份认证！';
          }
          ctx.status = 200;
          ctx.body = status_code_1.statusCode.ERROR_401(msg);
        }
      }
      await next();
    }
    catch (err) {
      // 判定接口是否需要token认证
      if (err.status === 401) {
        let errName = err.originalError.name;
        switch (errName) {
          case 'TokenExpiredError':
            errName = '登陆过期，请重新登陆';
            break;
          default: errName = 'Unauthorized，请求需要用户的身份认证！';
        }
        ctx.status = 200;
        ctx.body = status_code_1.statusCode.ERROR_401(errName);
      }
      else {
        ctx.body = status_code_1.statusCode.ERROR_404(err.message);
      }
    }
  };
}
exports.default = default_1;
// # sourceMappingURL=error.js.map