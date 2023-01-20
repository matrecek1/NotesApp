"use strict";
const linkNotes = document.querySelector('#notes-index-link');
const linkNew = document.querySelector('#new-note-link');
const linkLogin = document.querySelector('#login-link');
const linkRegister = document.querySelector('#register-link');
const url = window.location.href;
var splitURL = url.toString().split("/");
switch (splitURL[splitURL.length - 1]) {
    case 'new':
        linkNew.classList.add('active');
        break;
    case 'notes':
        linkNotes.classList.add('active');
        break;
    case 'login':
        linkLogin.classList.add('active');
        break;
    case "register":
        linkRegister.classList.add('active');
        break;
}
//# sourceMappingURL=activePage.js.map