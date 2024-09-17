const DB_ENGINE = process.env.DB_ENGINE;
const dynamicPath = DB_ENGINE === "nosql" ? "./noSQL" : "./SQL";

const models = {
  userModel: require(`${dynamicPath}/user.model`),
  clientModel: require(`${dynamicPath}/client.model`),
};

module.exports = models;
