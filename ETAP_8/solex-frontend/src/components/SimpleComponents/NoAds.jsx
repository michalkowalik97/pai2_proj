import React, { Component } from "react";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class NoAds extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Col xs={"4"}>
          <FAIcon icon={faSearch} size="4x" />
          <br />
          <h3>Nie znaleziono żadnego ogłoszenia</h3>
        </Col>
      </Row>
    );
  }
}
