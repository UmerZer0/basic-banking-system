import React, { Component } from "react";
import axios from "axios";
import "./list.style.css";
import NavBar from "./Navbar";
import { ReactComponent as UserSvg } from "./svg/userSolid.svg";
import CustomerDetails from "./CutomerDetails";

const Customer = (props) => (
  <section
    className="customer-info"
    onClick={() => {
      let card = document.getElementById("card");
      let content = document.getElementsByClassName("customer");

      if (card.style.opacity !== "1") card.style.opacity = "1";
      content[0].innerHTML = props.customer.name;
      content[1].innerHTML = props.customer.email;
      content[2].innerHTML = props.customer.accountNo;
      content[3].innerHTML = "$" + props.customer.balance;

      card.style.width = "20rem";
      document.getElementById("transfer-input").classList.add("disp-none");

      document.getElementsByClassName("error")[0].innerHTML = "";
      document.getElementsByClassName("error")[1].innerHTML = "";
    }}
  >
    <div className="frame">
      <div className="user-icon">
        <UserSvg />
      </div>
    </div>
    <div className="info-container">
      <h2 className="user-name">{props.customer.name}</h2>
      <p className="account-number">{props.customer.accountNo}</p>
    </div>
  </section>
);

export default class customersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      accountNo: "",
      email: "",
      balance: 0,
      customers: [],
    };
  }

  componentDidMount() {
    // document.getElementById("card").style.display = "none";
    document.getElementsByClassName("nav-link")[1].classList.add("active-page");
    axios
      .get("http://localhost:5000/customers")
      .then((response) => {
        this.setState({
          name: response.data.name,
          accountNo: response.data.accountNo,
          email: response.data.email,
          balance: response.data.balance,
        });
        this.setState({ customers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  customerList() {
    return this.state.customers.map((currentCustomer) => {
      return (
        <Customer
          customer={currentCustomer}
          receivingCustomer={this.receivingCustomer}
          key={currentCustomer._id}
        />
      );
    });
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="body">
          <div className="table-container">{this.customerList()}</div>
          <div className="details-card">
            <CustomerDetails />
          </div>
        </div>
      </>
    );
  }
}
