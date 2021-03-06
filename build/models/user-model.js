"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    nickname: String,
    level: Number,
    state: Boolean,
}, { timestamps: true });
var UserModel = mongoose_1.model('User', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user-model.js.map