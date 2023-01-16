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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageData = void 0;
const notes_1 = require("../../models/notes");
const getPageData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const notesPerPage = 18;
    const { p } = req.query;
    let page;
    if (typeof p === 'string')
        page = parseInt(p);
    else
        page = 0;
    const noteCount = yield notes_1.Note.estimatedDocumentCount();
    const pageCount = Math.ceil(noteCount / notesPerPage);
    const pages = {
        currentPage: page,
        numOfPages: pageCount,
        notesPerPage: notesPerPage
    };
    res.locals.pages = pages;
    next();
});
exports.getPageData = getPageData;
//# sourceMappingURL=pages.js.map