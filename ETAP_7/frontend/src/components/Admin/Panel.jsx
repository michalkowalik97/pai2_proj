import React, {Component} from "react";
import { Button,  Row, Col, Nav } from "react-bootstrap";
import NewAdd from "./NewAdd";
import NewAdds from "./NewAdds";
import Reports from "./Reports";
export default class Panel extends Component {
    render() {
        return (
            <Row className="justify-content-center">
                <Col xs={10}>
                    <h4>Moje ogłoszenie</h4>
                    <hr/>
                </Col>

                <Col xs={10}>

                    <Nav  className="border-bottom w-100">
                        <Button href="/admin-panel" variant={(this.props.active == 'new' ) ? "secondary" : "light"} >Nowe ogłoszenia</Button>
                        <Button href="/admin-panel-reports" variant={(this.props.active == 'reports' ) ? "secondary" : "light"} >Zgłoszenia</Button>

                    </Nav>

                    {(this.props.active == 'new' ) ? <NewAdds /> : <Reports />}


                </Col>

            </Row>
        );
    }
}