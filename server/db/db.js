const mongoose = require("mongoose");
const config = require("../config/configSecret");

mongoose.set("strictQuery", false);
const dbUrl = config.dbURL;

// Connect MongoDB at default port 27017.
const dbConnect = mongoose.connect(
  dbUrl,

  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

module.exports = dbConnect;
