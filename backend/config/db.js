import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Connect Db success"));
  } catch (err) {
    console.log(err.message);
  }
};
