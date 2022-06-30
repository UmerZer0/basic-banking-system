import React, { Component } from "react";
import axios from "axios";
import "./logs.style.css";
import { ListGroup } from "react-bootstrap";
import NavBar from "./Navbar";

export default class logs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
    };
  }

  componentDidMount() {
    //TODO get logs from backend
    axios.get("http://localhost:5000/logs").then((response) => {
      this.setState({ logs: response.data });
    });
  }
  formatDate(date) {
    let d = new Date(date),
      year = d.getFullYear(),
      month = "" + d.getMonth(),
      day = "" + d.getDate(),
      hour = "" + d.getHours(),
      minute = "" + d.getMinutes(),
      second = "" + d.getSeconds();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;
    if (second.length < 2) second = "0" + second;

    console.log(year, month, day);
    return (
      [year, month, day].join("-") + " " + [hour, minute, second].join(":")
    );
  }
  logList() {
    return this.state.logs.map((currentlog, i) => {
      return (
        <ListGroup.Item variant="warning" className="list-item">
          <span>[{this.formatDate(currentlog.createdAt)}] </span>
          <span className="sender ">{currentlog.sender} </span>
          <span>sent ${currentlog.amount} to </span>
          <span className="receiver">{currentlog.receiver}</span>
        </ListGroup.Item>
      );
    });
  }

  render() {
    return (
      <div className="box">
        <NavBar />
        <h1 className="d-flex justify-content-center bold fw-bold m-3">Logs</h1>
        <ListGroup className="transactions-list">{this.logList()}</ListGroup>
      </div>
    );
  }
}
