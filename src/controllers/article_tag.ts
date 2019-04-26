
import { statusCode } from '../util/status-code';
import { BaseContext } from 'koa';
import ArticleTagsModel from '../modules/article_tag';
const uuid = require('uuid/v1');

interface ArticleTags {
  id: string;
  tagName: string;
}

export class ArticleTagsController {
  static async create(ctx: BaseContext) {
    let { tagName, id } = ctx.request.body;
    if (!id) id = uuid();
    const tags = await ArticleTagsModel.create({ tagName, id });
    if (tags) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok', {
        id: tags.id,
        tagName: tags.tagName,
      });
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('添加标签失败');
    }
  }
  static async creates(ctx: BaseContext) {
    const { tagArr } = ctx.request.body;
    console.info('tagArr', tagArr);
    let tagNameArr = [];
    for (let item of tagArr) {
      console.info(item);
      tagNameArr.push(item.tagName);
    }
    const isExit = await ArticleTagsModel.findExitTags(tagNameArr);
    // 判定是否多创建了标签
    if (isExit.length !== 0) {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('标签已存在');
      return;
    }
    const result = await ArticleTagsModel.creates(tagArr);
    if (result) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok', {
        tagArr: result
      });
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('添加标签失败');
    }
  }
  static async getTags(ctx: BaseContext) {
    const tagArr = await ArticleTagsModel.findTags();
    if (tagArr) {
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('ok', {
        tagArr
      });
    } else {
      ctx.response.status = 200;
      ctx.body = statusCode.ERROR_412('获取标签信息失败');
    }
  }
}