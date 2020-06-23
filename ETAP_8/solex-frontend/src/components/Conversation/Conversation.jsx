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
import MessageBox from "./MessageBox";
import WriteMessage from "./WriteMessage";

export default class Conversation extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} className="border-bottom">
            <h4>Napisz wiadomość - {this.props.title}</h4>
          </Col>
        </Row>

        <Row className="justify-content-center pt-3">
          <Row className="flex-space-between w-75">
            <MessageBox
              position={"r"}
              message={"dzień dobyry, czy wiadomości wyświetlają się dobrze?"}
            />
            <MessageBox message={"Dzień dobry, wiadomości wyświetlają się bardzo dobrze!"} />
            <MessageBox
              message={
                "Bardzo mnie cieszy ten widok, wielka szkoda że nie udało nam się zaimplementować konwersacji i te wiadomości są wpisane na sztywno w kodzie"
              }
            />
            <MessageBox
              position={"r"}
              message={"Wielka szkoda, lecz widok konwersacji bardzo ładny. Pozadrawiam"}
            />
            <MessageBox message={"Dziękuję i pozdrawiam cieplutko :)"} />
          </Row>
        </Row>
        <Row>
          <WriteMessage />
        </Row>
      </Container>
    );
  }
}
