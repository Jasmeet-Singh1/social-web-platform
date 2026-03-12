const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const db = process.env.MONGO_URI;
    if (!db) {
      console.error(
        'MongoDB URI not set. Set MONGO_URI in environment variables.'
      );
      process.exit(1);
    }
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
