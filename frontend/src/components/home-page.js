import { Link } from "react-router-dom";
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <>
        
        <Link to="/customers">Customers List</Link>
        <br />

        <Link to="/logs">Logs</Link>
        <br />
      </>
    );
  }
}
