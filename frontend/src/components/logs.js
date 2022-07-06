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
    document.getElementsByClassName("nav-link")[2].classList.add("active-page");

    axios.get("http://localhost:5000/logs").then((response) => {
      this.setState({ logs: response.data });
    });
  }
  formatDateTime(date, format) {
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

    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let datePart = monthNames[month - 1] + " " + day + ", " + year;
    let timePart = [hour, minute, second].join(":");

    /* format{
    true: date only,
    false: time only,
    undefined: date and time,
    }
    */

    if (format) return datePart;
    else if (format === false) return timePart;
    else return datePart + " " + timePart;
  }

  logList() {
    return this.state.logs.map((currentlog, i) => {
      return (
        <section className="log">
          <div className="time-box">
            {this.formatDateTime(currentlog.createdAt, true)}
          </div>

          <div className="log-content">
            <img src="./img/right.png" alt="credit card" width={60} />
            <p className="log-details">
              {/* <span>[{this.formatDate(currentlog.createdAt)}] </span> */}
              <span className="sender ">{currentlog.sender} </span>
              <span>sent ${currentlog.amount} to </span>
              <span className="receiver">{currentlog.receiver}</span>
            </p>
          </div>
        </section>
      );
    });
  }

  render() {
    return (
      <>
        <div className="box">
          <NavBar />
          <div className="logs-container">{this.logList()}</div>
        </div>

        {/* <section className="customer-info">
          <div className="frame">
            <div className="user-icon">
              <UserSvg />
            </div>
          </div>
          <div className="info-container">
            <h2 className="user-name">{props.customer.name}</h2>
            <p className="account-number">{props.customer.accountNo}</p>
          </div>
        </section> */}
      </>
    );
  }
}
