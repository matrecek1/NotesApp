"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDate = void 0;
const addDate = (req, res, next) => {
    const { note } = req.body;
    note.dateOfCreation = new Date();
    next();
};
exports.addDate = addDate;
//# sourceMappingURL=addDate.js.map