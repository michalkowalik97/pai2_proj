import React, { Component, createRef } from "react";
import Select from "react-select";
import "@grafikart/drop-files-element";

import {
  InputGroup,
  Button,
  FormControl,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import axiosInstance from "../../helpers/axiosInstance";
import { getJWT } from "../../helpers/JwtHelper";
import { Redirect } from "react-router-dom";
import Loading from "../SimpleComponents/Loading";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.fileInput = createRef();
  }

  state = {
    selectedOption: null,
    redirect: undefined,
    options: undefined,
  };

  componentDidMount() {
    axiosInstance
      .get("/public/getAllCategories")
      .then((response) => {
        this.setState({
          options: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    let model = {
      title: data.get("title"),
      description: data.get("description"),
      phone: data.get("phone"),
      categoryId: this.state.selectedOption.value,
    };

    let formData = new FormData();
    formData.append("model", JSON.stringify(model));

    [...this.fileInput.current.files].forEach((file) => {
      formData.append("files", file);
    });

    axiosInstance
      .post("nowe-ogloszenie", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getJWT(),
        },
      })
      .then((response) => {
        this.setState({ redirect: true });
      });
  };

  showAlert = (e) => {
    if (this.state.selectedOption === null) {
      alert("Proszę wybrać kategorię.");
      e.preventDefault();
    }
  };

  render() {
    const { selectedOption, redirect } = this.state;
    if (redirect === true) {
      return <Redirect to="/" />;
    }
    if (this.state.options === undefined) {
      return <Loading />;
    }
    return (
      <Row className="justify-content-center">
        <Col xs={10}>
          <h4>Nowe ogłoszenie</h4>
          <hr />
        </Col>
        <Col xs={9} className="">
          <form action="#" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>
                Tytuł ogłoszenia{" "}
                <span className={"required"} title={"Pole wymagane"}>
                  *
                </span>
              </Form.Label>
              <FormControl type="text" name="title" />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Kategoria{" "}
                <span className={"required"} title={"Pole wymagane"}>
                  *
                </span>
              </Form.Label>

              <Select
                name="categoryId"
                value={selectedOption}
                onChange={this.handleChange}
                options={this.state.options}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Opis{" "}
                <span className={"required"} title={"Pole wymagane"}>
                  *
                </span>
              </Form.Label>
              <FormControl as="textarea" name="description" rows={7} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Zdjęcia</Form.Label>

              <input
                ref={this.fileInput}
                type="file"
                multiple
                name="files"
                label=" <span class='photos-plus'> + </span> <br /> Przeciągnij i upuść <br/> lub kliknij by wybrać."
                help=""
                is="drop-files"
                onChange={(e) => this.HandleProductImage(e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Lokalizacja{" "}
                <span className={"required"} title={"Pole wymagane"}>
                  *
                </span>
              </Form.Label>
              <FormControl type="text" name="location" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Telefon (opcjonalnie)</Form.Label>
              <FormControl type="text" name="phone" />
            </Form.Group>

            <Form.Group>
              <FormControl
                type="submit"
                className="btn-secondary"
                value="Dodaj"
                onClick={this.showAlert}
                /*   disabled={(this.state.selectedOption === null) ? 'diabled' : ''}*/
              />
            </Form.Group>
          </form>
        </Col>
      </Row>
    );
  }
}
