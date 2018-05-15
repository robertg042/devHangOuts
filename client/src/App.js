import React, { Component } from "react";
import { Route } from "react-router-dom";

import classes from "./App.css";
import Layout from "./components/Layout/Layout";
import Landing from "./components/Landing/Landing";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";
import ProfilesList from "./components/ProfilesList/ProfilesList";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layout>
          <Route exact path={"/login"} component={LoginForm} />
          <Route exact path={"/signup"} component={SignupForm} />
          <Route exact path={"/developers"} component={ProfilesList} />
          <Route exact path={"/"} component={Landing} />
        </Layout>
      </div>
    );
  }
}

export default App;
