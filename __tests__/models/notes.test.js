const mongoose = require("mongoose");
const { Note } = require("../../dist/models/notes");
const db = require("../../src/models/setup/db");

const noteData = {
    title: "Note",
    noteBody: "NoteBody",
    category: "car",
    tags: "",
    dateOfCreation: new Date()
};

beforeAll(async () => {
    await db.setUp();
});

afterEach(async () => {
    await db.dropCollections();
});

afterAll(async () => {
    await db.dropDatabase();
});

/**
 * User model
 */
describe("User model", () => {
    test("create & save user successfully", async () => {
        const validNote = new Note(noteData);
        const savedNote = await validNote.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedNote._id).toBeDefined();
        expect(savedNote.noteBody).toBe(noteData.noteBody);
        expect(savedNote.title).toBe(noteData.title);
    });
})