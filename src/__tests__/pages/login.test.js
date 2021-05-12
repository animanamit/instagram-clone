import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useHistory } from "react-router-dom";
import Login from "../../pages/login";
import FirebaseContext from "../../context/firebase";
import { BrowserRouter as Router } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe("<Login />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders the login page and logs the user in", async () => {
    const succeededToLogin = jest.fn(() => Promise.resolve("I am signed in!"));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeededToLogin
      }))
    };
    expect(1).toEqual(1);
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "karl@gmail.com" }
      });

      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "123" }
      });

      fireEvent.submit(getByTestId("login"));

      expect(succeededToLogin).toHaveBeenCalled();
      expect(succeededToLogin).toHaveBeenCalledWith("karl@gmail.com", "123");

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText("Email address").value).toBe(
          "karl@gmail.com"
        );
        expect(getByPlaceholderText("Password").value).toBe("123");
        expect(queryByTestId("error")).toBeFalsy();
      });
    });
  });

  it("renders the login page and fails to log the user in", async () => {
    const failToLogin = jest.fn(() =>
      Promise.reject(new Error("I am not signed in!"))
    );
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: failToLogin
      }))
    };
    expect(1).toEqual(1);
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "karl.com" }
      });

      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "123" }
      });

      fireEvent.submit(getByTestId("login"));

      expect(failToLogin).toHaveBeenCalled();
      expect(failToLogin).toHaveBeenCalledWith("karl.com", "123");

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText("Email address").value).toBe("");
        expect(getByPlaceholderText("Password").value).toBe("");
        expect(queryByTestId("error")).toBeTruthy();
      });
    });
  });
});
