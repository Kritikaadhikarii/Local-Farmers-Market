const mongoose = require("mongoose");

// Function for connecting to the MongoDB database
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      // If connection is successful, then logging the host of the connected server
      console.log(`mongodb connected with server: ${data.connection.host}`);
    });
};

// Exporting the connectDatabase function for using it in other parts of the application
module.exports = connectDatabase;
