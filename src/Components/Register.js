import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/createcontext";


export const Register = () => {
    let navigate = useNavigate();
    
    const context = useContext(noteContext);
    const { updateAlertMessage } = context;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (r) => {
        setPassword(r.target.value);
    }

    const signup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/createuser',{
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password })
            });

            let json = await response.json();

            if(response.status !== 200){
                if(json.errors){
                    updateAlertMessage({type: "danger", msg: json.errors[0].msg});
                    return;
                }
                else if(json) {
                    updateAlertMessage({type: "danger", msg: json.Error});
                    // console.log(json.Error);
                    return;
                }
                else{
                    return;
                }
            }
            else{
                updateAlertMessage({type: "success", msg: "Now you can login..."});
                // console.log(json.token);
                localStorage.setItem("token", json.token);
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1 className="my-4">Signup to use iNotebook</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={handleName} aria-describedby="emailHelp" autoComplete="true" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={handleEmail} aria-describedby="emailHelp" autoComplete="true" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={handlePassword} autoComplete="true" id="password" required />
                </div>
                <button type="submit" className="btn btn-primary" onClick={signup}>Signup</button>
            </form>
            <span className="sign">Already Registered? - <NavLink type="button" to="/login">Login</NavLink></span>
        </>
    )
}
