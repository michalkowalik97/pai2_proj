import React, { Component } from "react";
import { Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faSuitcase,
  faHome,
  faBed,
  faMobile,
  faTractor,
  faTshirt,
  faDog,
  faPaintRoller,
  faFutbol,
  faMusic,
  faRing,
  faMoneyBillWave,
  faHandshake,
  faGuitar,
  faBabyCarriage,
} from "@fortawesome/free-solid-svg-icons";

export default class Categories extends Component {
  render() {
    return (
      <Row className={"my-5 category"}>
        {/*           1	Motoryzacja
                    2	Nieruchomości
                    3	Praca
                    4	Dom i Ogród
                    5	Elektronika
                    6	Moda
                    7	Rolnictwo
                    8	Zwierzęta
                    9	Dla Dzieci
                    10	Sport i Hobby
                    11	Muzyka i Edukacja
                    12	Usługi i Firmy
                    13	Ślub i Wesele
                    14	Oddam za darmo
                    15	Zamienię
                    16	Dla ogrodu
                    17	Materiały budowlane*/}
        <Col xs={1} className={"mx-3 p-3 category"}>
          <Link to={"/szukaj?query=&catId=1"} className={"black-link"}>
            <div>
              <FAIcon icon={faCar} color={"#eb0000"} size="4x" />
            </div>
            <div>Motoryzacja</div>
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=2"} className={"black-link"}>
            <FAIcon icon={faHome} color={"#383838"} size="4x" />
            Nieruchomości
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=3"} className={"black-link"}>
            <FAIcon icon={faSuitcase} size="4x" color={"#403834"} />
            Praca
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=4"} className={"black-link"}>
            <FAIcon icon={faBed} size="4x" color={"#ababab"} />
            Dom i ogród
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=5"} className={"black-link"}>
            <FAIcon icon={faMobile} color={"#403834"} size="4x" />
            Elektronika
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=6"} className={"black-link"}>
            <FAIcon icon={faTshirt} size="4x" color={"#012d4d"} />
            Moda
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=7"} className={"black-link"}>
            <FAIcon icon={faTractor} size="4x" color={"#8f8500"} />
            Rolnictwo
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=8"} className={"black-link"}>
            <FAIcon icon={faDog} size="4x" color={"#6e3500"} />
            Zwierzęta
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=9"} className={"black-link"}>
            <FAIcon icon={faBabyCarriage} color={"#f04f43"} size="4x" />
            Dla dzieci
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=10"} className={"black-link"}>
            <FAIcon icon={faFutbol} color={"black"} size="4x" />
            Sport i hobby
          </Link>
        </Col>

        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=11"} className={"black-link"}>
            <FAIcon icon={faGuitar} color={"#a85c32"} size="4x" />
            Muzyka i Edukacja
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=12"} className={"black-link"}>
            <FAIcon icon={faPaintRoller} size="4x" color={"#009b9e"} />
            Usługi i firmy
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=13"} className={"black-link"}>
            <FAIcon icon={faRing} size="4x" color={"gold"} />
            Ślub i wesele
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=14"} className={"black-link"}>
            <FAIcon icon={faMoneyBillWave} size="4x" color={"green"} />
            Oddam za darmo
          </Link>
        </Col>
        <Col xs={1} className={"mx-3 p-3"}>
          <Link to={"/szukaj?query=&catId=15"} className={"black-link"}>
            <FAIcon icon={faHandshake} size="4x" color={"#403834"} />
            Zamienię
          </Link>
        </Col>
      </Row>
    );
  }
}
