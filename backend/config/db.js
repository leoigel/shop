const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Database is connected `.cyan.bold);
  } catch (error) {
    console.error(`some error happened ${error.message} `.red.bold);
    process.exit(1);
  }
};
module.exports = connectDB;
