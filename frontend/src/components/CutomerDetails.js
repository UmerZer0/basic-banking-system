import React, { Component } from "react";
import { ReactComponent as UserSvg } from "./svg/userSolid.svg";
import "./CustomerDetails.style.css";
import { ReactComponent as XmarkSvg } from "./svg/xmark-solid.svg";
import { Button, Modal, InputGroup, Form } from "react-bootstrap";
import axios from "axios";

function CutomerDetails() {
  return (
    <div id="card">
      <button
        className="close"
        onClick={() => (document.getElementById("card").style.opacity = "0")}
      >
        <XmarkSvg />
      </button>
      <div className="pic-frame">
        <div className="profile-pic">
          <UserSvg />
        </div>
      </div>
      <section className="top-content">
        <h2 className="customer name"></h2>
        <p className="customer email"></p>
        <p className="customer acc-number"></p>
        <p className="customer balance"></p>
      </section>

      <section id="transfer-input" className="disp-none">
        <label className="input-label">
          <b>Receiver</b>
        </label>

        <div className="input-field-container">
          <span className="emoji-container">
            <span role="img" aria-label="Dollar emoji">
              🏧
            </span>
          </span>
          <input
            type="email"
            inputMode="email"
            placeholder="Account Number"
            className="input-field"
          />
        </div>
        <p className="error accountno-error"></p>

        <label className="input-label">
          <b>Amount</b>
        </label>

        <div className="input-field-container">
          <span className="emoji-container">
            <span role="img" aria-label="Dollar emoji">
              💲
            </span>
          </span>
          <input
            type="number"
            inputMode="number"
            placeholder="Amount"
            className="input-field"
          />
        </div>
        <p className="error balance-error"></p>
      </section>

      <section>
        <button
          className="send-btn"
          onClick={() => {
            let card = document.getElementById("card");
            let transferInput = document.getElementById("transfer-input");

            if (transferInput.classList.contains("disp-none")) {
              card.style.width = "25rem";
              transferInput.classList.remove("disp-none");
            } else {
              // card.style.width = "20rem";
              // transferInput.classList.add("disp-none");

              let data = document.getElementsByClassName("input-field");
              let receiver = data[0].value;
              let amount = data[1].value;

              let sender = document.querySelector(".acc-number").innerHTML;

              let accountnoError = document.querySelector(".accountno-error");
              let balanceError = document.querySelector(".balance-error");

              let validity = true;

              if (receiver.length !== 12) {
                //Check if account number is valid
                accountnoError.innerHTML =
                  "Please enter a valid account number";
                validity = false;
              } else if (sender === receiver) {
                //Check if receiver is not the same as sender
                accountnoError.innerHTML = "You can't send money to yourself";
                validity = false;
              } else {
                //Check if account number exists
                axios
                  .get("http://localhost:5000/customers/accountNo/" + receiver)
                  .then((response) => {
                    if (response.data.length === 0) {
                      accountnoError.innerHTML = "Customer does not exist";
                      validity = false;
                    }
                  });
              }

              if (amount === "" || amount <= 0) {
                //Check if amount is valid
                balanceError.innerHTML = "Please enter a valid amount";
                validity = false;
              }

              if (validity) {
                axios
                  .get("http://localhost:5000/customers/accountNo/" + sender)
                  .then((response) => {
                    let senderBalance = response.data.balance;

                    if (senderBalance < amount) {
                      balanceError.innerHTML = "Insufficient Balance";
                    } else {
                      axios.post(
                        "http://localhost:5000/customers/update/accountNo/" +
                          sender,
                        { balance: senderBalance - amount }
                      );

                      //!Sender

                      axios
                        .get(
                          "http://localhost:5000/customers/accountNo/" +
                            receiver
                        )
                        .then((response) => {
                          let receiverBalance = response.data.balance;
                          axios
                            .post(
                              "http://localhost:5000/customers/update/accountNo/" +
                                receiver,
                              {
                                balance: receiverBalance - -amount,
                              }
                            )
                            .finally(() => {
                              window.location = "/customers";
                            });
                        });

                      //! Record of transaction
                      axios.post("http://localhost:5000/logs/add", {
                        sender: sender,
                        receiver: receiver,
                        amount: amount,
                      });
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }
            }
          }}
        >
          Send Money
        </button>
      </section>
    </div>
  );
}

export default CutomerDetails;

//TODO: Add the following to the CustomerDetails div:
/*  Add box shadow
    ?Fix the color on div
    Add functionalty to the button
    ?Do the nav thing
    ?Do them logs */