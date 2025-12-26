import { useContext } from "react";
import noteContext from "../context/notes/createcontext";

const Noteitem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const { deleteNote, setNewNote } = context;

    const myStyle = {
        // border: "1px solid grey",
        borderRadius: "15px",
        padding: "10px",
        // flexGrow: "1",
        boxShadow: "0px 0px 5px #3a2b2b",
        position: "relative",
        height: "100%"
    }

    const cardIcons = {
        display: "flex",
        position: "absolute",
        right: "10px",
        top: "10px",
        cursor: "pointer"
    }



    const editNote = async (note, noteid) => {
        await setNewNote({etitle: note.title, edescription: note.description, etag: note.tag, noteid: noteid});
    }



    return (
        <div className="col-md-3 mb-3 note-card">
            <div className="" style={myStyle}>
                <div>
                    <h4 style={{ color: "#20856e" }}>{note.title}</h4>
                    <p>{note.description}</p>
                    <span>{note.tag}</span>
                    <div className="icons" style={cardIcons}>
                        <i className="me-2 fa fa-edit" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { editNote(note, note._id) }}></i>
                        <i className="fa fa-trash me-2" onClick={() => { deleteNote(note._id) }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;
