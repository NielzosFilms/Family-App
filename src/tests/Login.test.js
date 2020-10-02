import React from "react";
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

it("Can login", async () => {
    const password = "The Blade Dancer";
    const fakeUser = {
        userByUsername: {
            id: 1,
            username: "Irelia Xan",
            password: PasswordHash.generate(password).toString(),
        },
    };
    const getUserMock = {
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
            <MockedProvider mocks={[getUserMock]} addTypename={false}>
                <Login createAlert={jest.fn()} />
            </MockedProvider>
        );
    });

    const root = component.root;
    await act(async () => {
        const input_e = { target: { value: fakeUser.userByUsername.username } };
        await root.findByProps({ type: "text" }).props.onChange(input_e);

        const password_e = { target: { value: password } };
        await root.findByProps({ type: "password" }).props.onChange(password_e);
    });
    await act(async () => {
        const form_e = { preventDefault: jest.fn() };
        await root.findByType("form").props.onSubmit(form_e);
    });

    expect(parseInt(global.localStorage.getItem("authUser"))).toBe(
        fakeUser.userByUsername.id
    );
});
