import * as mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 6,
    max: 18,
    required: true
  },
  password: {
    type: String,
    min: 6,
    max: 18,
    required: true
  },
  age: {
    type: Number
  },
  id: {
    type: String,
    required: true
  },
  roles: {
    type: Array,
    default: ['admin']
  },
  avatar: {
    type: String,
    default: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  },
  token: {
    type: String,
    default: 0
  },
}, {
  versionKey: false
});

export default userSchema;