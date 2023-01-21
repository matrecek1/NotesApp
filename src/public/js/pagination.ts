const pageItems = document.querySelectorAll('.page-item')
console.log(pageItems);

const activeItemIndex = (collection:NodeListOf<Element>):number=>{
    let output:number = -1
    collection.forEach((element:Element, index:number) => {
        if(element.classList.contains('active')){
            output = index
        }
    });
    return output
}
if(pageItems.length === 3){
    pageItems[0].classList.add('disabled')
    pageItems[2].classList.add('disabled')

}
console.log(activeItemIndex(pageItems));