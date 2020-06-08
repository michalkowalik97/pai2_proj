import React, {Component} from "react";
import { Button,  Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {  faPencilAlt, faTimes  } from "@fortawesome/free-solid-svg-icons";

export default class MyAdds extends Component {

    render() {
        return (
            <Row className="my-3 border py-2">
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
                    <Button variant={"secondary"}> <FAIcon icon={faPencilAlt} /> Edytuj </Button>
                    <Button variant={"secondary"}> <FAIcon icon={faTimes}  /> Zamknij</Button>
                </Col>
            </Row>

        );
    }
}