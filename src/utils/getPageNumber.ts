export const getPageNumber = (url: string):number =>{
    url.split("")
    let page: number = parseInt(url[url.length - 1])
    return page
}