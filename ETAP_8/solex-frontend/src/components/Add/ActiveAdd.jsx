import React, { Component } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../helpers/axiosInstance";
import { getJWT } from "../../helpers/JwtHelper";
import { Link } from "react-router-dom";

export default class ActiveAdd extends Component {
  state = {
    closed: undefined,
  };
  onClose = () => {
    axiosInstance
      .patch(
        "close-ad",
        { id: this.props.ad.id },
        {
          headers: {
            Accept: "*/*",
            Authorization: getJWT(),
          },
        }
      )
      .then((response) => {
        if (response.status == 200) this.setState({ closed: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  renderEditButton = () => {
    if (this.state.closed || this.props.ad.status == "CLOSED") {
      return;
    } else {
      return (
        <Button variant={"secondary"}>
          <FAIcon icon={faPencilAlt} /> Edytuj
        </Button>
      );
    }
  };
  renderCloseButton = () => {
    if (this.state.closed || this.props.ad.status == "CLOSED") {
      return (
        <Button variant={"outline-secondary"} disabled>
          <FAIcon icon={faTimes} /> Zamknięte
        </Button>
      );
    } else {
      return (
        <Button variant={"secondary"} onClick={this.onClose}>
          <FAIcon icon={faTimes} /> Zamknij
        </Button>
      );
    }
  };
  render() {
    return (
      <Row className="my-3 border py-2">
        <Col xs={2}>
          <Image src="solex-192.png" thumbnail fluid className={"add-img"} />
        </Col>

        <Col xs={7} className=" align-items-center align-content-stretch">
          <span className={"text-size-2x"}>
            <Link to={"/ogłoszenie?id=" + this.props.ad.id}>
              <b> {this.props.title}</b>
            </Link>
          </span>
          <br />
          Data wystawienia: {this.props.date}
        </Col>

        <Col xs={3} className={"flex-row-right"}>
          {this.renderEditButton()}
          {this.renderCloseButton()}
        </Col>
      </Row>
    );
  }
}
