import React, { Component } from "react";
import axios from "axios";
import "./list.style.css";
import { Table } from "react-bootstrap";
import Modal from "./modal";

const Customer = (props) => (
  <tr>
    <td>{props.customer.name}</td>
    <td>{props.customer.accountNo}</td>
    <td>{props.customer.email}</td>
    <td>${props.customer.balance}</td>
    <td className="dp-flex text-center">
      <Modal customer={props.customer} />
    </td>
  </tr>
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
      <div className="table-container">
        <Table responsive="sm" hover striped className="table" size="sm">
          <thead className="text-primary">
            <tr>
              <th>Name</th>
              <th>Account No.</th>
              <th>Email</th>
              <th>Balance</th>
              {/* <th>Send</th> */}
            </tr>
          </thead>
          <tbody>{this.customerList()}</tbody>
        </Table>
      </div>
    );
  }
}
