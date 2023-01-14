import { Schema, model } from "mongoose"

export interface INote {
    title: string;
    noteBody: string;
    category?: string;
    tags?: string[];
    dateOfCreation: Date;
}

const noteSchema = new Schema<INote>({
    title: {
        type:String,
        required: true
    },
    noteBody: {
        type:String,
        required: true
    },
    category: {
        type:String,
    },
    tags: [String],
    dateOfCreation: {
        type:Date,
        required: true
    }
})

export const Note = model<INote>('Note', noteSchema)

