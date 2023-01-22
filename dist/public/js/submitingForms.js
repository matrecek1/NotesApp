"use strict";
const form = document.querySelector('form');
const submitBtn = document.querySelector('.btn[type="submit"]');
form.onsubmit = () => {
    submitBtn.setAttribute('disabled', '');
    const children = submitBtn.children;
    children[0].classList.remove('visually-hidden');
};
//# sourceMappingURL=submitingForms.js.map