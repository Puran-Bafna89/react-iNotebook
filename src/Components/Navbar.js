import { useContext, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/createcontext";

export default function Navbar() {
    let location = useLocation();
    const contextValue = useContext(noteContext);
    const { token, setToken, setNote } = contextValue;
    let navigate = useNavigate();

    const logoutButton = () => {
        localStorage.removeItem("token");
        setToken("");
        setNote({title: "", description: "", tag: ""});
        navigate("/login");
    }

    useEffect(() => {
        if (location.pathname === "/login") {
            setToken("");
        }
        // eslint-disable-next-line
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/about">About</NavLink>
                        </li>

                    </ul>
                    <div>{!token ? "" : <button className="btn btn-primary" type="button" onClick={logoutButton}>Logout</button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}
