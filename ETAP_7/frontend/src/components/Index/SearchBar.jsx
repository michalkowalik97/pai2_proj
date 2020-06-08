import React, { Component } from "react";
import { InputGroup, Button, FormControl, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  state = {
    query: "",
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <Row lg="3">
        <Col />
        <InputGroup md="auto">
          <FormControl
            onChange={this.handleChange}
            placeholder="Szukaj ogłoszeń"
            aria-label="Szukaj ogłoszeń"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Link to={`/szukaj?query=` + this.state.query}>
              <Button variant="secondary">
                <FAIcon icon={faSearch} />
              </Button>
            </Link>
          </InputGroup.Append>
        </InputGroup>
        <Col />
      </Row>
    );
  }
}

export default SearchBar;
