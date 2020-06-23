import React, { Component } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { baseURL } from "../../helpers/axiosInstance";

export default class MyAdds extends Component {
  render() {
    return (
      <Link
        to={"/ogłoszenie?id=" + this.props.href}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Row className="my-3 border py-2">
          <Col xs={2}>
            <Image
              src={
                this.props.photos[0] === undefined
                  ? "solex-192.png"
                  : baseURL + "public/" + this.props.photos[0]
              }
              thumbnail
              fluid
              className={"add-img"}
            />
          </Col>

          <Col xs={7} className=" align-items-center align-content-stretch">
            <span className={"text-size-2x"}>
              <b> {this.props.title}</b>
            </span>{" "}
            <br />
            Telefon: {this.props.phone} <br />
            {this.props.description.substr(0, 50)}...
          </Col>
        </Row>
      </Link>
    );
  }
}
