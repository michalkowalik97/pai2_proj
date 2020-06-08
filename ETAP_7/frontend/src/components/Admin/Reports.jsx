import React, {Component} from "react";
import {Button, Row, Col, Image} from "react-bootstrap";
import {FontAwesomeIcon as FAIcon} from "@fortawesome/react-fontawesome";
import {faEye, faCheck} from "@fortawesome/free-solid-svg-icons";
import Report from "./Report";

export default class Reports extends Component {
    render() {
        return (
            <div>
                <Report title="Volkswagen passat b5" date={"25.05.2020"}/>
                <Report title="Volkswagen passat b5" date={"25.05.2020"}/>
                <Report title="Volkswagen passat b5" date={"25.05.2020"}/>
            </div>

        );
    }
}