import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheck } from "@fortawesome/free-solid-svg-icons";
import Report from "./Report";
import axiosInstance from "../../helpers/axiosInstance";
import { getJWT } from "../../helpers/JwtHelper";
import Loading from "../SimpleComponents/Loading";

export default class Reports extends Component {
  state = {
    isLoaded: false,
    tickets: undefined,
    filter: "",
  };
  componentDidUpdate() {
    if (!this.state.isLoaded) this.fetchTickets();
  }
  componentDidMount() {
    this.fetchTickets();
  }
  fetchTickets = () => {
    axiosInstance
      .get("zgloszenia?status=" + this.state.filter, {
        headers: {
          Authorization: getJWT(),
        },
      })

      .then((response) => {
        this.setState({
          isLoaded: true,
          tickets: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  };
  render() {
    const { isLoaded, tickets } = this.state;

    if (!isLoaded) {
      return <Loading />;
    } else {
      const items = tickets.map((ticket) => <Report ticket={ticket} />);
      return (
        <div>
          {this.renderDropdown()}
          {items}
        </div>
      );
    }
  }
  setPendingFilter = () => {
    this.setState({ filter: "PENDING", isLoaded: false });
  };

  setClosedFilter = () => {
    this.setState({ filter: "CLOSED", isLoaded: false });
  };

  setAnyFilter = () => {
    this.setState({ filter: "", isLoaded: false });
  };

  renderDropdown = () => {
    return (
      <DropdownButton id="dropdown-item-button" title="Filtry">
        <Dropdown.Item
          as="button"
          active={this.state.filter == "PENDING"}
          onClick={this.setPendingFilter}
        >
          Oczekujące
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          active={this.state.filter == "CLOSED"}
          onClick={this.setClosedFilter}
        >
          Zamknięte
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          active={this.state.filter == ""}
          onClick={this.setAnyFilter}
        >
          Wszystkie
        </Dropdown.Item>
      </DropdownButton>
    );
  };
}
