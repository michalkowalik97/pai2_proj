import React, { Component } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheck } from "@fortawesome/free-solid-svg-icons";
import NewAdd from "./NewAdd";
import axiosInstance from "../../helpers/axiosInstance";
import { getJWT } from "../../helpers/JwtHelper";
import Loading from "../SimpleComponents/Loading";

export default class MyAdds extends Component {
  state = {
    isLoaded: false,
    ads: undefined,
  };
  componentDidMount() {
    axiosInstance
      .get("pending-ads", {
        headers: {
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
  render() {
    const { isLoaded, ads } = this.state;

    if (!isLoaded) {
      return <Loading />;
    } else {
      const items = ads.map((ad) => (
        <NewAdd title={ad.title} date={ad.dateTime} id={ad.id} />
      ));
      return <div>{items}</div>;
    }
  }
}
