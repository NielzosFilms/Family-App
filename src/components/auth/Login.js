import React from "react";
import PasswordHash from "password-hash";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

const GET_BY_USERNAME = gql`
    query UserByUsername($username: String!) {
        userByUsername(username: $username) {
            id
            username
            password
        }
    }
`;

function Login(props) {
    const [getUserByUsername, { loading, error, data }] = useLazyQuery(
        GET_BY_USERNAME
    );

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        getUserByUsername({ variables: { username: username } });
    };

    if (loading) {
        return (
            <center>
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </center>
        );
    } else {
        if (data) {
            if (data.userByUsername) {
                if (data.userByUsername.username == username) {
                    if (
                        PasswordHash.verify(
                            password,
                            data.userByUsername.password
                        )
                    ) {
                        localStorage.setItem(
                            "authUser",
                            data.userByUsername.id
                        );
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
            }
        }
    }
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
