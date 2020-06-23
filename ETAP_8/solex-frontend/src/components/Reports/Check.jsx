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
import ShowAdd from "../Add/ShowAdd";

export default class Create extends Component {
  render() {
    return (
      <Container>
        <ShowAdd hideReport={true}> </ShowAdd>
        <Row className="justify-content-center my-2">
          <Col xs={10} className={"border-bottom"}>
            <h4> Opis zgłoszenia </h4>
          </Col>
        </Row>

        <Row className="justify-content-center my-2">
          <Col xs={10}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum
            eleifend ipsum, eu pellentesque dui varius nec. In condimentum urna
            mi, vitae dignissim sem semper id. Praesent sed ipsum varius lacus
            ornare tempor in eu neque. Sed commodo felis id turpis pharetra
            placerat. Aliquam tincidunt maximus scelerisque. Duis placerat
            laoreet ipsum. Etiam non pretium libero. Proin ac dolor dui. Integer
            lacus ipsum, laoreet eu dui in, rhoncus tincidunt neque. Etiam sed
            elit dui. Quisque pharetra commodo mi non consequat. Sed at
            fringilla lacus.
          </Col>
        </Row>
        <Row className="justify-content-center my-3 mb-5">
          <Col xs={9} className={"flex-space-between "}>
            <div>
              <Button size={"lg"} variant={"success"}>
                Zatwierdź
              </Button>{" "}
            </div>
            <div>
              <Button size={"lg"} variant={"danger"}>
                Zamknij
              </Button>{" "}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
