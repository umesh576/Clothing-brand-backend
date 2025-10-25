import mongoose from "mongoose";
const connectDatabase = async (DB_URi: string) => {
  // Database connection logic will be implemented here in the future
  await mongoose.connect(DB_URi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);
  console.log("Database connected successfully");
};

export default connectDatabase;
