import React, { Component } from "react";
import { Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import classes from "./App.css";
import Layout from "./components/Layout/Layout";
import Landing from "./components/Landing/Landing";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";
import ProfilesList from "./components/ProfilesList/ProfilesList";
import store from "./store/store";
import { setAuthToken } from "./shared/utils";
import { setAuthenticatedUser } from "./store/actions/authActions";

if (localStorage.jwtToken) {
  // set token to axios' Authorization header
  setAuthToken(localStorage.jwtToken);
  const userFromToken = jwt_decode(localStorage.jwtToken);
  store.dispatch(setAuthenticatedUser(userFromToken));

}

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
