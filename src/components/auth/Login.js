import React from "react";
import PasswordHash from "password-hash";

import { getUserByUsername } from "../../queries/user";

function Login(props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const found_user = await getUserByUsername(username);
        if (found_user) {
            if (PasswordHash.verify(password, found_user.password)) {
                localStorage.setItem("authUser", found_user.id);
                props.update();
            } else {
                props.createAlert(
                    "danger",
                    "Gebruikersnaam of wachtwoord verkeerd!"
                );
            }
        } else {
            props.createAlert(
                "danger",
                "Gebruikersnaam of wachtwoord verkeerd!"
            );
        }
    };

    return (
        <div className="p-3">
            <h2>Login</h2>
            <div className="dropdown-divider"></div>
            <form onSubmit={handleSubmit} style={{ overflow: "hidden" }}>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                        Gebruikersnaam
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Wachtwoord</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <a href="/new/user">Nieuw account</a>
                <button type="submit" className="btn btn-primary float-right">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Login;
