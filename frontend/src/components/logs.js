import React, { Component } from "react";
import axios from "axios";
import "./logs.style.css";
import NavBar from "./Navbar";
import CustomerDetails from "./CustomerDetails";

export default class logs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: {},
    };
  }

  componentDidMount() {
    document.getElementsByClassName("nav-link")[2].classList.add("active-page");

    axios.get("http://localhost:5000/logs").then((response) => {
      let formatData = {};
      for (let i = response.data.length - 1; i >= 0; i--) {
        let date = this.formatDateTime(response.data[i].createdAt, true);

        if (formatData[date]) formatData[date].push(response.data[i]);
        else formatData[date] = [response.data[i]];
      }

      this.setState({ logs: formatData });
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

  clickHandler = (customer) => {
    let card = document.getElementById("card");
    let content = document.getElementsByClassName("customer");

    if (card.style.opacity !== "1") card.style.opacity = "1";

    axios
      .get(`http://localhost:5000/customers/accountNo/${customer}`)
      .then((response) => {
        content[0].innerHTML = response.data.name;
        content[1].innerHTML = response.data.email;
        content[2].innerHTML = response.data.accountNo;
        content[3].innerHTML = "$" + response.data.balance;
      });

    let btnCopy = document.querySelector(".send-btn");
    btnCopy.innerHTML = "Copy to Clipboard";
    btnCopy.onclick = () => {
      /* Get the text field */
      let copyText = document.querySelector(".acc-number");

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText.innerHTML);
    };
    document.getElementById("transfer-input").style.display = "none";
  };
  destructArr(arr) {
    return arr.map((key, i) => {
      return (
        <section key={i} className="log">
          <div className="log-content">
            <div className="time-box grid-children">
              {this.formatDateTime(key.createdAt, false)}
            </div>
            <div className="grid-children tick-icon">
              <img src="./img/right.png" alt="credit card" width={60} />
            </div>
            <p className="log-details grid-children">
              <span>
                <span onClick={() => this.clickHandler(key.sender)}>
                  {key.sender}
                </span>{" "}
                sent ${key.amount} to{" "}
                <span onClick={() => this.clickHandler(key.receiver)}>
                  {key.receiver}
                </span>
              </span>
            </p>
            <div className="grid-children"> </div>
          </div>
        </section>
      );
    });
  }

  logList() {
    return Object.keys(this.state.logs).map((key, i) => {
      let objArray = this.state.logs[key];

      return (
        <div key={i.toString()} className="log-group-by-date">
          <h2 className="log date-head">{key}</h2>
          {this.destructArr(objArray)}
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="body-container">
          <section className="logs-container">{this.logList()}</section>
          <section className="card-section">
            <div className="position-fixed">
              <CustomerDetails />
            </div>
          </section>
        </div>
      </>
    );
  }
}
