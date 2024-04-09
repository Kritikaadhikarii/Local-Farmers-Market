// const mongoose = require("mongoose");

// const connectDatabase = () => {
//   mongoose
//     .connect("mongodb+srv://kritika:farmersmarket@local-farmers-market.yyejabr.mongodb.net/test", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((data) => {
//       console.log(`mongodb connected with server: ${data.connection.host}`);
//     });
// };

// module.exports = connectDatabase;


const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
