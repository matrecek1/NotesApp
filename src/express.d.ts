import { Pages } from "./middleware/notes/pages"
declare namespace Express {
    export interface Request {
        pages?: Pages
    }
}