import React from "react";
import { getBoodschappen, setChecked } from "../queries/boodschappen";

function Lijst() {
    const [boodschappen, setBoodschappen] = React.useState();

    React.useEffect(() => {
        async function fetchItems() {
            const result = await getBoodschappen();
            setBoodschappen(result);
        }
        if (!boodschappen) fetchItems();
    });

    const handleCheck = async (e) => {
        const promise = await setChecked(
            parseInt(e.target.id) + 1,
            e.target.checked
        );
        const result = await getBoodschappen();
        setBoodschappen(result);
    };

    console.log(boodschappen);

    return (
        <div className="p-3">
            <h2>Bootschappen Lijst</h2>
            <div className="dropdown-divider"></div>
            {boodschappen ? (
                <ul className="list-group">
                    {boodschappen.map((item, i) => {
                        return (
                            <li className="list-group-item" key={i}>
                                <input
                                    type="checkbox"
                                    id={i}
                                    checked={
                                        item.checked == "true" ? true : false
                                    }
                                    onChange={(e) => handleCheck(e)}
                                />
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <center>
                    <div
                        className="spinner-border text-secondary"
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </center>
            )}
        </div>
    );
}

export default Lijst;
