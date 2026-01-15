import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB error:", error);
    process.exit(1);
  }
};

export default connectDB;
