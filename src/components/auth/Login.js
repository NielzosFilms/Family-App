import React from "react";
import { useHistory } from "react-router-dom";
import PasswordHash from "password-hash";

function Login(props) {
    const history = useHistory();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        //console.log(PasswordHash.verify(password, db_pass));
        //console.log(PasswordHash.generate(password));

        //check login
        /*localStorage.setItem("authUser", 1);
        props.update();*/
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
