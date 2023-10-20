require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT | 3000;
const dbConnection = require("./config/mongo");

app.listen(PORT, () => {
  console.log(`Up and running on port ${PORT}`);
});

dbConnection();
