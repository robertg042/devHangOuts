import React, { Component } from "react";

import classes from "./Layout.css";
import TopBar from "../Navigation/TopBar/TopBar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Footer from "../UI/Footer/Footer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  handleClosingSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };

  handleToggleSideDrawer = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <TopBar toggleDrawer={this.handleToggleSideDrawer} />
        <SideDrawer
          show={this.state.showSideDrawer}
          handleClose={this.handleClosingSideDrawer}
        />
        <main>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
