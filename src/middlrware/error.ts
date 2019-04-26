
import * as jwt from 'jsonwebtoken';
import secret from '../config/secret';
// import { statusCode } from '../util/status-code';

const util = require('util');
const verify = util.promisify(jwt.verify);

/**
 * 判断token是否可用
 */
export default function () {
  return async function (ctx: any, next: any) {
    try {
      const token = ctx.header.authorization;  // 获取jwt
      if (token) {
        let payload;
        try {
          payload = await verify(token.split(' ')[1], secret.sign);
          ctx.user = {
            token: token.split(' ')[1],
            id: payload.id,
            username: payload.username,
          };
        } catch (err) {
          err.status = 401;
        }
      }
      await next();
    } catch (err) {
      console.info('err', err.message);
      // 判定接口是否需要token认证
      if (err.status === 401) {
        let errName = err.originalError ? err.originalError.name : '';
        switch (errName) {
          case 'TokenExpiredError':
            errName = 'TokenExpiredError';
            break;
          default: errName = 'Unauthorized!';
        }
        ctx.status = 401;
        ctx.message = errName;
      } else {
        ctx.message = 'server error';
      }
    }
  };
}
