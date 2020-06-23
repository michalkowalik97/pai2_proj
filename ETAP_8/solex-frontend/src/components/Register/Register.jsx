import React, { Component } from "react";
import {
  InputGroup,
  Button,
  FormControl,
  Row,
  Col,
  Form,
  FormGroup,
  Alert,
} from "react-bootstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import axiosInstance from "../../helpers/axiosInstance";

class Register extends Component {
  state = {
    username: undefined,
    password: undefined,
    confirm_password: undefined,
    email: undefined,
    address: undefined,
    phone: undefined,
    error: undefined,
  };

  renderError = () => {
    const { error } = this.state;
    if (error === undefined) {
      return "";
    } else if (error === "password_match") {
      return (
        <Alert
          variant="danger"
          onClose={() => this.setState({ error: undefined })}
          dismissible
        >
          <p>Hasła się nie zgadzają</p>
        </Alert>
      );
    } else if (error === false) {
      return <Redirect to="/login" />;
    } else {
      return (
        <Alert
          variant="danger"
          onClose={() => this.setState({ error: undefined })}
          dismissible
        >
          <p>Nieobsłuzony błąd: {error}</p>
        </Alert>
      );
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = () => {
    const {
      username,
      password,
      confirm_password,
      email,
      address,
      phone,
    } = this.state;
    if (password != confirm_password) {
      this.setState({ error: "password_match" });
      return;
    }
    axiosInstance
      .post("register", {
        username: username,
        password: password,
        email: email,
        address: address,
        phone: phone,
      })
      .then((result) => {
        this.setState({ error: false });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };

  render() {
    return (
      <Row className="justify-content-center">
        <Col xs={4} className="border p-3">
          <h3>Zarejestruj się</h3>
          {this.renderError()}
          <form action="#" method="POST">
            <Form.Group>
              <Form.Label>Login</Form.Label>
              <FormControl
                type="text"
                placeholder="Login"
                name="username"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <FormControl
                type="email"
                placeholder="E-mail"
                name="email"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Adres zamieszkania</Form.Label>
              <FormControl
                type="text"
                placeholder="ul. Uliczna 13/5, 22-222 Miasto"
                name="address"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Numer telefonu</Form.Label>
              <FormControl
                type="text"
                placeholder="np. 123123123"
                name="phone"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hasło</Form.Label>
              <FormControl
                type="password"
                placeholder="Hasło"
                name="password"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Powtórz hasło</Form.Label>
              <FormControl
                type="password"
                placeholder="Powtóz hasło"
                name="confirm_password"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Row className="flex-column-right mr-1">
              <Form.Group>
                <Button variant="secondary" onClick={this.handleSubmit}>
                  Zarejestruj się
                </Button>
              </Form.Group>
            </Row>
            Masz już konto? <Link to="/login">Zaloguj się</Link>
          </form>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Register);
