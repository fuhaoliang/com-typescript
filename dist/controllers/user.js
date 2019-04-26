"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const UserModel = require('../modules/user')
const user_1 = require("../modules/user");
const status_code_1 = require("../util/status-code");
const secret_1 = require("../config/secret");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require('uuid/v1');
class UserController {
    /**
     * @description: 创建新用户
     * @param {type}
     * @return:
     */
    static async create(ctx) {
        let user = ctx.request.body;
        let { username, password } = user;
        let exitUser = await user_1.default.findUserByName({ username });
        if (exitUser) {
            ctx.response.status = 403;
            ctx.body = status_code_1.statusCode.ERROR_412('用户已存在');
        }
        else {
            // 秘密加密
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            user.password = hash;
            user.id = uuid();
            // 创建用户
            await user_1.default.create(user);
            const newUser = await user_1.default.findUserByName({ username });
            const userToken = {
                username: newUser.username,
                id: newUser.id
            };
            const token = jwt.sign(userToken, secret_1.default.sign, { expiresIn: '1h' });
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok', { token });
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
    static async login(ctx) {
        const { username, password } = ctx.request.body;
        let userInfo = await user_1.default.findUserByName({ username });
        if (userInfo) {
            if (bcrypt.compareSync(password, userInfo.password)) {
                const userToken = {
                    username: userInfo.username,
                    id: userInfo.id
                };
                const token = jwt.sign(userToken, secret_1.default.sign, { expiresIn: '1h' });
                await user_1.default.updateUserInfo(userInfo.id, { token });
                ctx.response.status = 200;
                ctx.body = status_code_1.statusCode.SUCCESS_200('ok', {
                    token,
                    username,
                    password
                });
            }
            else {
                ctx.response.status = 412;
                ctx.body = status_code_1.statusCode.ERROR_412('用户名或密码错误');
            }
        }
        else {
            ctx.response.status = 403;
            ctx.body = status_code_1.statusCode.ERROR_403('用户不存在');
        }
    }
    /**
     * @description: 通过usename获取用户信息
     * @param {type}
     * @return:
     */
    static async getUserInfo(ctx) {
        const { token } = ctx.user;
        let userInfo = await user_1.default.findUserByName({ token });
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
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok', { userInfo });
        }
        else {
            ctx.response.status = 401;
            ctx.body = status_code_1.statusCode.ERROR_401('登陆失效，请重新登陆');
        }
    }
    /**
     * @description: 更改用户信息
     * @param {type}
     * @return:
     */
    static async updateUserInfo(ctx) {
        const { username } = ctx.user;
        const userInfo = ctx.query;
        let { n } = await user_1.default.updateUserInfo(username, Object.assign({}, userInfo));
        if (n === 1) {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok');
        }
        else {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('更新失败');
        }
    }
    /**
     * @description: 删除用户
     * @param {type}
     * @return:
     */
    static async delUser(ctx) {
        let { username } = ctx.request.body;
        let { n } = await user_1.default.delUser(username);
        if (n === 1) {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.SUCCESS_200('ok');
        }
        else {
            ctx.response.status = 200;
            ctx.body = status_code_1.statusCode.ERROR_412('删除用户错误');
        }
        /**
         * @description:
         * @param {type}
         * @return:
         */
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map