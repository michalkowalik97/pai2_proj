import React, {Component} from "react";
import {Button, Row, Col, Image, Container} from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {  faEye, faCheck  } from "@fortawesome/free-solid-svg-icons";

export default class MyAdds extends Component {

    render() {
        return (
            <Container className="my-3 border py-2">
                <Row >
                    <Col xs={2}>
                        <Image src="solex-192.png" thumbnail fluid className={"add-img"} />
                    </Col>

                    <Col xs={7} className=" align-items-center align-content-stretch">
                    <span className={"text-size-2x"}>
                  <b> {this.props.title}</b>
                    </span> <br/>
                        Data wystawienia: {this.props.date}
                    </Col>

                    <Col xs={3} className={"flex-row-right"}>
                        <Button variant={"secondary"}> <FAIcon icon={faEye} /> Sprawdź </Button>

                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                    <h4>Opis zgłoszenia:</h4>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum eleifend ipsum, eu pellentesque dui varius nec. In condimentum urna mi, vitae dignissim sem semper id. Praesent sed ipsum varius lacus ornare tempor in eu neque. Sed commodo felis id turpis pharetra placerat. Aliquam tincidunt maximus scelerisque. Duis placerat laoreet ipsum. Etiam non pretium libero. Proin ac dolor dui. Integer lacus ipsum, laoreet eu dui in, rhoncus tincidunt neque. Etiam sed elit dui.

                        Quisque pharetra commodo mi non consequat. Sed at fringilla lacus.
                    </Col>
                </Row>
            </Container>



        );
    }
}