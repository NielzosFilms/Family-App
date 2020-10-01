import React from "react";
import PasswordHash from "password-hash";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import Divider from "../icons/Divider";
import Spinner from "../icons/Spinner";

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
    if (error) console.log(error);
    const [submit, setSubmit] = React.useState(false);

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        getUserByUsername({ variables: { username: username } });
    };

    if (loading) {
        return <Spinner />;
    } else {
        try {
            if (data && submit) {
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
                            setSubmit(false);
                            props.createAlert(
                                "success",
                                "Ingelogd met gebruiker: " + username
                            );
                        } else {
                            throw "Gebruikersnaam of wachtwoord verkeerd!";
                        }
                    } else {
                        throw "Gebruikersnaam of wachtwoord verkeerd!";
                    }
                } else {
                    throw "Gebruikersnaam of wachtwoord verkeerd!";
                }
            }
        } catch (e) {
            setSubmit(false);
            props.createAlert("danger", e);
        }
    }
    return (
        <div className="p-3">
            <h2>Login</h2>
            <Divider />
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
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Wachtwoord</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
