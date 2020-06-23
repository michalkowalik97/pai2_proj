import React, { Component } from "react";
import {
  InputGroup,
  Button,
  FormControl,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  Container,
} from "react-bootstrap";

export default class MessageBox extends Component {
  render() {
    return (
      <div className={"full-width"}>
        <div
          className={
            this.props.position == "r" ? "right-message" : "left-message"
          }
        >
          {this.props.message}
        </div>
      </div>
    );
  }
}
