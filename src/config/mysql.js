const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Base de datos sincronizada");
      })
      .catch((err) => {
        console.error("Error al sincronizar la base de datos:", err);
      });
    console.log("*****MySQL connection successful*****");
  } catch (error) {
    console.log("MySQL connection error: " + error);
  }
};

module.exports = { sequelize, dbConnectMySql };
