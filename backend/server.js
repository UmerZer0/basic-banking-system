const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const customersRouter = require("./routes/customers");
const logsRouter = require("./routes/logs");

app.use("/customers", customersRouter);
app.use("/logs", logsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
