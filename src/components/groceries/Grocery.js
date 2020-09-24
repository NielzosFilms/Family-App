import React from "react";
import { gql, useMutation } from "@apollo/client";

const DELETE_GROCERY = gql`
    mutation DeleteGrocery($id: ID!) {
        deleteGrocery(id: $id) {
            numUids
        }
    }
`;

const UPDATE_CHECK_GROCERY = gql`
    mutation UpdateGrocery($id: ID!, $checked: Boolean) {
        updateGrocery(id: $id, checked: $checked) {
            name
            checked
        }
    }
`;

export default function Grocery({ createAlert, grocery, refetch }) {
    const [deleteGrocery] = useMutation(DELETE_GROCERY);
    const [updateCheckGrocery] = useMutation(UPDATE_CHECK_GROCERY);

    const handleCheck = async (e) => {
        updateCheckGrocery({
            variables: { id: grocery.id, checked: e.target.checked },
        })
            .then((result) => {
                refetch();
            })
            .catch((error) => {
                console.log(error);
                createAlert("danger", "Er is iets fout gegaan.");
            });
    };

    const handleClick = async () => {
        deleteGrocery({ variables: { id: grocery.id } })
            .then((result) => {
                refetch();
            })
            .catch((error) => {
                console.log(error);
                createAlert("danger", "Er is iets fout gegaan.");
            });
    };

    const grocery_text =
        grocery.amount > 1
            ? `${grocery.amount} x ${grocery.name}`
            : grocery.name;

    return (
        <li className="list-group-item clear-fix" key={grocery.id}>
            <div className="float-left">
                <input
                    type="checkbox"
                    checked={grocery.checked}
                    onChange={(e) => handleCheck(e)}
                />
                <label
                    className={grocery.checked ? "text-muted" : ""}
                    style={{ paddingLeft: "10px" }}
                >
                    {grocery.checked ? (
                        <s>{grocery_text}</s>
                    ) : (
                        <label>{grocery_text}</label>
                    )}
                </label>
            </div>
            <div className="float-right">
                <button className="btn btn-danger" onClick={handleClick}>
                    <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-trash-fill"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                        />
                    </svg>
                </button>
            </div>
        </li>
    );
}
