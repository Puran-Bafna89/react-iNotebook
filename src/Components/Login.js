import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/createcontext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const contextValue = useContext(noteContext);
    const {updateAlertMessage, setToken, setName} = contextValue;
    // const [token, setToken] = useState("");
    let navigate = useNavigate();
    // let token = "";

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const verifyLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            updateAlertMessage({type:"danger", msg:"Fields cannot be empty"});
            return;
        }
        // console.log(email, password);
        try {

            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if(response.status !== 200){
                updateAlertMessage({type:"danger", msg:"Invalid Credentials"});
                return;
            }

            const tokenObject = await response.json();
            let tokenValue = tokenObject.token;
            let userName = tokenObject.user;
            // console.log(await token.json());
            // console.log(tokenValue);
            localStorage.setItem("token", tokenValue);
            await setToken(tokenValue);
            // console.log(tokenValue);
            await setName(userName);
            navigate('/');
        } catch (error) {
            console.log({ message: error.message });
        }
    }

    return (
        <>
            <h1 className="my-4">Login to iNotebook</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={handleEmail} aria-describedby="emailHelp" autoComplete="true" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={handlePassword} autoComplete="true" id="password" required />
                </div>
                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                <button type="submit" className="btn btn-primary" onClick={verifyLogin}>Login</button>
            </form>
            <span className="sign">New to iNotebook? - <NavLink type="button" to="/signup">Join now</NavLink></span>
        </>
    )
}
