import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PasswordHash from "password-hash";

import Login from "../components/auth/Login";

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

it("can login", async () => {
    const fakeUser = {
        id: 1,
        username: "Irelia Xan",
        password: PasswordHash.generate("The Blade Dancer"),
        color: "#ffffff",
    };
    const mock = jest.fn().mockImplementation(() => {
        return {
            getUserByUsername: () =>
                Promise.resolve({
                    data: fakeUser,
                }),
        };
    });
    /*const mock = jest.fn().mockImplementation(() =>
    Promise.resolve({
        data: fakeUser,
    })
    );*/
    jest.spyOn(mock(), "getUserByUsername");

    await act(async () => {
        render(<Login />, container);
    });
    /*const submitBtn = document.querySelector("button");

    await act(async () => {
        submitBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });*/

    //console.log(await mock().getUserByUsername());

    //expect(container.textContent).toBe(await mock());
});
