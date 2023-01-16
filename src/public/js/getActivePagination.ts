const pages = document.querySelectorAll('.page-item')
let url = window.location.href.split('')
let pageNum:number = parseInt(url[url.length - 1])
pages[pageNum + 1].classList.add('active')



