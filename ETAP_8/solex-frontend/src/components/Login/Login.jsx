import React, { Component } from "react";
import {
  Button,
  FormControl,
  Row,
  Col,
  Form,
  FormGroup,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axiosInstance from "../../helpers/axiosInstance";
import { setJWT, setUser } from "../../helpers/JwtHelper";

export default class Login extends Component {
  state = {
    username: undefined,
    password: undefined,
    authenticated: undefined,
    error: undefined,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = () => {
    const { username, password } = this.state;
    axiosInstance
      .post("login", {
        username: username,
        password: password,
      })
      .then((result) => {
        const { token, type, userDetails } = result.data;

        setJWT(type + " " + token);
        setUser(userDetails);
        this.setState({ authenticated: true });
      })
      .catch((error) => {
        this.setState({ authenticated: false, error: error });
      });
  };

  render() {
    if (this.state.authenticated === true) {
      return <Redirect to="/" />;
    } else if (this.state.authenticated === false) {
      return <Redirect to="/login" />;
    }

    return (
      <Row className="justify-content-center">
        <Col xs={4} className="border p-3">
          <h3>Zaloguj się</h3>
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
              <Form.Label>Hasło</Form.Label>
              <FormControl
                type="password"
                placeholder="Hasło"
                name="password"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Row className="flex-column-right mr-2">
              <Form.Group>
                <Form.Check type="checkbox" label="Zapamiętaj mnie" /> <br />
              </Form.Group>

              <Form.Group>
                <Button variant="secondary" onClick={this.handleSubmit}>
                  Zaloguj się
                </Button>
              </Form.Group>
            </Row>
            Nie masz konta? <Link to="/register">Zarejestruj się</Link>
          </form>
        </Col>
      </Row>
    );
  }
}
