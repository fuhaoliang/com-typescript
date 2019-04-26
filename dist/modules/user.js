"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const user_1 = require("../schema/user");
const UserDbModel = db_1.default.model('users', user_1.default);
class UserModel {
    /**
     * @description: 创建新用户
     * @param {Object}
     * @return:
     */
    static async create(user) {
        let { username, password, age, id } = user;
        return await UserDbModel({
            username,
            password,
            age,
            id
        }).save();
    }
    /**
     * @description: 根据用户名查询用户
     * @param {Object}
     * @return: null/{}
     */
    static async findUserByName(option) {
        return await UserDbModel.findOne(option);
    }
    /**
     * @description: 根据用户名修改用户信息
     * @param {Object}
     * @return:
     */
    static async updateUserInfo(id, option) {
        return await UserDbModel.updateOne({ id }, Object.assign({}, option));
    }
    /**
     * @description: 删除用户
     * @param {type}
     * @return:
     */
    static async delUser(username) {
        return await UserDbModel.remove({ username });
    }
}
exports.default = UserModel;
//# sourceMappingURL=user.js.map