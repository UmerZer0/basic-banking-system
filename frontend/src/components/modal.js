import React from "react";
import axios from "axios";
import { Button, Modal, InputGroup, Form } from "react-bootstrap";
import "./modal.style.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Transfer Money
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className="mz-2">
          <b>Sender: </b>
        </label>

        <h5>{props.customer["name"]}</h5>

        <label className="">
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

        <label className="">
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
        <p className="error accountno-error">Erorr</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            let data = document.getElementsByClassName("input");
            let receiver = data[0].value;
            let amount = data[1].value;

            //TODO Add all the errors
            let balanceError = document.querySelector(".balance-error");
            let sender = props.customer["accountNo"];
            console.log(sender, receiver, amount);

            //!Receiver
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
                      "http://localhost:5000/customers/accountNo/" + receiver
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
          }}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant="dark"
        className="btn-transfer"
        onClick={() => setModalShow(true)}
      >
        Send Money
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        customer={props.customer}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default App;
