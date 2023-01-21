"use strict";
const pageItems = document.querySelectorAll('.page-item');
console.log(pageItems);
const activeItemIndex = (collection) => {
    let output = -1;
    collection.forEach((element, index) => {
        if (element.classList.contains('active')) {
            output = index;
        }
    });
    return output;
};
if (pageItems.length === 3) {
    pageItems[0].classList.add('disabled');
    pageItems[2].classList.add('disabled');
}
console.log(activeItemIndex(pageItems));
//# sourceMappingURL=pagination.js.map