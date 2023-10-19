const mongoose = require("mongoose");

const dbConnect = () => {
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
        console.log("*****mongoose DB Connection successful****");
      } else {
        console.log("*****Connection error ****");
      }
    }
  );
};

module.exports = dbConnect;
