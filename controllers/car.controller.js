import Car from "../models/car.model.js";

export const createCar = async (req, res) => {
  try {
    const { name, model, rentalStatus } = req.body;

    if (!name || !model || !rentalStatus) {
      return res.status(400).jsonn("Please fill all fields.");
    }

    const newCar = await Car.create({
      name,
      model,
      rentalStatus,
    });

    if (!newCar) {
      return res.status(400).json("failed to add this car");
    }

    res.status(201).json({ car: newCar });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const retreiveCars = async (req, res) => {
    try {
    const cars = await Car.find();

    if (!cars) {
      return res.status(404).json({ message: "No cars found" });
    }

    res.status(200).json({ cars });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const retreiveCar = async (req, res) => {
  try {
    const { _id: id } = req.params;
    const car = await Car.findOne({ id });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCar = async (req, res) => {};

export const deleteCar = async (req, res) => {};
