const form = document.querySelector('form')!
const submitBtn = document.querySelector('.btn[type="submit"]')!
form.addEventListener('submit', (evt =>{
    submitBtn.setAttribute('disabled', '')
    const children = submitBtn.children
    children[0].classList.remove('visually-hidden')
}))
 

