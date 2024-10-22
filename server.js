const app = require("./app");
require("dotenv").config();
const cloudinary = require("cloudinary");
const connectDB = require("./config/database.js");
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

app.listen("8000", async () => {
  await connectDB();
  await cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SERVER,
  });
  console.log(`cloudinary is connected`);
  console.log("Server is running at http://127.0.0.1:8000");
});

// Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to Unhandled Promise Rejection`);

//     server.close(() => {
//       process.exit(1);
//     });
//   });
