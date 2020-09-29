import React from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_GROCERY = gql`
    mutation CreateGrocery($name: String!, $amount: Int) {
        createGrocery(name: $name, amount: $amount) {
            id
            name
            checked
        }
    }
`;

const amountStyle = {
    width: "calc(25% - 10px)",
    minWidth: 100,
    margin: 5,
};

const productStyle = {
    width: "calc(75% - 10px)",
    margin: 5,
};

const submitStyle = {
    width: "calc(25% - 10px)",
    margin: 5,
};

export default function GroceryForm(props) {
    const [addGrocery] = useMutation(ADD_GROCERY);

    const [amount, setAmount] = React.useState();
    const [name, setName] = React.useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === null || name === "") {
            props.createAlert("danger", "Geen product naam gegeven.");
            return;
        }

        addGrocery({ variables: { name, amount: parseInt(amount) } })
            .then((result) => {
                setAmount("");
                setName("");
                props.refetch();
                props.createAlert("info", `"${name}" toegevoegd.`);
            })
            .catch((error) => {
                console.log(error);
                props.createAlert("danger", "Er is iets fout gegaan.");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Item toevoegen</h4>
            <div className="form-row d-flex flex-row">
                <input
                    style={amountStyle}
                    type="number"
                    min="1"
                    max="99"
                    placeholder="Aantal"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    style={productStyle}
                    type="text"
                    className="form-control"
                    placeholder="Product"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={submitStyle}
                >
                    <svg
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 16 16"
                        className="bi bi-plus"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}
