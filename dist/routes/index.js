"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const update_1 = require("../middlrware/update");
const common_1 = require("../controllers/common");
const user_1 = require("../controllers/user");
const router = new Router({
    prefix: '/api/v1'
});
// 公共方法
router.post('/upload', update_1.updateMiddlrware, common_1.CommonControllers.updatedImage);
// 用户接口
// console.info('用户接口')
router.post('/user/register', user_1.UserController.create);
router.post('/user/login', user_1.UserController.login);
router.get('/user/userinfo', user_1.UserController.getUserInfo);
router.put('/user/:username', user_1.UserController.updateUserInfo);
router.delete('/user/username', user_1.UserController.delUser);
// router.get('/user', UserController.jwtUserInfo);
exports.default = router;
//# sourceMappingURL=index.js.map