"use strict";
const pages = document.querySelectorAll('.page-item');
let url = window.location.href.split('');
let pageNum = parseInt(url[url.length - 1]);
pages[pageNum + 1].classList.add('active');
//# sourceMappingURL=getActivePagination.js.map