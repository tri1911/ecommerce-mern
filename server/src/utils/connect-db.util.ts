import mongoose from "mongoose";

const connectDb = async () => {
  if (!process.env.MONGODB_URI) {
    console.log("MongoDB uri is missing");
    process.exit(1);
  }

  const dbUri = process.env.MONGODB_URI;

  console.log(`Connecting to ${dbUri}...`);

  try {
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;
