import axios from "axios";
import qs from "querystring";

const config = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
};

export async function getBoodschappen() {
    return await axios
        .get("http://localhost:4000/boodschappen")
        .then((response) => {
            return response.data;
        });
}

export async function getBoodschappenById(id) {
    return await axios
        .get("http://localhost:4000/boodschappen/" + id)
        .then((response) => {
            return response.data;
        });
}

export async function setChecked(id, val) {
    let item = await getBoodschappenById(id);
    item.checked = val;

    return await axios
        .put(
            "http://localhost:4000/boodschappen/" + id,
            qs.stringify(item),
            config
        )
        .then((result) => {
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
}
