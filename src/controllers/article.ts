
import { statusCode } from '../util/status-code';
import { BaseContext } from 'koa';
import ArticleModel from '../modules/article';
import ArticleTagsModel from '../modules/article_tag';

const uuid = require('uuid/v1');

interface Article {
  id?: string;
  banner?: string;
  title?: string;
  content?: string;
  articleLink?: string;
  isCommit?: boolean;
  timeDateType?: string;
  timeDate?: number;
  createDate?: number;
  modifyDate?: number;
  views?: number;
  tagArr?:Array<string>;
  [propName: string]: any;
}

interface ArticleTags {
  tagName: string;
  createDate?: number;
}

export class ArticleController {
  // 创建
  static async create(ctx: BaseContext) {
    let atricle: Article = ctx.request.body;
    const { tagArr } = ctx.request.body;
    let newTagNameArr:Array<ArticleTags> = []
    let dbTagNameArr:Array<string> = [];
    atricle = {
      ...atricle,
      id: uuid()
    };
    const dbTagArr = await ArticleTagsModel.getTags() || []
    for (let item of dbTagArr) {
      dbTagNameArr.push(item.tagName);
    }
    tagArr.forEach((itemName: string) => {
      if (!dbTagNameArr.includes(itemName)) newTagNameArr.push({ tagName: itemName })
    });

    await ArticleTagsModel.creates(newTagNameArr)

    let newatricle: Article =  await ArticleModel.create(atricle);
    if (newatricle) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok', {
        id: newatricle.id
      });
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('创建失败');
    }
  }
  // 删除
  static async delArticle(ctx: BaseContext) {
    const { id } = ctx.request.body;
    let { n } = await ArticleModel.delArticle(id);
    if (n === 1) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok');
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('删除失败');
    }
  }
  // 修改
  static async pacthArticle(ctx: BaseContext) {
    const { id } = ctx.params;
    const { tagArr = [] } = ctx.request.body;
    // 判断是否有新标签
    let newTagNameArr:Array<ArticleTags> = []
    let dbTagNameArr:Array<string> = [];
    const dbTagArr = await ArticleTagsModel.getTags() || []
    for (let item of dbTagArr) {
      dbTagNameArr.push(item.tagName);
    }
    tagArr.forEach((itemName: string) => {
      if (!dbTagNameArr.includes(itemName)) newTagNameArr.push({ tagName: itemName })
    });
    await ArticleTagsModel.creates(newTagNameArr)
    // 数据
    const articleObj: Article = ctx.request.body;
    const { n } = await ArticleModel.updateArticle(id, articleObj);
    if (n === 1) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok');
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('修改失败');
    }
  }
  // 获取
  static async getArticleInfo(ctx: BaseContext) {
    let { id } = ctx.params;
    let article: Article = await ArticleModel.findArticle({ id });
    if (article) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok', { articleObj: article });
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('未发现文章');
    }
  }
}