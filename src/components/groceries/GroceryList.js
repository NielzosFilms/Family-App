import React from "react";
import Grocery from "./Grocery";

export default function GroceryList({ createAlert, groceries, refetch }) {
    return (
        <div>
            <ul className="list-group">
                {groceries.map((item) => {
                    return (
                        <Grocery
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
