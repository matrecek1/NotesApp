import { Schema, model } from "mongoose";
import { INote } from "./notes";
import passportLocalMongoose from 'passport-local-mongoose';


const userSchema = new Schema({
    notes: {
        type: [{type: Schema.Types.ObjectId, ref: 'Note'}],
    }
})
userSchema.plugin(passportLocalMongoose)

export const User = model('User', userSchema)

