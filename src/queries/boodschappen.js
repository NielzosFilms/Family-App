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

export async function removeItem(id) {
	let items = await getBoodschappen();
	items.forEach((item) => {
		delete item.id;
	});
	return await axios
		.delete("http://localhost:4000/boodschappen/" + id)
		.then((result) => {
			return true;
		})
		.catch((error) => {
			console.log(error);
			return false;
		});
}

export async function addItem(name, amount) {
	const body = {
		name,
		amount,
		checked: "false",
	};
	return await axios
		.post("http://localhost:4000/boodschappen", qs.stringify(body), config)
		.then((result) => {
			return true;
		})
		.catch((error) => {
			console.log(error);
			return false;
		});
}
