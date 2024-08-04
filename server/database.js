const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Uniforum_JvS:qQrcsJdeKvvpFnsl@uniforumcluster0.kmrbvp8.mongodb.net/test?retryWrites=true&w=majority", {});
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
