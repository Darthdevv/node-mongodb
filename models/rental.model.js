import mongoose, { Schema } from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    rentalDate: {
      type: Date,
      default: Date.now
    },
    returnDate: { type: Date },
  },
  { timestamps: true }
);

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;
