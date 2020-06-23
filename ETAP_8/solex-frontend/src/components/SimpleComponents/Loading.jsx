import React, { Component } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

export default class Loading extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Col xs={1} className={"h4"}>
          <Spinner variant={"secondary"} animation={"border"}></Spinner>
          <span> Ładowanie</span>
        </Col>
      </Row>
    );
  }
}
