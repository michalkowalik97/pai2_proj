import React, { Component } from "react";
import { Button, Row, Col, Image, Container } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import axiosInstance from "../../helpers/axiosInstance";
import { getJWT } from "../../helpers/JwtHelper";

export default class Report extends Component {
  state = {
    closed: undefined,
  };
  onClose = () => {
    axiosInstance
      .patch(
        "zamknij-zgloszenie?id=" + this.props.ticket.id,
        {},
        {
          headers: {
            Accept: "*/*",
            Authorization: getJWT(),
          },
        }
      )
      .then((response) => {
        if (response.status == 200) this.setState({ closed: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderCloseButton = () => {
    if (this.state.closed || this.props.ticket.status == "CLOSED") {
      return (
        <Button variant={"outline-secondary"} disabled>
          <FAIcon icon={faCheck} /> Zamknięte
        </Button>
      );
    } else {
      return (
        <Button variant={"secondary"} onClick={this.onClose}>
          <FAIcon icon={faCheck} /> Zamknij
        </Button>
      );
    }
  };

  render() {
    return (
      <Container className="my-3 border py-2">
        <Row>
          <Col xs={2}>
            <Image src="solex-192.png" thumbnail fluid className={"add-img"} />
          </Col>

          <Col xs={7} className=" align-items-center align-content-stretch">
            Użytkownik zgłaszający: {this.props.ticket.reporter.username}
          </Col>

          <Col xs={3} className={"flex-row-right"}>
            <Link to={"/ogłoszenie?id=" + this.props.ticket.ad.id}>
              <Button variant={"secondary"}>
                <FAIcon icon={faEye} /> Sprawdź
              </Button>
            </Link>
            {this.renderCloseButton()}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h4>Opis zgłoszenia:</h4>
            {this.props.ticket.description}
          </Col>
        </Row>
      </Container>
    );
  }
}
