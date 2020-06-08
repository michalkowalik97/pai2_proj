import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axiosInstance from "../../helpers/axiosInstance";
import AddLi from "./AddLi";
import { Row, Col } from "react-bootstrap";
import Loading from "../SimpleComponents/Loading";

class Search extends Component {
  state = {
    searchResults: undefined,
  };

  componentDidMount() {
    axiosInstance
      .get("public/szukaj" + this.props.location.search)
      .then((response) => {
        this.setState({
          isLoaded: true,
          searchResults: response.data,
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
    const { error, isLoaded, searchResults } = this.state;
    if (error) {
      return <h1>Error!</h1>;
    } else if (!isLoaded) return <Loading/>;
    else {
      return (
        <Row className="justify-content-center">
          <Col xs={10}>
            {searchResults.map((ad) => (
              <AddLi
                title={ad.title}
                phone={ad.phone}
                description={ad.description}
                id={ad.id}
                href={ad.id}
                photos={JSON.parse(ad.photos)}
              />
            ))}
          </Col>
        </Row>
      );
    }

    return <div></div>;
  }
}

export default withRouter(Search);
