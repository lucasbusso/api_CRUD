require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/mongo");

const PORT = process.env.PORT | 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes"));
app.use(express.static("storage"));

app.listen(PORT, () => {
  console.log(`Up and running on port ${PORT}`);
});

dbConnection();
