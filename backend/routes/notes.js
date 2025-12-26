const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
// const User = require('../models/User');
const Notes = require('../models/Notes');
const {body, validationResult} = require("express-validator");

// Route 1: This route is used to fetch all notes of the user.
router.get('/getnotes', fetchuser, async(req,res)=>{
    try{
        let id = req.user.id;
        // console.log("Inside", req.user.id);
        const notes = await Notes.find({userid: id});
        if(notes.length === 0){
            return res.json({Message: "No notes in the database"});
        }
        return res.json({notes});
    } catch(error){
        return res.status(500).json({Error: "Internal server error."});
    }
});


// Route 2: This route is used to add a note in to the data base user.
router.post('/addnote', fetchuser, [
    body('title', 'Title should be more then 5 characters').isLength({min:5}),
    body('description', 'Description should be more then 10 characters long').isLength({min: 10})
], async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{

        const note = new Notes({userid: req.user.id, title: req.body.title, description: req.body.description, tag: req.body.tag});
        note.save();
        res.json({note});
    } catch(error){
        return res.status(500).json({Error: "Internal server error."});
    }
});


// Router 3 : This router will update an existing note of an authorized user.

router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    let newNote = {};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {title, description, tag} = req.body;
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        // console.log(req.params.id);
        const note = await Notes.findById(req.params.id);
        // console.log(note);
        if(!note){
            return res.json({Warning: "Note does not exists."});
        }
        // console.log(note.userid.toString(), req.user.id);
        if(note.userid.toString() !== req.user.id){
            return res.status(401).json({Message: "You are not autorized to edit this note."});
        }

        const updatednote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({updatednote});
    } catch(error){
        // console.log(error);
        return res.status(500).json({Error: "Internal server error."});
    }
});


// Router 3 : This router will update an existing note of an authorized user.

router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try{
        const noteId = req.params.id;
        // console.log(noteId);
        const note = await Notes.findById(noteId);
        // console.log(note);
        if(!note){
            return res.json({Warning: "Note does not exists."});
        }
        // console.log(note.userid.toString(), req.user.id);
        if(note.userid.toString() !== req.user.id){
            return res.status(401).json({Message: "You are not autorized to delete this note."});
        }

        const updatednote = await Notes.findByIdAndDelete(id = noteId);
        // console.log(updatednote);
        res.send("Note has been deleted");
    } catch(error){
        // console.log(error);
        return res.status(500).json({Error: "Internal server error."});
    }
});




module.exports = router;