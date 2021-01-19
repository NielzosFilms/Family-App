import React from "react";
import GroceryList from "./GroceryList";
import GroceryForm from "./GroceryForm";
import { gql, useQuery } from "@apollo/client";
import Divider from "../icons/Divider";
import Spinner from "../icons/Spinner";

const GET_GROCERIES = gql`
    query getGroceries($name: String!) {
        groceries(name: $name) {
            id
            name
            amount
            checked
            user {
                username
            }
            updated_by_user {
                username
            }
        }
    }
`;

export default function Lijst(props) {
    const [timer, setTimer] = React.useState(null);
    const [filtered, setFiltered] = React.useState(false);
    const [name, setName] = React.useState("");
    const { loading, error, data, refetch } = useQuery(GET_GROCERIES, {
        variables: { name: "" },
    });

    if (error) console.log(error);

    React.useEffect(() => {
        if (timer) clearTimeout(timer);
        setTimer(
            setTimeout(() => {
                refetch({
                    name: name ? name : "",
                });
            }, 100)
        );
    }, [name]);

    return (
        <div className="p-3">
            {/* <h2 style={{ display: "inline-block" }}>Boodschappen Lijst</h2> */}
            {/* <Divider /> */}
            {!loading ? (
                <div>
                    {data ? (
                        <div>
                            {name && (
                                <div className="text-primary">--Filtered--</div>
                            )}
                            <GroceryList
                                refetch={refetch}
                                createAlert={props.createAlert}
                                groceries={data.groceries}
                            />
                            {/* <Divider /> */}
                            <GroceryForm
                                setName={setName}
                                setFiltered={setFiltered}
                                refetch={refetch}
                                createAlert={props.createAlert}
                            />
                        </div>
                    ) : (
                        <div>Geen data gevonden.</div>
                    )}
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
}
