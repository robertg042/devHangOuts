import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

import classes from "./App.css";
import Layout from "./components/Layout/Layout";
import Landing from "./components/Landing/Landing";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";
import Logout from "./components/Logout/Logout";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfileForm from "./components/CreateProfileForm/CreateProfileForm";
import EditProfileForm from "./components/EditProfileForm/EditProfileForm";
import AddExperienceForm from "./components/AddExperienceForm/AddExperienceForm";
import AddEducationForm from "./components/AddEducationForm/AddEducationForm";
import ProfilesList from "./components/ProfilesList/ProfilesList";
import RedirectComponent from "./components/RedirectComponent/RedirectComponent";
import store from "./store/store";
import { setAuthToken } from "./shared/utils";
import { setAuthenticatedUser, logoutUser } from "./store/actions/authActions";

// FIXME: bug: user logged in with an not-existent account (deleted through database) with not expired token should be logged out

class App extends Component {
  componentDidMount() {
    if (localStorage.jwtToken) {
      const userFromToken = jwt_decode(localStorage.jwtToken);
      // check if token has expired
      if (userFromToken.exp < Date.now() / 1000) {
        store.dispatch(logoutUser());
        this.props.history.push("/redirect", { message: "Your authorization token has expired. Please login again.", to: "log in page", url: "/login" });
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
    let routes = (
      <Switch>
        <Route exact path={"/developers"} component={ProfilesList}/>
        <Route exact path={"/redirect"} component={RedirectComponent}/>
        <Route exact path={"/login"} component={LoginForm}/>
        <Route exact path={"/signup"} component={SignupForm}/>
        <Route exact path={"/"} component={Landing}/>
        <Route render={() => {
          return <RedirectComponent message={"Not found."} to={"home page"} url={"/"} />;
        }}/>
      </Switch>);
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path={"/developers"} component={ProfilesList}/>
          <Route exact path={"/dashboard"} component={Dashboard}/>
          <Route exact path={"/create-profile"} component={CreateProfileForm}/>
          <Route exact path={"/edit-profile"} component={EditProfileForm}/>
          <Route exact path={"/add-experience"} component={AddExperienceForm}/>
          <Route exact path={"/add-education"} component={AddEducationForm}/>
          <Route exact path={"/logout"} component={Logout}/>
          <Route exact path={"/redirect"} component={RedirectComponent}/>
          <Redirect exact from={"/login"} to={"/dashboard"}/>
          <Redirect exact from={"/signup"} to={"/developers"}/>
          <Redirect exact from={"/"} to={"/developers"}/>
          <Route render={() => {
            return <RedirectComponent message={"Not found."} to={"home page"} url={"/"} />;
          }}/>
        </Switch>);
    }

    return (
      <div className={classes.App}>
        <Layout>
          <Switch>
            {routes}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps)(App));
