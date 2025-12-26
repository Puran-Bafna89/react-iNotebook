// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

let Notes = mongoose.model("Notes", NotesSchema);
module.exports = Notes;