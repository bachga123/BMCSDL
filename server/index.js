const express = require("express");
const oracledb = require("oracledb");
const app = express();
const connection = require("./middleware/checkConnection");

app.get("/", (req, res) => res.send("Hello world"));

connection.checkConnection();

const PORT = 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
