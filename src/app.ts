import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as koaStatic from 'koa-static';
import * as jwt from 'koa-jwt';
import router from './routes/index';
import error from './middlrware/error';
import secret from './config/secret';
const cros = require('@koa/cors');
const app = new Koa();

app.use(cros());
// middlrware
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(koaStatic(__dirname + '/public/cms'));
app.use(koaStatic(__dirname + '/upload'));
// error处理
app.use(error());

// token认证
app.use(jwt({ secret: secret.sign }).unless({
  path: [
    // 上传图片
    /^\/api\/v1\/upload/,
    // 文章详情
    /^\/api\/v1\/article\/detail/,
    // 文章列表
    /^\/api\/v1\/article\/list/,
    // 登录
    /^\/api\/v1\/user\/login/,
    // 创建用户
    /^\/api\/v1\/user\/register/,
    // 分类列表
    /^\/api\/v1\/category\/list/,
    // 文章搜索
    /^\/api\/v1\/article\/search/,
    // 分类
    /^\/api\/v1\/category\/article\/list/,
    // 创建文章
    /^\/api\/v1\/article/,
    /^\/api\/v1\/tags/,

  ]
}));

// router控制
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
