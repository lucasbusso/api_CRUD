const mongoose = require("mongoose");

const dbConnectNoSql = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.set("strictQuery", true);
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, response) => {
      if (!err) {
        console.log("*****MongoDB connection successful****");
      } else {
        console.log("*****Connection error ****", { err });
      }
    }
  );
};

module.exports = { dbConnectNoSql };
