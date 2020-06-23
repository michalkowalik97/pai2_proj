import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Konto from "./Konto";

export default class Head extends Component {
  render() {
    return (
      <Container className="solex-head">
        <Link to="/">
          <Image src="solex-128.png"></Image>
        </Link>
        <Konto />
      </Container>
    );
  }
}
