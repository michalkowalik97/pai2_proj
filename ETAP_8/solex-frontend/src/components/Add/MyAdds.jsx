import React, { Component } from "react";
import { Button, Row, Col, Nav } from "react-bootstrap";
import ActiveAdd from "./ActiveAdd";
import { withRouter } from "react-router-dom";
import axiosInstance from "../../helpers/axiosInstance";
import { getJWT } from "../../helpers/JwtHelper";
import Loading from "../SimpleComponents/Loading";
class MyAdds extends Component {
  state = {
    isLoaded: false,
    closed: false,
    ads: undefined,
  };
  showOpenAds = () => {
    this.setState({ closed: false });
  };
  showClosedAds = () => {
    this.setState({ closed: true });
  };
  componentDidMount() {
    axiosInstance
      .get("moje-ogloszenia", {
        headers: {
          Accept: "*/*",
          Authorization: getJWT(),
        },
      })

      .then((response) => {
        this.setState({
          isLoaded: true,
          ads: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }
  renderAds = () => {
    return this.state.ads
      .filter(
        (ad) =>
          (!this.state.closed &&
            (ad.status == "OPEN" || ad.status == "PENDING")) ||
          (this.state.closed && ad.status == "CLOSED")
      )
      .map((ad) => <ActiveAdd title={ad.title} date={ad.dateTime} ad={ad} />);
  };
  render() {
    if (!this.state.isLoaded) {
      return <Loading />;
    } else {
      return (
        <Row className="justify-content-center">
          <Col xs={10}>
            <h4>Moje ogłoszenia</h4>
            <hr />
          </Col>

          <Col xs={10}>
            <Nav className="border-bottom w-100">
              <Button
                onClick={this.showOpenAds}
                variant={this.state.closed ? "light" : "secondary"}
              >
                Aktywne
              </Button>
              <Button
                onClick={this.showClosedAds}
                variant={this.state.closed ? "secondary" : "light"}
              >
                Zakończone
              </Button>
            </Nav>

            {this.renderAds()}
          </Col>
        </Row>
      );
    }
  }
}

export default withRouter(MyAdds);
