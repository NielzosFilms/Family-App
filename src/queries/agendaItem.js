import axios from "axios";
import qs from "querystring";

const config = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
};

export async function getItems() {
    return await axios
        .get("http://localhost:4000/agendaItems")
        .then((response) => {
            return response.data;
        });
}

export async function getItemById(id) {
    return await axios
        .get("http://localhost:4000/agendaItems/" + id)
        .then((response) => {
            return response.data;
        });
}
