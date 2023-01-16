import { INote } from "../models/notes";
export interface Sorter {
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
        if(note.tags){
            sorters.tags.push(...note.tags)
        }
    }
    return sorters
}

export const getNotesByCategory = (notes: INote[],category:string):INote[] =>{
    const notesByCat:INote[] = notes.filter(note => note.category === category)
    return notesByCat
}

export const getNotesByTags = (notes: INote[], tag: string): INote[] => {
    const notesByTags: INote[] = notes.filter(note =>{
        if(note.tags?.some(noteTag => noteTag === tag)) return note
    })
    return notesByTags
}