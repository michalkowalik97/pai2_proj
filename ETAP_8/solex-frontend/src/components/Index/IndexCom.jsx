import React, { Component } from "react";
import SearchBar from "./SearchBar";
import Popularne from "./Popularne";
import Categories from "./Categories";
import { Jumbotron, Container, Button } from "react-bootstrap";

export default class IndexCom extends Component {
  render() {
    return (
      <div>
        <Jumbotron className=" jumbotron-fluid main-jumbo">
          <Container>
            <h1 className="display-5">SOLEX - Serwis Ogłoszeń Lokalnych</h1>
            <p className="lead"> Twoje miejsce w internecie</p>
            <SearchBar />
            <p>lub</p>
            <Button variant="secondary" href="/nowe-ogloszenie">
              Wystaw ogłoszenie
            </Button>

            <Categories />
          </Container>
        </Jumbotron>
        <Container>
          <Popularne />
        </Container>
      </div>
    );
  }
}
