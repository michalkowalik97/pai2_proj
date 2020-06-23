import React, { Component } from "react";
import { Button, Row, Col, Nav } from "react-bootstrap";
import NewAdd from "./NewAdd";
import NewAdds from "./NewAdds";
import Reports from "./Reports";
import { Link } from "react-router-dom";
export default class Panel extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Col xs={10}>
          <h4>Panel Administracyjny</h4>
          <hr />
        </Col>

        <Col xs={10}>
          <Nav className="border-bottom w-100">
            <Link to="/admin-panel">
              <Button
                variant={this.props.active == "new" ? "secondary" : "light"}
              >
                Nowe ogłoszenia
              </Button>
            </Link>
            <Link to="/admin-panel-reports">
              <Button
                variant={this.props.active == "reports" ? "secondary" : "light"}
              >
                Zgłoszenia
              </Button>
            </Link>
          </Nav>

          {this.props.active == "new" ? <NewAdds /> : <Reports />}
        </Col>
      </Row>
    );
  }
}
