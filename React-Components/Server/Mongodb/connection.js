// const mongoose = require("mongoose");

// const URL = "mongodb://localhost:27017/mysign";
// const monogodbconnection = async () => {
//   try {
//     await mongoose.connect(URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Mongoo DB Connected");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// module.exports = monogodbconnection;
const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/mysign";
const mongodbConnection = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = mongodbConnection;
