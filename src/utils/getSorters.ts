import { INote } from "../models/notes";
interface Sorter {
    categories:string[];
    tags:string[];
}
export const getSorters = (notes: INote[]): Sorter => {
    let sorters:Sorter = {
        categories:[],
        tags:[]    
    }
    for(let note of notes) {
        if(note.category){
            sorters.categories.push(note.category)
        }
    }
    return sorters
}