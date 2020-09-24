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

export default function GroceryForm(props) {
    const [addGrocery] = useMutation(ADD_GROCERY);

    const [amount, setAmount] = React.useState();
    const [name, setName] = React.useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name == null) {
            props.createAlert("danger", "Geen product naam gegeven.");
            return;
        }

        addGrocery({ variables: { name, amount: parseInt(amount) } })
            .then((result) => {
                setAmount("");
                setName("");
                props.refetch();
            })
            .catch((error) => {
                console.log(error);
                props.createAlert("danger", "Er is iets fout gegaan.");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Item toevoegen</h4>
            <div className="form-group">
                <div className="form-row">
                    <div className="col-2">
                        <input
                            type="number"
                            min="1"
                            max="99"
                            placeholder="Aantal"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="col-9">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Product"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-primary w-100">
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
                </div>
            </div>
        </form>
    );
}