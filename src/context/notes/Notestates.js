import { useState } from 'react';
import NoteContext from './createcontext';


export default function Notestates(props) {

    const [alertMessage, setAlertMessage] = useState(null);
    
    const [token, setToken] = useState(()=>{
        return localStorage.getItem("token");
    });

    const [name, setName] = useState("");
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({title:"", description: "", tag: ""});
    const [newNote, setNewNote] = useState({ etitle: "", edescription: "", etag: "", noteid: ""});

    const updateAlertMessage = (message) => {
        setAlertMessage(message);
        setTimeout(() => {
            setAlertMessage(null);
        }, 2000);
    }


    const fetchAllNotes = async () => {
        const response = await fetch("http://localhost:5000/api/notes/getnotes", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        });
        const userNotes = await response.json();
        return userNotes;
    }


    const addNote = async (note, e) => {
        e.preventDefault();
        const { title, description, tag } = note;
        if (title === "" || description === "") {
            updateAlertMessage({ type: "danger", msg: "Fields cannot be empty" });
            return;
        }
        const response = await fetch("http://localhost:5000/api/notes/addnote", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body: JSON.stringify({
                title: title,
                description: description,
                tag: tag
            })
        });

        let json = await response.json();
        // console.log(json.errors[0].msg);


        if (response.status === 200) {
            const userNotes = await fetchAllNotes();
            setNotes(userNotes.notes);
            // console.log(notes);
            // setNotes(notes);
            // await setNotes(notes.push({title, description, tag}));
            updateAlertMessage({ type: "success", msg: "Note added Successfully" });
            await setNote({title: "", description: "", tag: ""});
        }
        else{
            updateAlertMessage({ type: "danger", msg:`${response.status} - ${json.errors[0].msg}`});
        }
    }


    const handleEditingNote = async (newNote) => {
        const { etitle, edescription, etag, noteid } = newNote;
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${noteid}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body: JSON.stringify({
                title: etitle,
                description: edescription,
                tag: etag
            })
        });
        if (response.status === 200) {
            const userNotes = await fetchAllNotes();
            setNotes(userNotes.notes);
            updateAlertMessage({ type: "success", msg: "Note has been updated" });
        }
    }

    const deleteNote = async (noteid) => {
        // console.log(noteid);
        let choice = window.confirm("Do you want to delete your note? Press ok to delete.");
        if (choice) {
            const response = await fetch(`http://localhost:5000/api/notes/deletenote/${noteid}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            });
            // console.log(response.status);
            if (response.status === 200) {
                // const userNotes = await fetchAllNotes();
                // setNotes(userNotes.notes);
                updateAlertMessage({ type: "success", msg: "Note has been deleted" });
            }
        }
        else {
            return;
        }
    }


    return (
        <NoteContext.Provider value={{ alertMessage, updateAlertMessage, note, setNote, token, setToken, name, setName, addNote, notes, setNotes, deleteNote, handleEditingNote, fetchAllNotes, newNote, setNewNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
