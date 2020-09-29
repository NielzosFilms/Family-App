import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
    query UserById($id: ID!) {
        user(id: $id) {
            username
        }
    }
`;

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
        props.update();
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

    const PersonIcon = () => {
        return (
            <div onClick={toggleOpen} style={iconStyle}>
                <a className="link text-light">
                    <svg
                        width="2em"
                        height="2em"
                        viewBox="0 0 16 16"
                        className="bi bi-person-circle"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                        <path
                            fillRule="evenodd"
                            d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                        />
                        <path
                            fillRule="evenodd"
                            d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                        />
                    </svg>
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
                </div>
            )}
        </div>
    );
}
