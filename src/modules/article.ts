import db from '../config/db';
import articlesSchema from '../schema/article';
const ArticleDbModel: any = db.model('articles', articlesSchema);

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
}
export default class ArticleModel {
  static async create(article: Article) {
    return await ArticleDbModel({ ...article }).save();
  }
  static async findArticle(option: Article) {
    return await ArticleDbModel.findOne(option,{_id: 0});
  }
  static async findAtricles(option: Article) {

  }
  static async updateArticle(id: string, option: Article) {
    return await ArticleDbModel.updateOne({ id }, { ...option });
  }
  static async delArticle(id: string) {
    return await ArticleDbModel.remove({ id });
  }
}
