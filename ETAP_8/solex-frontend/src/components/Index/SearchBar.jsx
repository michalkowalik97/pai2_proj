import React, { Component } from "react";
import { InputGroup, Button, FormControl, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

class SearchBar extends Component {
  /*  state = {
        query: "",
      };

      handleChange = (event) => {
        this.setState({ query: event.target.value });
      };*/

  render() {
    return (
      <Row className="justify-content-center">
        <Col xs={8}>
          <SearchInput />
        </Col>
      </Row>
    );
  }
}

export default SearchBar;
