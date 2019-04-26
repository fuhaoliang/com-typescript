import * as mongoose from 'mongoose';
const articleTagsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  tagName: {
    type: String,
    required: true
  },
  createDate: {
    type: Number,
    default: new Date().getTime()
  }
}, {
  versionKey: false
});

export default articleTagsSchema;