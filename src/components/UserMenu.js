import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import PersonCircle from "./icons/PersonCircle";
import ColorCircle from "./icons/ColorCircle";
const GET_USER = gql`
    query UserById($id: ID!) {
        user(id: $id) {
            username
            color
        }
    }
`;

const SET_USER_COLOR = gql`
    mutation SetColor($id: ID!, $color: String!) {
        updateUser(id: $id, color: $color) {
            username
            color
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

const styles = {
    iconStyle: {
        cursor: "pointer",
        padding: 10,
    },
    dropMenu: {
        display: "inline-block",
        position: "absolute",
        left: "-300%",
    },
    dropText: {
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
    },
    colorsWrapper: {
        width: "210px",
        padding: 24,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    colorContainer: {
        margin: 3,
        cursor: "pointer",
    },
    colorContainerSelected: {
        border: "3px solid rgba(0, 123, 255, 0.6)",
        cursor: "pointer",
        margin: 0,
        borderRadius: "100%",
    },
};

export default function UserMenu(props) {
    const { loading, error, data, refetch } = useQuery(GET_USER, {
        variables: { id: localStorage.getItem("authUser") },
    });
    const [setUserColor] = useMutation(SET_USER_COLOR);
    const [open, setOpen] = React.useState(false);

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

    if (error) return <div>Er is iets fout gegaan...</div>;
    const logOut = () => {
        localStorage.clear();
        props.createAlert("info", "U bent uitgelogd.");
    };

    const toggleOpen = () => {
        setOpen(!open);
    };

    const handleColorClick = (clickedColor) => {
        if (clickedColor === data.user.color) return;
        setUserColor({
            variables: {
                id: localStorage.getItem("authUser"),
                color: clickedColor,
            },
        })
            .then((result) => {
                refetch();
            })
            .catch((error) => {
                console.log(error);
                props.createAlert("danger", "Er is iets fout gegaan.");
            });
    };

    const PersonIcon = () => {
        return (
            <div onClick={toggleOpen} style={styles.iconStyle}>
                {!loading && (
                    <a className="link" style={{ color: data.user.color }}>
                        <PersonCircle size={2} />
                    </a>
                )}
            </div>
        );
    };

    return (
        <div className="pr-2" style={{ position: "relative" }} ref={ref}>
            <PersonIcon />
            {open && !loading && (
                <div className="dropdown-menu" style={styles.dropMenu}>
                    <label style={styles.dropText}>
                        Ingelogd als: {data.user.username}
                    </label>
                    <button className="dropdown-item" onClick={logOut}>
                        Uitloggen
                    </button>
                    <div style={styles.colorsWrapper}>
                        {USER_COLORS.map((color, i) => {
                            return (
                                <div
                                    key={i}
                                    onClick={() => handleColorClick(color)}
                                    style={
                                        data.user.color === color
                                            ? styles.colorContainerSelected
                                            : styles.colorContainer
                                    }
                                >
                                    <ColorCircle color={color} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
