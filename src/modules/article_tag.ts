import db from '../config/db';
import articleTagsSchema from '../schema/article_tag';
const ArticleTagsDbModel: any = db.model('article_attrs', articleTagsSchema);

interface ArticleTags {
  id: string;
  tagName: string;
  createDate?: number;
}



export default class ArticleTagsModel {
  static async create(tag: ArticleTags) {
    return await ArticleTagsDbModel({
      ...tag
    }).save();
  }
  static async creates(tagArr: Array<ArticleTags>) {
    return await ArticleTagsDbModel.insertMany(tagArr);
  }
  static async findTags() {
    return await ArticleTagsDbModel.find();
  }
  static async findExitTags(tagNameArr: Array<string>) {
    return await ArticleTagsDbModel.find({ tagName: { $in: tagNameArr } });
  }
}