"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageNumber = void 0;
const getPageNumber = (url) => {
    url.split("");
    let page = parseInt(url[url.length - 1]);
    return page;
};
exports.getPageNumber = getPageNumber;
//# sourceMappingURL=getPageNumber.js.map