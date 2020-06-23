import React, { Component } from "react";
import { Button, Row, Col, Container, Carousel } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faEnvelope,
  faPhoneAlt,
  faAt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { Link, withRouter } from "react-router-dom";
import axiosInstance, { baseURL } from "../../helpers/axiosInstance";
import Loading from "../SimpleComponents/Loading";
import { getRole, getJWT, getUser } from "../../helpers/JwtHelper";

function StatusBadge(props) {
  switch (props.status) {
    case "OPEN":
      return "";
    case "PENDING":
      return (
        <h3
          style={{
            textAlign: "center",
            color: "#fff",
            border: "1px solid #222",
            backgroundColor: "#666",
            padding: "10px 5px",
          }}
        >
          To ogłoszenie nie zostało jeszcze zatwierdzone
        </h3>
      );
    case "CLOSED":
      return (
        <h3
          style={{
            textAlign: "center",
            color: "#fff",
            border: "1px solid #222",
            backgroundColor: "#666",
            padding: "10px 5px",
          }}
        >
          To ogłoszenie zostało zamknięte
        </h3>
      );
    default:
      break;
  }
}

class ShowAdd extends Component {
  state = {
    id: undefined,
    title: undefined,
    description: undefined,
    category: undefined,
    email: undefined,
    phone: undefined,
    status: undefined,
    photosUrl: [],
  };

  componentDidMount() {
    let photosurl = [];
    axiosInstance
      .get("/public/ogloszenie" + this.props.location.search)
      .then((response) => {
        photosurl = JSON.parse(response.data.photos);
        this.setState({
          id: response.data.id,
          user: response.data.user,
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          phone: response.data.phone,
          email: response.data.user.email,
          status: response.data.status,
          photosUrl: photosurl,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderPhotos = () => {
    if (this.state.photosUrl.length === 0) {
      return (
        <Carousel
          className={" image-in-add  my-2"}
          controls={false}
          indicators={false}
        >
          <Carousel.Item>
            <img
              className={" d-block mx-auto my-auto carusel-img"}
              src={"solex-full.png"}
            />
          </Carousel.Item>
        </Carousel>
      );
    } else {
      return (
        <Carousel className={" image-in-add  my-2"} interval={10000}>
          {this.state.photosUrl.map((item, index) => (
            <Carousel.Item>
              <img
                className={" d-block mx-auto my-auto carusel-img"}
                src={baseURL + "public/" + item}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      );
    }
  };

  categoryBar = () => {
    let link = [];
    let category = this.state.category;
    while (true) {
      if (category.parent === null) {
        link.push(
          <Link to={"/szukaj?query=&catId=" + category.id}>
            {category.name}
          </Link>
        );
        link.push(<Link to={"/"}>Solex</Link>);
        link.reverse();
        return (
          <div>
            {link.map((li, i) => (
              <span>
                {li} {link.length === i + 1 ? "" : "->"}
              </span>
            ))}
          </div>
        );
      } else {
        link.push(
          <Link to={"/szukaj?query=&catId=" + category.id}>
            {category.name}
          </Link>
        );
        category = category.parent;
      }
    }
  };
  onCloseAd = () => {
    axiosInstance
      .patch(
        "close-ad",
        { id: this.state.id },
        {
          headers: {
            Accept: "*/*",
            Authorization: getJWT(),
          },
        }
      )
      .then((response) => {
        if (response.status == 200) this.setState({ status: "CLOSED" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  renderCloseButton = () => {
    if (
      this.state.status != "CLOSED" &&
      (getRole() == "ROLE_ADMIN" || getUser() == this.state.user.username)
    ) {
      return (
        <Button onClick={this.onCloseAd} variant={"secondary"}>
          <FAIcon icon={faTimes} /> Zamknij
        </Button>
      );
    } else return "";
  };
  render() {
    if (this.state.title === undefined) {
      return <Loading />;
    }

    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} className={"border-bottom mb-2"}>
            <StatusBadge status={this.state.status} />
            {this.categoryBar()}
            <h4>{this.state.title}</h4>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={10} className="bg-secsondary">
            {this.renderPhotos()}
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={10} className="flex-space-between border-bottom mb-2">
            <div className={"h4"}>Opis</div>
            <div
              className={
                this.props.hideReport || this.state.status == "CLOSED"
                  ? "hide"
                  : ""
              }
            >
              <Link to={"/nowe-zgloszenie" + this.props.location.search}>
                <Button variant={"secondary"}>
                  <FAIcon icon={faExclamationTriangle} /> Zgłoś
                </Button>
              </Link>
              {this.renderCloseButton()}
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={10}> {this.state.description}</Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={10} className="flex-space-between border-top mt-2 pt-3 mb-5">
            <div className={"h4"}>
              <FAIcon icon={faAt} /> E-mail: {this.state.email} <br />
              <FAIcon icon={faPhoneAlt} /> Telefon: {this.state.phone}
            </div>
            <div>
              <Button variant={"secondary"}>
                {" "}
                <FAIcon icon={faEnvelope} /> Napisz wiadomość
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ShowAdd);
