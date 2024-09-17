require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT | 3000;
const { dbConnectNoSql } = require("./config/mongo");
const { dbConnectMySql } = require("./config/mysql");

// Change this global var to switch DB engine (MySQL or MongoDB)
const DB_ENGINE = process.env.DB_ENGINE;

app.listen(PORT, () => {
  console.log(`Up and running on port ${PORT}`);
});

DB_ENGINE === "nosql" ? dbConnectNoSql() : dbConnectMySql();
