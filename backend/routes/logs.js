const router = require("express").Router();
let Log = require("../models/log.model");

router.route("/").get((req, res) => {
  Log.find()
    .then((logs) => res.json(logs))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const amount = Number(req.body.amount);

  const newLog = new Log({
    sender,
    receiver,
    amount,
  });

  newLog
    .save()
    .then(() => res.json("Log added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//! GET LOG BY ID
// router.route("/:id").get((req, res) => {
//     Log.findById(req.params.id)
//         .then((log) => res.json(log))
//         .catch((err) => res.status(400).json("Error: " + err));
// });

//! DELETE LOG BY ID
// router.route("/:id").delete((req, res) => {
//   Log.findByIdAndDelete(req.params.id)
//     .then(() => res.json("Log deleted."))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
