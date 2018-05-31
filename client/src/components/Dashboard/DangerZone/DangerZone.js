import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./DangerZone.css";
import Button from "../../UI/Button/Button";

class DangerZone extends Component {
  state = {
    opened: false
  };

  handleOpen = () => {
    const accordionBody = this.AccordionBody.current;
    if (accordionBody) {
      const list = accordionBody.classList;
      if (list) {
        if (list.contains(classes.Opened)) {
          list.remove(classes.Opened);
        } else {
          list.add(classes.Opened);
        }
        this.setState(prevState => (
          { opened: !prevState.opened }
        ));
      }
    }
  };

  AccordionBody = React.createRef();

  render() {
    const { opened } = this.state;
    const { handleDeleteAccount } = this.props;

    return (
      <div className={classes.DangerZone}>
        <div onClick={this.handleOpen} className={classes.AccordionToggle}>
          <i className={"fas fa-exclamation-triangle"}/>
          DANGER ZONE
          {opened ? <i className="fas fa-angle-up"/> : <i className="fas fa-angle-down"/>}
        </div>
        <div ref={this.AccordionBody} className={classes.AccordionBody}>
          <Button disabled={!opened} type={"button"} colorType={"danger"} handleClick={handleDeleteAccount}>
            <i className={"fas fa-exclamation-triangle"}/>
            Delete Account
          </Button>
        </div>
      </div>
    );
  }
}

DangerZone.propTypes = {
  handleDeleteAccount: PropTypes.func.isRequired
};

export default DangerZone;
