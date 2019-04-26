
// const UserModel = require('../modules/user')
import UserModel from '../modules/user';
import { statusCode } from '../util/status-code';
import secret from '../config/secret';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BaseContext } from 'koa';
const uuid = require('uuid/v1');
// const util = require('util');
// const verify = util.promisify(jwt.verify);

interface User {
  id?: string;
  username?: string;
  password?: string;
  age?: number;
  roles?: Array<string>;
  avatar?: string;
  token?: string;
  [propName: string]: any;
}
export class UserController {
  /**
   * @description: 创建新用户
   * @param {type}
   * @return:
   */
  static async create(ctx: BaseContext) {
    let user: User = ctx.request.body;
    let { username, password } = user;
    let exitUser: User = await UserModel.findUserByName({ username });
    if (exitUser) {
      ctx.response.status = 403;
      ctx.body = statusCode.ERROR_412('用户已存在');
    } else {
      // 秘密加密
      const salt: string = bcrypt.genSaltSync(10);
      const hash: string = bcrypt.hashSync(password, salt);
      user.password = hash;
      user.id = uuid();
      // 创建用户
      await UserModel.create(user);
      const newUser: User = await UserModel.findUserByName({ username });
      const userToken = {
        username: newUser.username,
        id: newUser.id
      };
      const token: string = jwt.sign(userToken, secret.sign, { expiresIn: '1h' });
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok', { token });
    }
  /**
   * @description: 获取用户信息
   * @param {type}
   * @return:
   */
  }
  // static async jwt(ctx: BaseContext) {
  //   const token: string = ctx.header.authorization;
  //   if (token) {
  //     let payload;
  //     try {
  //       payload = await verify(token.split(' ')[1], secret.sign);
  //       const user = {
  //         id: payload.id,
  //         username: payload.username,
  //       };
  //       ctx.response.status = 200;
  //       ctx.body = statusCode.SUCCESS_200('查询成功', { user });
  //     } catch (err) {
  //       ctx.response.status = 412;
  //       ctx.body = statusCode.ERROR_412('查询失败，authorization error!');
  //     }
  //   }
  // }
  /**
   * @description: 登陆接口
   * @param {type}
   * @return:
   */
  static async login(ctx: BaseContext) {
    const { username, password } = ctx.request.body;
    let userInfo: User = await UserModel.findUserByName({ username });
    if (userInfo) {
      if (bcrypt.compareSync(password, userInfo.password)) {
        const userToken = {
          username: userInfo.username,
          id: userInfo.id
        };
        const token = jwt.sign(userToken, secret.sign, { expiresIn: '1h' });
        await UserModel.updateUserInfo(userInfo.id, { token });
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS_200('ok', {
          token,
          username,
          password
        });
      } else {
        ctx.body = statusCode.ERROR_412('用户名或密码错误');
      }
    } else {
      ctx.response.status = 403;
      ctx.body = statusCode.ERROR_403('用户不存在');
    }
  }
  static async logout(ctx: BaseContext) {
    const { id } = ctx.user;
    let { n }: any = await UserModel.updateUserInfo(id, { token: uuid() });
    if (n === 1) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok');
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('更新失败');
    }

  }
  /**
   * @description: 通过usename获取用户信息
   * @param {type}
   * @return:
   */
  static async getUserInfo(ctx: BaseContext) {
    const { token } = ctx.user;
    let userInfo: any = await UserModel.findUserByName({ token });
    if (userInfo) {
      let { avatar, id, username, age, roles } = userInfo;
      userInfo = {
        avatar,
        id,
        username,
        age,
        roles
      };
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok', { userInfo });
    } else {
      ctx.response.status = 401;
      ctx.body = statusCode.ERROR_401('登陆失效，请重新登陆');
    }
  }
  /**
   * @description: 更改用户信息
   * @param {type}
   * @return:
   */
  static async updateUserInfo(ctx: BaseContext) {
    const { username } = ctx.user;
    const userInfo = ctx.query;
    let { n }: any = await UserModel.updateUserInfo(username, { ...userInfo });
    if (n === 1) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok');
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('更新失败');
    }
  }
  /**
   * @description: 删除用户
   * @param {type}
   * @return:
   */
  static async delUser(ctx: BaseContext) {
    let { id } = ctx.request.body;
    let { n }: any =  await UserModel.delUser(id);
    if (n === 1) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok');
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('删除用户错误');
    }
  /**
   * @description:
   * @param {type}
   * @return:
   */
  }

}