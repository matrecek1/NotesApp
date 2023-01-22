"use strict";
const pageItems = document.querySelectorAll('.page-item');
console.log(pageItems);
if (pageItems[1].classList.contains('active')) {
    pageItems[0].classList.add('disabled');
}
if (pageItems[pageItems.length - 2].classList.contains('active')) {
    pageItems[pageItems.length - 1].classList.add('disabled');
}
//# sourceMappingURL=pagination.js.map