import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import moment from "moment";

import Vandaag from "../components/Vandaag";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders correctly", () => {
    act(() => {
        render(<Vandaag />, container);
    });
    expect(container.textContent).toBe(
        `Vandaag${moment().format("D-MM-YYYY")}Nothing here yet :)`
    );
});
