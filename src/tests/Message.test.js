import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Message from "../components/Message";

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

it("shows data correcly", () => {
    const type = "success";
    const message = "Test message";
    act(() => {
        render(<Message type={type} message={message} />, container);
    });
    expect(container.textContent).toBe(`${message}×`);
    expect(container.querySelector("[id='message']").className).toBe(
        `shadow alert alert-${type}`
    );
});
