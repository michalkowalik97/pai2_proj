import React, { Component } from "react";
import { Button, Row, Col, Nav } from "react-bootstrap";
import ActiveAdd from "./ActiveAdd";
import { withRouter } from "react-router-dom";
class MyAdds extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Col xs={10}>
          <h4>Moje ogłoszenie</h4>
          <hr />
        </Col>

        <Col xs={10}>
          <Nav className="border-bottom w-100">
            <Button href="#home" variant="secondary">
              Aktywne
            </Button>
            <Button href="#home" variant="light">
              Zakończone
            </Button>
          </Nav>

          <ActiveAdd title="Volkswagen passat b5" date={"25.05.2020"} />
          <ActiveAdd title="Volkswagen passat b5" date={"25.05.2020"} />
          <ActiveAdd title="Volkswagen passat b5" date={"25.05.2020"} />
        </Col>
      </Row>
    );
  }
}

export default withRouter(MyAdds);
