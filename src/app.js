const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const openApiSpecification = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
app.use(morgan("dev"));
app.use("/api", require("./routes"));

/**
 * API documentation
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification));

module.exports = app;
