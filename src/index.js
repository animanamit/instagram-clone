import "./wdyr"; // <--- first import

import "react-hot-loader";
import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/app.css";

import FirebaseContext from "./context/firebase";
import { FieldValue, firebase } from "./lib/firebase";

const HotApp = hot(App);

// wrap the app in a firebase context provider so that the entire app has access to firebase
ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <HotApp />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
