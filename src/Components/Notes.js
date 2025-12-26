import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/createcontext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, name, setNotes, fetchAllNotes, token } = context;
    let navigate = useNavigate();

    useEffect(() => {
        if(!token){
            navigate('/login');
            return;
        }
        (async () => {
            const userNotes = await fetchAllNotes();
            setNotes(userNotes.notes)
        })();
        // eslint-disable-next-line
    }, [notes]);

    return (
        <>
        <Addnote />
        <h2 className="my-4" style={{ color: "#166e5a" }}>{name} Notes</h2>
            <div className="row mb-4">
                <p>{!notes ? "No notes to display" : ""}</p>
                {notes && notes.map((note, index) => {
                    return <Noteitem className="mx-2" key={index} note={note} />
                })}
            </div>
        </>
    )
}
