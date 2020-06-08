import React, { Component } from "react";
import "./Unauthorized.css";

class Unauthorized extends Component {
  render() {
    return (
      <div className="unauthorizedPage">
        <h1>Nie masz uprawnień do wyświetlenia tej strony</h1>
      </div>
    );
  }
}

export default Unauthorized;
