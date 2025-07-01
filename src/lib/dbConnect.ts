import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("✅ Already connected to the database");
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI not found in environment variables.");
    process.exit(1);
  }

  try {
    const db = await mongoose.connect(uri, {
      dbName: "todoapp",
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

export default dbConnect;
