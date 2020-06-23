import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import axiosInstance from "../../helpers/axiosInstance";

class SearchInput extends Component {
  state = {
    query: "",
    catId: "",
    categories: undefined,
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSelect = (event) => {
    this.setState({ catId: event.target.value });
  };

  componentDidMount() {
    axiosInstance
      .get("/public/getAllCategories?onlyMain=true")
      .then((response) => {
        this.setState({
          categories: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    if (this.state.categories === undefined) {
      return (
        <InputGroup md="auto">
          <FormControl
            onChange={this.handleChange}
            placeholder="Szukaj ogłoszeń"
            aria-label="Szukaj ogłoszeń"
            aria-describedby="basic-addon2"
            required
          />

          <InputGroup.Append>
            <Link to={`/szukaj?query=` + this.state.query + this.state.catId}>
              <Button variant="secondary">
                <FAIcon icon={faSearch} />
              </Button>
            </Link>
          </InputGroup.Append>
        </InputGroup>
      );
    } else {
      return (
        <InputGroup md="auto">
          <FormControl
            onChange={this.handleChange}
            placeholder="Szukaj ogłoszeń"
            aria-label="Szukaj ogłoszeń"
            aria-describedby="basic-addon2"
            required
          />
          <FormControl as="select" onChange={this.handleSelect}>
            <option value="">Wszystkie kategorie</option>
            {this.state.categories.map((cat) => (
              <option value={"&catId=" + cat.value}>{cat.label}</option>
            ))}
            ;
          </FormControl>
          <InputGroup.Append>
            <Link to={`/szukaj?query=` + this.state.query + this.state.catId}>
              <Button variant="secondary">
                <FAIcon icon={faSearch} />
              </Button>
            </Link>
          </InputGroup.Append>
        </InputGroup>
      );
    }
  }
}
export default SearchInput;
