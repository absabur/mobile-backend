const mongoose = require("mongoose");
require("dotenv").config();
const mongo_url = process.env.mongo_url;

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongo_url, options);
    console.log("db is connected.");
    mongoose.connection.on("error", (error) => {
      console.log(`db can not connect for ${error}`);
    });
  } catch (error) {
    console.log(`db can not connect for ${error.message}`);
  }
};

module.exports = connectDB;
