import React, {Component} from "react";
import {InputGroup, Button, FormControl, Row, Col, Form, FormGroup, FormLabel, Container} from "react-bootstrap";
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

                        <MessageBox position={"r"} message={"dzień dobyry, czy wiadomości wyświetlają się dobrze?"}/>
                        <MessageBox message={"to jest bardzo dobre gówno, sprawdzaj"}/>
                        <MessageBox
                            message={"test bardzo długiej wiadomości, ale takiej innej niż lorem ipsum bo mi się nie chce," +
                            " jeszcze trochę za krótko, ale raczej będzie okej "}/>
                        <MessageBox position={"r"} message={"no dobra, wygląda na to że wszystko działa"}/>
                        <MessageBox message={"pozdrawiam cieplutko"}/>


                    </Row>
                </Row>
                <Row>
                    <WriteMessage/>
                </Row>
            </Container>
        );
    }
}