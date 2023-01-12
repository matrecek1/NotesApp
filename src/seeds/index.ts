import express from "express";
import mongoose from "mongoose";
import { Note } from '../models/notes';
import { titles } from './indexHelper'
const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/notesapp');
console.log("Connected to db");
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("connected to database"));



const seedNotes = async () => {
    await Note.deleteMany()
    for (let i = 0; i < 10; i++) {
        let random357 = Math.floor(Math.random() * 357);
        let note = new Note({
            title: titles[random357],
            noteBody: 'Exercitation veniam tempor ut dolor. Labore cupidatat dolor velit aliquip ut elit reprehenderit ullamco. Sit Lorem proident exercitation sint eu ullamco est ad sunt. Nisi consectetur tempor amet culpa qui eiusmod consequat est quis. Anim sit officia adipisicing occaecat ut eiusmod magna. Do ea aliquip non magna deserunt ea mollit elit laboris nostrud. Cillum ullamco minim eu id Lorem enim cupidatat esse cupidatat.'
        })
        await note.save()
    }
}
const runIt = async() => {
    await seedNotes()
    db.close()
}
runIt()
