"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongo = undefined;
module.exports.setUp = () => __awaiter(void 0, void 0, void 0, function* () {
    mongo = yield MongoMemoryServer.create();
    const url = mongo.getUri();
    yield mongoose.connect(url, {
        useNewUrlParser: true,
    });
});
module.exports.dropDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongo) {
        yield mongoose.connection.dropDatabase();
        yield mongoose.connection.close();
        yield mongo.stop();
    }
});
module.exports.dropCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongo) {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            yield collection.deleteMany();
        }
    }
});
//# sourceMappingURL=db.js.map