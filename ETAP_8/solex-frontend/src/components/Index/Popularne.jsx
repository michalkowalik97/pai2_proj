import React, {Component} from "react";
import {Row, Col, Card} from "react-bootstrap";
import {FontAwesomeIcon as FAIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import Loading from "../SimpleComponents/Loading";
import axiosInstance, {baseURL} from "../../helpers/axiosInstance";
import {Link} from "react-router-dom";

class Popularne extends Component {
    state = {cards: undefined};

    componentDidMount() {
        axiosInstance.get("public/szukaj?query=").then((response) => {
            let cards = [];
            let data = this.shuffle(response.data);
            for (let i = 0; i < 4; i++) {
                if (data[i] !== undefined) cards.push(data[i]);
            }
            this.setState({cards: cards});
        });
    }

    shuffle = (a) => {
        if (a.length > 0) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
        }
        return a;
    };

    render() {
        if (this.state.cards === undefined) return <Loading/>;
        return (
            <div>
                <h3>Popularne dzisiaj</h3>
                <Row md="5" style={{alignItems: "center"}}>
                    {this.state.cards.map((card) => (
                        <Karta
                            id={card.id}
                            title={card.title}
                            photos={JSON.parse(card.photos)}
                        />
                    ))}
                    <Col>
                        <Link
                            to="/szukaj"
                            style={{textDecoration: "none", color: "#3e3f3a"}}
                        >
                            <FAIcon icon={faArrowCircleRight} size="5x"/>
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}

class Karta extends Component {
    render = () => {
        return (
            <div style={{padding: "5px"}}>
                <Link
                    to={"/ogłoszenie?id=" + this.props.id}
                    style={{textDecoration: "none", color: "black"}}
                >
                    <Card>
                        <Card.Img
                            variant="top"
                            src={
                                this.props.photos[0] === undefined
                                    ? "solex-192.png"
                                    : baseURL + "public/" + this.props.photos[0]
                            }
                        />
                        <Card.Body>
                            <Card.Text>{this.props.title}</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        );
    };
}

export default Popularne;
