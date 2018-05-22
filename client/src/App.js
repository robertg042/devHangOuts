import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

import classes from "./App.css";
import Layout from "./components/Layout/Layout";
import Landing from "./components/Landing/Landing";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";
import ProfilesList from "./components/ProfilesList/ProfilesList";
import Logout from "./components/Logout/Logout";
import Redirect from "./components/Redirect/Redirect";
import store from "./store/store";
import { setAuthToken } from "./shared/utils";
import { setAuthenticatedUser, logoutUser } from "./store/actions/authActions";


class App extends Component {
  componentDidMount() {
    if (localStorage.jwtToken) {
      const userFromToken = jwt_decode(localStorage.jwtToken);
      // check if token has expired
      if (userFromToken.exp < Date.now() / 1000) {
        store.dispatch(logoutUser());
        this.props.history.push("/redirect", { message: "Your authorization token has expired. Please login again", to: "log in page", url: "/login" });
      } else {
        // set token to axios' Authorization header
        setAuthToken(localStorage.jwtToken);
        store.dispatch(setAuthenticatedUser(userFromToken));
      }
    } else {
      store.dispatch(logoutUser());
    }
  }

  render() {
    return (
      <div className={classes.App}>
        <Layout>
          <Route exact path={"/login"} component={LoginForm}/>
          <Route exact path={"/signup"} component={SignupForm}/>
          <Route exact path={"/developers"} component={ProfilesList}/>
          <Route exact path={"/redirect"} component={Redirect}/>
          <Route exact path={"/"} component={Landing}/>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
