import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { getUser, getRole, getJWT } from "../../helpers/JwtHelper";
import { withRouter, Redirect } from "react-router-dom";
import axiosInstance from "../../helpers/axiosInstance";

class CloseButton extends Component {
  state = { redirect: undefined };
  onClose = () => {
    axiosInstance
      .patch(
        "close-ad",
        { id: this.props.id },
        {
          headers: {
            Authorization: getJWT(),
          },
        }
      )
      .then((response) => {
        if (response.status == 200) this.setState({ redirect: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    if (this.state.redirect === true) {
      this.props.history.goBack();
      return "";
    }
    if (
      getUser() != null &&
      (getUser().name == this.props.user.username || getRole() == "ROLE_ADMIN")
    ) {
      return (
        <Button variant={"secondary"} onClick={this.onClose}>
          <FAIcon icon={faExclamationTriangle} /> Zamknij
        </Button>
      );
    } else return "";
  }
}

export default withRouter(CloseButton);
