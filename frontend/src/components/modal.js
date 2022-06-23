import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
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
        <label className="my-2">
          <b>Receiver</b>
        </label>
        <InputGroup>
          <InputGroup.Text>
            <span role="img" aria-label="ATM emoji">
              🏧
            </span>
          </InputGroup.Text>
          <Form.Control
            type="accoutnNo"
            placeholder="Account Number"
            className="input"
          />
        </InputGroup>
        <p className="error accountno-error"></p>

        <label className="my-2">
          <b>Amount</b>
        </label>
        <InputGroup>
          <InputGroup.Text>
            <span role="img" aria-label="Dollar emoji">
              💲
            </span>
          </InputGroup.Text>
          <Form.Control type="number" placeholder="Amount" className="input" />
        </InputGroup>
        <p className="error balance-error"></p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            let data = document.getElementsByClassName("input");
            let balanceError = document.querySelector(".balance-error");
            let accountNoError = document.querySelector(".accountno-error");
            let sender = props.customer["accountNo"];
            let receiver = data[0].value;
            let amount = data[1].value;
            console.log(sender, receiver, amount);

            //!Receiver
            axios
              .get("http://localhost:5000/customers/accountNo/" + sender)
              .then((response) => {
                let balance = response.data.balance;

                if (balance < amount) {
                  balanceError.innerHTML = "Insufficient Balance";
                } else {
                  axios.post(
                    "http://localhost:5000/customers/update/accountNo/" +
                      sender,
                    { balance: balance - amount }
                  );

                  //!Sender
                  axios
                    .post(
                      "http://localhost:5000/customers/update/accountNo/" +
                        receiver,
                      {
                        balance: response.data.balance - -amount,
                      }
                    )
                    .finally(() => {
                      window.location = "/customers";
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
      <Button variant="dark" size="sm" onClick={() => setModalShow(true)}>
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
