import React, {Component} from "react";
import {Button, Row, Col, Image} from "react-bootstrap";
import {FontAwesomeIcon as FAIcon} from "@fortawesome/react-fontawesome";
import {faEye, faCheck} from "@fortawesome/free-solid-svg-icons";
import NewAdd from "./NewAdd";

export default class MyAdds extends Component {
    render() {
        return (
            <div>
                <NewAdd title="Volkswagen passat b5" date={"25.05.2020"}/>
                <NewAdd title="Volkswagen passat b5" date={"25.05.2020"}/>
                <NewAdd title="Volkswagen passat b5" date={"25.05.2020"}/>
            </div>

        );
    }
}