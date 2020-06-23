import React, { Component } from "react";
import {
  InputGroup,
  Button,
  FormControl,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  Container,
} from "react-bootstrap";
import { Link, withRouter, Redirect } from "react-router-dom";

import axiosInstance from "../../helpers/axiosInstance";
import Loading from "../SimpleComponents/Loading";
import { getJWT } from "../../helpers/JwtHelper";

class New extends Component {
  state = {
    title: undefined,
    adId: undefined,
    redirect: undefined,
  };

  componentDidMount() {
    axiosInstance
      .get("public/ogloszenie" + this.props.location.search)
      .then((response) => {
        console.log(response.data);
        this.setState({
          title: response.data.title,
          adId: response.data.id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    let model = {
      adId: this.state.adId,
      description: data.get("description"),
    };

    let formData = new FormData();
    formData.append("model", JSON.stringify(model));

    axiosInstance
      .post("nowe-zgloszenie", formData, {
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          Authorization: getJWT(),
        },
      })
      .then((response) => {
        this.setState({ redirect: true });
      });
  };

  render() {
    if (this.state.redirect == true) {
      return <Redirect to={"/ogłoszenie?id=" + this.state.adId} />;
    }
    if (this.state.title === undefined) {
      return <Loading />;
    }

    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} className={"border-bottom"}>
            <h4>Złoszenie dot. "{this.state.title}"</h4>
          </Col>
        </Row>

        <Row className="justify-content-center my-3">
          <Col xs={10}>
            <form action="#" onSubmit={this.onSubmit}>
              <FormGroup>
                <FormLabel>Proszę opisać powód zgłoszenia </FormLabel>
                <FormControl as="textarea" rows={7} name={"description"} />
              </FormGroup>
              <Form.Group>
                <Row className="justify-content-center my-3">
                  <Col xs={1}>
                    <Button type="submit" variant={"secondary"} size={"lg"}>
                      Wyślij
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(New);
