import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import ejsMate from 'ejs-mate';
import path from 'path';
import methodOverride from 'method-override';

import notesRoutes from './routes/notes'

const app = express();
const port = '3000'

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/notesapp');
    console.log("Connected to db");
}
app.engine("ejs", ejsMate)
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", 'ejs')

app.use(express.urlencoded())
app.use(express.json())
app.use(methodOverride('_method'))
app.use("/notes", notesRoutes)
app.use(express.static(path.join(__dirname, 'public')))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).render("error", { err })
})


app.listen(port, () => {
    console.log(`Listening on port ${port}, Url: http://localhost:${port}`);
});