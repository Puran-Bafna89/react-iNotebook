import { useContext } from "react";
import noteContext from "../context/notes/createcontext";

export default function Alert() {
    const contextValue = useContext(noteContext);
    const alertMessage = contextValue.alertMessage;
    const alertStyle = {
        height: "60px",
        marginTop: "60px",
        position: "sticky",
        top: "55px",
        zIndex: alertMessage ? "1" : "-1"
    }
    return (
        <div style={alertStyle}>
            {alertMessage && <div className={`alert alert-${alertMessage.type} rounded-bottom`} role="alert">
                {alertMessage.msg}
            </div>}
        </div>
    )
}
