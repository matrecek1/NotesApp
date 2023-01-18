"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const userSchema = new mongoose_1.Schema({
    notes: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Note' }],
    }
});
userSchema.plugin(passport_local_mongoose_1.default);
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=users.js.map