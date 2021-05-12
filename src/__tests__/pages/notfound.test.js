import React from "react";
import { render, waitFor } from "@testing-library/react";
import Header from "../../components/post/header";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import NotFound from "../../pages/notfound";
import { BrowserRouter as Router } from "react-router-dom";
import { getUserByUserId } from "../../services/firebase";
import { act } from "react-dom/test-utils";

import userFixture from "../../fixtures/logged-in-user";

jest.mock("../../services/firebase");

describe("<NotFound />", () => {
  it("renders the not found page with a logged in user", async () => {
    await act(async () => {
      await getUserByUserId.mockImplementation(() => [userFixture]);

      const { queryByText, debug } = render(
        <Router>
          <FirebaseContext.Provider value={{}}>
            <UserContext.Provider value={{ user: { uid: 1 } }}>
              <NotFound />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      await waitFor(() => {
        expect(queryByText("Log In")).toBeFalsy();
        expect(queryByText("Not Found!")).toBeTruthy();
      });
    });
  });

  it("renders the not found page without a logged in user", async () => {
    await act(async () => {
      await getUserByUserId.mockImplementation(() => []);

      const { queryByText } = render(
        <Router>
          <FirebaseContext.Provider value={{}}>
            <UserContext.Provider value={{ user: {} }}>
              <NotFound />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      await waitFor(() => {
        expect(queryByText("Not Found!")).toBeTruthy();
      });
    });
  });
});
