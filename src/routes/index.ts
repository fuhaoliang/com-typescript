import * as Router from 'koa-router';
import { updateMiddlrware } from '../middlrware/update';
import { CommonControllers } from '../controllers/common';
import { UserController } from '../controllers/user';
import { ArticleController } from '../controllers/article';
import { ArticleTagsController } from '../controllers/article_tag';
const router = new Router({
  prefix: '/api/v1'
});
// 公共方法
router.post('/upload', updateMiddlrware, CommonControllers.updatedImage);

// 用户接口
router.post('/user/register', UserController.create);
router.post('/user/login', UserController.login);
router.post('/user/logout', UserController.logout);
router.get('/user/userinfo', UserController.getUserInfo);
router.put('/user/:username', UserController.updateUserInfo);
router.delete('/user/delete', UserController.delUser);
// router.get('/user', UserController.jwtUserInfo);

// 文章接口
router.post('/article/create', ArticleController.create);
router.get('/article/:id', ArticleController.getArticleInfo);
router.delete('/article/delete', ArticleController.delArticle);
router.patch('/article/:id', ArticleController.pacthArticle);

// 文章标签
router.post('/tags/create', ArticleTagsController.create);
router.post('/tags/creates', ArticleTagsController.creates);
router.get('/tags', ArticleTagsController.getTags);

export default router;