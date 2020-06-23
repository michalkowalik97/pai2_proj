import React, { Component } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import axiosInstance from "../../helpers/axiosInstance";
import { getJWT } from "../../helpers/JwtHelper";

export default class MyAdds extends Component {
  state = {
    redirect: undefined,
  };

  onAccept = () => {
    axiosInstance
      .patch(
        "accept-ad",
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
      return <Redirect to={"/ogłoszenie?id=" + this.props.id} />;
    }
    return (
      <Row className="my-3 border py-2">
        <Col xs={2}>
          <Image src="solex-192.png" thumbnail fluid className={"add-img"} />
        </Col>

        <Col xs={7} className=" align-items-center align-content-stretch">
          <span className={"text-size-2x"}>
            <b> {this.props.title}</b>
          </span>{" "}
          <br />
          Data wystawienia: {this.props.date}
        </Col>

        <Col xs={3} className={"flex-row-right"}>
          <Link to={"/ogłoszenie?id=" + this.props.id}>
            <Button variant={"secondary"}>
              <FAIcon icon={faEye} /> Sprawdź{" "}
            </Button>
          </Link>

          <Button variant={"secondary"} onClick={this.onAccept}>
            <FAIcon icon={faCheck} /> Zatwierdź
          </Button>
        </Col>
      </Row>
    );
  }
}
