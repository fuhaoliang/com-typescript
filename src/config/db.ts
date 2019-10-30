import * as mongoose from 'mongoose';
// const cmsBaseUrl = 'mongodb://127.0.0.1:27017/cms';
const cmsBaseUrl = 'mongodb://47.101.139.129:27017/cms';
mongoose.connect(cmsBaseUrl, { useNewUrlParser: true, useCreateIndex: true });
const db =  mongoose.connection;
db.on('error', err => {
  console.info('数据库连接失败', err);
});

db.once('open', () => {
  console.info('连接数据库');
});

export default db;
