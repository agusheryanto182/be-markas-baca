const RES = require('./resMessage')
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongodbUri = process.env.MONGODB_URI
    await mongoose.connect(mongodbUri);
    console.log(RES.MONGO_DB_CONNECTED);
  } catch (error) {
    console.error(RES.ERROR_CONNECTING_TO_MONGODB, error);
    process.exit(1);
  }
};

module.exports = connectDB;