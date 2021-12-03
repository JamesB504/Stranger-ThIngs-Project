import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Register } from "./components";

const App = () => {
  return (
    <>
      <h1>Stranger's Things</h1>

      <Route path="/register">
        <Register />
      </Route>
    </>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
