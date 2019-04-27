import * as mongoose from 'mongoose';
const uuid = require('uuid/v1');
const articleTagsSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid()
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