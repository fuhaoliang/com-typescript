"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 6,
        max: 18,
        require: true
    },
    password: {
        type: String,
        min: 6,
        max: 18,
        require: true
    },
    age: {
        type: Number
    },
    id: {
        type: String,
        require: true
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
    }
});
exports.default = userSchema;
//# sourceMappingURL=user.js.map