import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import {
  faUser,
  faUserCog,
  faAd,
  faEnvelope,
  faDesktop,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {
  getRole,
  getUser,
  getJWT,
  clearUserData,
} from "../../helpers/JwtHelper";

class Konto extends Component {
  state = {
    role: 0,
    user: "Konto",
  };

  componentDidMount() {
    this.listener = setInterval(() => this.loadUser(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.listener);
  }

  loadUser = () => {
    const jwt = getJWT();
    if (!jwt || jwt === null || jwt === undefined) {
      this.setDefaults();
      return;
    }
    const username = getUser();
    const role = getRole();
    if (username !== this.state.user || role !== this.state.role)
      this.setState({ role: role, user: username });
  };

  render() {
    const { role, user } = this.state;
    return (
      <div className="row">
        <Dropdown alignRight>
          <Dropdown.Toggle variant="light" id="konto-dropdown">
            <FAIcon icon={faUser} size="2x" /> {user}
            {this.renderDropdownMenu(role)}
          </Dropdown.Toggle>
        </Dropdown>
      </div>
    );
  }
  renderDropdownMenu = (role) => {
    switch (role) {
      case 0: //not logged in
        return (
          <Dropdown.Menu>
            <Link to="/register">
              <Dropdown.Item as="button">
                <FAIcon icon={faUserPlus} fixedWidth />
                Zarejestruj się
              </Dropdown.Item>
            </Link>
            <Link to="/login">
              <Dropdown.Item as="button">
                <FAIcon icon={faSignInAlt} fixedWidth />
                Zaloguj się
              </Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        );
      case "ROLE_USER": //user
        return (
          <Dropdown.Menu>
            <Dropdown.Header>Moje</Dropdown.Header>
            <Link to="/moje-ogloszenia">
              <Dropdown.Item as="button">
                <FAIcon icon={faAd} fixedWidth />
                Ogłoszenia
              </Dropdown.Item>
            </Link>
            <Dropdown.Item>
              <FAIcon icon={faEnvelope} fixedWidth />
              Wiadomości
            </Dropdown.Item>
            <Dropdown.Item>
              <FAIcon icon={faUserCog} fixedWidth />
              Ustawienia
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as="button" onClick={this.logOut}>
              <FAIcon icon={faSignOutAlt} fixedWidth />
              Wyloguj się
            </Dropdown.Item>
          </Dropdown.Menu>
        );
      case "ROLE_ADMIN": //admin
        return (
          <Dropdown.Menu>
            <Dropdown.Header>Moje</Dropdown.Header>
            <Link to="/moje-ogloszenia">
              <Dropdown.Item as="button">
                <FAIcon icon={faAd} fixedWidth />
                Ogłoszenia
              </Dropdown.Item>
            </Link>
            <Dropdown.Item>
              <FAIcon icon={faEnvelope} fixedWidth />
              Wiadomości
            </Dropdown.Item>
            <Dropdown.Item>
              <FAIcon icon={faUserCog} fixedWidth />
              Ustawienia
            </Dropdown.Item>
            <Link to="admin-panel">
              <Dropdown.Item as="button">
                <FAIcon icon={faDesktop} fixedWidth />
                Panel Administracyjny
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={this.logOut}>
              <FAIcon icon={faSignOutAlt} fixedWidth />
              Wyloguj się
            </Dropdown.Item>
          </Dropdown.Menu>
        );
    }
  };

  setDefaults = () => {
    this.setState({ role: 0, user: "Konto" });
  };

  logOut = () => {
    clearUserData();
    this.setDefaults();
  };
}

export default withRouter(Konto);
