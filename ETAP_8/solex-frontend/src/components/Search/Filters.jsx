import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {Row, Col, Card, Image, Container, NavLink} from "react-bootstrap";
import SearchBar from "../Index/SearchBar";
import axiosInstance from "../../helpers/axiosInstance";
import Loading from "../SimpleComponents/Loading";
import Redirect from "react-router-dom/es/Redirect";
import SearchInput from "../Index/SearchInput";

class Filters extends Component {
    state = {
        subcategories: null,
        catId: null,
        redirect: false,
        redirectTo: undefined,
        parents: undefined,
    };

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        if (this.props.location.search != "") {
            axiosInstance
                .get("/public/podkategorie" + this.props.location.search)
                .then((response) => {
                    //   console.log(response);
                    this.setState({
                        subcategories: response.data,
                        catId: this.props.location.search,
                    });
                    console.log(this.state);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (params.get("catId") !== null) {
            axiosInstance
                .get("/public/getCategory?id=" + params.get("catId"))
                .then((response) => {
                    console.log(response);
                    this.setState({parents: response.data});
                })
                .catch((error) => {
                    console.log("error" + error);
                });
        }
    }

    selectCategory = (selectedOption) => {
        this.setState({
            redirectTo: selectedOption.target.value,
            redirect: true,
        });
        //console.log("selected: ", selectedOption.target.value);
    };

    categoryBar = () => {
        let link = [];
        if (this.state.parents === undefined) {
            return (
                <div>
                    <Link to={"/"}>Solex</Link>
                </div>
            );
        } else {
            let category = this.state.parents;
            while (true) {
                if (category.parent === null) {
                    link.push(
                        <a href={"/szukaj?query=&catId=" + category.id}>{category.name}</a>
                    );
                    link.push(<a href={"/"}>Solex</a>);
                    link.reverse();
                    return (
                        <div>
                            {" "}
                            {link.map((li, i) => (
                                <span>
                  {li} {link.length === i + 1 ? "" : "->"}{" "}
                </span>
                            ))}{" "}
                        </div>
                    );
                } else {
                    link.push(
                        <a href={"/szukaj?query=&catId=" + category.id}>{category.name}</a>
                    );
                    category = category.parent;
                }
            }
        }
    };

    renderOption = (cat) => {
        if ("?query=&catId=" + cat.id === this.state.catId) {
            return (
                <option
                    value={"/szukaj?query=&catId=" + cat.id}
                    selected={
                        this.state.catId == "?query=&catId=" + cat.id
                            ? "selected"
                            : ""
                    }
                >
                    {cat.name}
                </option>);
        }

        if (cat.parent != null && "?query=&catId=" + cat.parent.id === this.state.catId) {
            return (
                <option
                    value={"/szukaj?query=&catId=" + cat.id}
                    selected={
                        this.state.catId == "?query=&catId=" + cat.id
                            ? "selected"
                            : ""
                    }
                >
                    {cat.name}
                </option>);
        }
    };

    render() {
        if (this.state.redirect) {
            window.location.reload();
            return <Redirect to={this.state.redirectTo}/>;
        }

        if (
            this.state.subcategories !== null &&
            this.state.subcategories !== undefined
        ) {
            return (
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={9} className={"my-3"}>
                            <SearchInput/>
                        </Col>
                    </Row>
                    <Row className="justify-content-start">
                        <Col xs={9} className={"my-3"}>
                            {this.categoryBar()} <br/>
                            Podkategorie: <br/>
                            <select name="subcategories" id="" onChange={this.selectCategory}>
                                {this.state.subcategories.map((cat) => (
                                    this.renderOption(cat)
                                ))}
                                ;
                            </select>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={9} className={"my-3"}>
                            <SearchInput/>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default withRouter(Filters);
