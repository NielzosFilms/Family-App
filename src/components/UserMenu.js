import React from "react";
import { gql, useQuery } from "@apollo/client";
import PersonCircle from "./icons/PersonCircle";
import ColorCircle from "./icons/ColorCircle";
import { getEditorFlex } from "graphql-playground-react";

const GET_USER = gql`
    query UserById($id: ID!) {
        user(id: $id) {
            username
        }
    }
`;

const USER_COLORS = [
    "#FFC312",
    "#C4E538",
    "#12CBC4",
    "#FDA7DF",
    "#ED4C67",

    "#F79F1F",
    "#A3CB38",
    "#1289A7",
    "#D980FA",
    "#B53471",

    "#EE5A24",
    "#009432",
    "#0652DD",
    "#9980FA",
    "#833471",

    "#EA2027",
    "#006266",
    "#1B1464",
    "#5758BB",
    "#6F1E51",
];

export default function UserMenu(props) {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id: localStorage.getItem("authUser") },
    });
    const [open, setOpen] = React.useState(false);

    if (error) console.log(error);

    const ref = React.useRef(null);
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const logOut = () => {
        localStorage.clear();
        props.createAlert("info", "U bent uitgelogd.");
    };

    const toggleOpen = () => {
        setOpen(!open);
    };

    const iconStyle = {
        cursor: "pointer",
        padding: 10,
    };

    const dropMenu = {
        display: "inline-block",
        position: "absolute",
        left: "-100%",
    };
    const dropText = {
        display: "block",
        width: "100%",
        padding: "0.25rem 1.5rem",
        clear: "both",
        fontWeight: 400,
        color: "#212529",
        textAlign: "inherit",
        whiteSpace: "nowrap",
        backgroundColor: "transparent",
        border: 0,
    };

    const colorWrapper = {
        width: "220px",
        padding: 24,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    };

    const PersonIcon = () => {
        return (
            <div onClick={toggleOpen} style={iconStyle}>
                <a className="link text-light">
                    <PersonCircle size={2} />
                </a>
            </div>
        );
    };

    return (
        <div className="pr-5" style={{ position: "relative" }} ref={ref}>
            <PersonIcon />
            {open && (
                <div className="dropdown-menu" style={dropMenu}>
                    {!loading && (
                        <label style={dropText}>
                            Ingelogd als: {data.user.username}
                        </label>
                    )}
                    <button className="dropdown-item" onClick={logOut}>
                        Uitloggen
                    </button>
                    <div style={colorWrapper}>
                        {USER_COLORS.map((color, i) => {
                            return (
                                <div>
                                    <ColorCircle key={i} color={color} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
