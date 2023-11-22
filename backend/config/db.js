import mongoose from "mongoose";
import colors from "colors";

const connectDB = async (uri) => {
  try {
    const connection = await mongoose.connect(uri);
    console.log(colors.green(connection.connection.host));
  } catch (error) {
    console.log(colors.red(error.message));
    process.exit(1)
  }
};

export default connectDB;
