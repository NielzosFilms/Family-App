import axios from "axios";
import qs from "querystring";

const config = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
};

export async function addUser(username, password) {
    const body = {
        username,
        password,
    };
    return await axios
        .post("http://localhost:4000/users", qs.stringify(body), config)
        .then((result) => {
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
}

export async function checkIfUsernameExists(username) {
    let data = await axios
        .get("http://localhost:4000/users")
        .then((response) => {
            return response.data;
        });
    let result = false;
    data.forEach((user) => {
        if (username === user.username) {
            result = true;
        }
    });
    return result;
}

export async function getUserByUsername(username) {
    let users = await axios
        .get("http://localhost:4000/users")
        .then((response) => {
            return response.data;
        });
    let user = null;
    users.forEach((tmp) => {
        if (tmp.username == username) {
            user = tmp;
        }
    });
    return user;
}

export async function getUserById(id) {
    return await axios
        .get("http://localhost:4000/users/" + id)
        .then((response) => {
            return response.data;
        });
}
