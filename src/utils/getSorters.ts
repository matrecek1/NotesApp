import { INote } from "../models/notes";
export interface Sorter {
    categories:string[];
    tags:string[];
}
export const getSorters = (notes: INote[]): Sorter => {
    const sorters:Sorter = {
        categories:[],
        tags:[]    
    }
    for(const note of notes) {
        if(note.category){
            if(!sorters.categories.includes(note.category)){
                sorters.categories.push(note.category)
            }
        }
        if(note.tags){
            for(const tag of note.tags){
                if (!sorters.tags.includes(tag)){
                    sorters.tags.push(tag)
                }
            }
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