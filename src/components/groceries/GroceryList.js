import React from "react";
import Grocery from "./Grocery";

export default function GroceryList({ createAlert, groceries, refetch }) {
    return (
        <div>
            <ul className="list-group">
                {groceries.length == 0 && (
                    <li className="list-group-item clear-fix">
                        Geen resultaten gevonden.
                    </li>
                )}
                {groceries.map((item) => {
                    return (
                        <Grocery
                            key={item.id}
                            refetch={refetch}
                            createAlert={createAlert}
                            grocery={item}
                        />
                    );
                })}
            </ul>
        </div>
    );
}
