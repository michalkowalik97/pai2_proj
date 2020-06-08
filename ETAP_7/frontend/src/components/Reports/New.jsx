import React, {Component} from "react";
import {InputGroup, Button, FormControl, Row, Col, Form, FormGroup, FormLabel, Container} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";

import axiosInstance from "../../helpers/axiosInstance";
import Loading from "../SimpleComponents/Loading";


 class New extends Component {
    state={
        title: undefined
    }

    componentDidMount() {


        axiosInstance.get("public/ogloszenie" + this.props.location.search)
            .then((response) => {

                this.setState({
                    title: response.data.title,

                });

            })
            .catch((error) => {
                console.log(error)

            });
    }

    render() {
        if (this.state.title === undefined){
            return <Loading/>
        }

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={10} className={"border-bottom"}>
                        <h4>Złoszenie dot. "{this.state.title}"</h4>
                    </Col>
                </Row>

                <Row className="justify-content-center my-3">
                    <Col xs={10} >
                        <form action="#" method={"POST"}>
                            <FormGroup>
                                <FormLabel>Proszę opisać powód zgłoszenia </FormLabel>
                                <FormControl as="textarea" rows={7} name={"description"}/>

                            </FormGroup>

                        </form>
                    </Col>

                </Row>
                <Row className="justify-content-center my-3">
                    <Col xs={1}>
                        <Button variant={"secondary"} size={"lg"}>Wyślij</Button>

                    </Col>
                </Row>
            </Container>

        );
    }
}

export default withRouter(New);
