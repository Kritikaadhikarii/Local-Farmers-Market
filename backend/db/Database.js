const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://kritika:farmersmarket@local-farmers-market.yyejabr.mongodb.net/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;

// newwwwwwwwwwwwwwwwwwww
// // Import the mongoose library
// const mongoose = require("mongoose");

// // Define the MongoDB connection URI with a fallback to a default value
// const uri = process.env.DB_URL || 'mongodb+srv://kritika:farmersmarket@local-farmers-market.yyejabr.mongodb.net';

// // Print the URI to console for debugging purposes
// console.log("DB_URL:", uri);

// // Define a function to connect to the MongoDB database
// const connectDatabase = () => {
//   // Use mongoose to connect to the MongoDB database
//   mongoose.connect(uri, { useUnifiedTopology: true }) // Connect to MongoDB with unified topology
//     .then(() => {
//       // Log a message to console when the connection is successful
//       console.log("MongoDB connected successfully");
//     })
//     .catch((error) => {
//       // Log an error message if the connection fails
//       console.error("MongoDB connection error:", error.message);
//     });
// };

// // Export the connectDatabase function so it can be used elsewhere in the application
// module.exports = connectDatabase;
