import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import Dashboard from "../../pages/dashboard";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";

describe("<Dashboard />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("");
});
