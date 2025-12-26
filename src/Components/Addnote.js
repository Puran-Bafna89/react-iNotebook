import { useContext } from "react";
import noteContext from "../context/notes/createcontext";

export default function Addnote() {
    const context = useContext(noteContext);
    const { addNote, handleEditingNote, newNote, setNewNote, note, setNote } = context;

    // const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const onValueChange = (e) => {
        setNewNote({...newNote, [e.target.name]: e.target.value})
    }

    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit your note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={newNote.etitle} onChange={onValueChange} aria-describedby="emailHelp" autoComplete="true" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={newNote.edescription} onChange={onValueChange} autoComplete="true" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" autoComplete="true" name="etag" value={newNote.etag} onChange={onValueChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{handleEditingNote(newNote)}}>Edit</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="my-4">Add Your Note</h2>

            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} aria-describedby="emailHelp" autoComplete="true" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.description} onChange={onChange} name="description" id="description" autoComplete="true" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.tag} onChange={onChange} id="tag" name="tag" autoComplete="true" />
                </div>
                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                <button type="submit" className="btn btn-primary" onClick={(e) => { addNote(note, e) }}>Add Note</button>
            </form>
        </>
    )
}
