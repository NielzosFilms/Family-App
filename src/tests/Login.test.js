import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, create } from "react-test-renderer";
import PasswordHash from "password-hash";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";

import Login from "../components/auth/Login";

const GET_BY_USERNAME = gql`
    query UserByUsername($username: String!) {
        userByUsername(username: $username) {
            id
            username
            password
        }
    }
`;

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
}

/*let container = null;
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
});*/

it("Can login", async () => {
    const passwordNotHashed = "The Blade Dancer";
    const fakeUser = {
        userByUsername: {
            id: "1",
            username: "Irelia Xan",
            password: PasswordHash.generate("The Blade Dancer").toString(),
        },
    };
    const userMock = {
        request: {
            query: GET_BY_USERNAME,
            variables: {
                username: fakeUser.userByUsername.username,
            },
        },
        result: {
            data: fakeUser,
        },
    };

    global.localStorage = new LocalStorageMock();

    let component;
    act(() => {
        component = create(
            <MockedProvider mocks={[userMock]} addTypename={false}>
                <Login createAlert={jest.fn()} />
            </MockedProvider>
        );
    });

    //root.findByType("form").props.onSubmit();
    const root = component.root;
    await act(async () => {
        //const e = { preventDefault: jest.fn() };
        //await root.findByType("form").props;
        const e = { target: { value: fakeUser.userByUsername.username } };
        await root.findByProps({ type: "text" }).props.onChange(e);

        const e2 = { target: { value: passwordNotHashed } };
        await root.findByProps({ type: "password" }).props.onChange(e2);
    });
    await act(async () => {
        const e = { preventDefault: jest.fn() };
        await root.findByType("form").props.onSubmit(e);
    });

    expect(global.localStorage.getItem("authUser")).toBe(
        fakeUser.userByUsername.id
    );
});
