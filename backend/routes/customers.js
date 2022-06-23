const router = require("express").Router();
let Customer = require("../models/customer.model");

router.route("/").get((req, res) => {
  Customer.find()
    .then((customers) => res.json(customers))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const accountNo = req.body.accountNo;
  const email = req.body.email;
  const balance = Number(req.body.balance);

  const newCustomer = new Customer({
    name,
    accountNo,
    email,
    balance,
  });

  newCustomer
    .save()
    .then(() => res.json("Customer added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//! GET CUSTOMER BY ID
router.route("/:id").get((req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => res.json(customer))
    .catch((err) => res.status(400).json("Error: " + err));
});

//! GET CUSTOMER BY ACCOUNT NO
router.route("/accountNo/:accountNo").get((req, res) => {
  Customer.findOne({ accountNo: req.params.accountNo })
    .then((customer) => res.json(customer))
    .catch((err) => res.status(400).json("Error: " + err));
});

//! UPDATE CUSTOMER BY accountNo
router.route("/update/accountNo/:accountNO").post((req, res) => {
  Customer.findOne({ accountNo: req.params.accountNO })
    .then((customer) => {
      customer.balance = Number(req.body.balance);

      customer
        .save()
        .then(() => res.json("Customer updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
