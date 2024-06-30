import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://yousefelgohary455:ihz0j15DwkXUR8t1@cluster0.dkuapwq.mongodb.net/car-rental-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to MongoDB sucessfully ✅");
  } catch (error) {
    console.log(`Failed to connect to Mongo: ${error.message} ❌`);
  }
};

export default connectToMongoDB;
