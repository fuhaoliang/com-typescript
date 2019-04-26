import db from '../config/db';
import userSchema from '../schema/user';
const UserDbModel: any = db.model('users', userSchema);

interface User {
  username?: string;
  password?: string;
  age?: number;
  id?: string;
  roles?: Array<string>;
  token?: string;
}
export default class UserModel {
  /**
   * @description: 创建新用户
   * @param {Object}
   * @return:
   */
  static async create(user: User) {
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
  static async findUserByName(option: User) {
    return await UserDbModel.findOne(option);
  }
  /**
   * @description: 根据用户名修改用户信息
   * @param {Object}
   * @return:
   */
  static async updateUserInfo(id: string, option: User) {
    return await UserDbModel.updateOne({ id }, { ...option });
  }
  /**
   * @description: 删除用户
   * @param {type}
   * @return:
   */
  static async delUser(id: String) {
    return await UserDbModel.remove({ id });
  }
}
