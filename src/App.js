import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

//Pages
import home from "./pages/home";
import blog from "./pages/blog";

axios.defaults.baseURL = "https://testblogbackendyuma.herokuapp.com";

function App() {
  return (
    <Router basename="/testblogyuma">
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/blog/:blogId" component={blog} />
      </Switch>
    </Router>
  );
}

export default App;