require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/mongo");
const morganBody = require("morgan-body");
const { loggerSlack } = require("./utils/handleLogger");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const PORT = process.env.PORT | 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
  skip: function (req, res) {
    return (
      [403, 404, 409, 401].includes(res.statusCode) || res.statusCode < 400
    );
  },
  stream: loggerSlack,
});

/**
 * API endpoint
 */
app.use("/api", require("./routes"));

/**
 * API documentation
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Up and running on port ${PORT}`);
});

dbConnection();
