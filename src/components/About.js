import React from "react";

export default function About(props) {
    return (
        <div className="p-3" style={{ overflow: "hidden" }}>
            <h1 className="display-2">Family App</h1>
            <div className="dropdown-divider mb-4"></div>
            <p>
                Dit project is gemaakt door{" "}
                <a href="https://github.com/nielzosfilms" target="_blank">
                    NielzosFilms
                </a>
                .
            </p>
            <h3>Gebruikte Libraries</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-transparent">
                    <a href="https://reactjs.org/" target="_blank">
                        React Javascript
                    </a>
                </li>
                <li class="list-group-item bg-transparent">
                    <a href="https://graphql.org/" target="_blank">
                        GraphQL
                    </a>
                </li>
                <li class="list-group-item bg-transparent">MySQL Database</li>
            </ul>
            <div className="dropdown-divider mb-4"></div>
            <h3>Github Repository</h3>
            <a
                href="https://github.com/NielzosFilms/Family-App"
                className="pr-5"
                target="_blank"
            >
                Family-App
            </a>
            <div className="dropdown-divider mb-4"></div>
            <div>
                <h3>Developer</h3>
                <p>
                    <a href="https://github.com/nielzosfilms" target="_blank">
                        NielzosFilms
                    </a>
                </p>
            </div>
        </div>
    );
}
