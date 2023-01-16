import { getSorters} from '../../src/utils/getSorters';
import { INote } from '../../src/models/notes';
const note1: INote = {
    title: "Note",
    noteBody: "This is note body",
    dateOfCreation: new Date(),
    category: "Category",
    tags: ["Tag1", "tag2", 'tag3']
}

const note2: INote = {
    title: "Note2",
    noteBody: "This is note body",
    dateOfCreation: new Date(),
    category: "Category2",
    tags: ["Tag5", "tag6", 'tag2']
}
const notesArray = [note1, note2, note1];
const sorters = getSorters(notesArray);
test('Test sorting of sorter func', () => {
    expect(sorters.categories.length).toBe(2)
    expect(sorters.tags.length).toBe(5)
    expect(sorters.categories).toStrictEqual(["Category", "Category2"])
    expect(sorters.tags).toStrictEqual(["Tag1", "tag2", "tag3", "Tag5", "tag6"])
})
