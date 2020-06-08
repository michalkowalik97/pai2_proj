import React, {Component} from "react";
import {InputGroup, Button, FormControl, Row, Col, Form, FormGroup, FormLabel, Container} from "react-bootstrap";

export default class WriteMessage extends Component {
    render() {
        return (
            <Container>
                <Row className="justify-content-center my-3">
                    <Col xs={10} className={"border-bottom"}>

                    </Col>
                </Row>

                <Row className="justify-content-center my-3">
                    <Col xs={10} >
                        <form action="#" method={"POST"}>
                            <FormGroup>

                                <FormControl as="textarea" rows={7} name={"message"}/>

                            </FormGroup>

                        </form>
                    </Col>

                </Row>
                <Row className="justify-content-center my-3">
                    <Col xs={1}>
                        <Button variant={"secondary"} size={"lg"} >Wyślij</Button>

                    </Col>
                </Row>
            </Container>

        );
    }
}