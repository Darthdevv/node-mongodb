import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    rentalStatus: {
      type: String,
      enum: ["available", "rented"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
