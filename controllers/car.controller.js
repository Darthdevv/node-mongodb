import Car from "../models/car.model.js";
import appError from "../utils/appError.js";

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
    const cars = await Car.find({});

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
    const { id } = req.params;
    const car = await Car.findById( id );

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const retreiveCarByModel = async (req, res, next) => {
  try {
    const { model } = req.query;

    const carsByModels = await Car.find({ model });

    if (!carsByModels) {
      return next(new appError("No cars were found by that model", 404));
    }

    res.status(200).json({ carsByModels });
  } catch (error) {
    return next(new appError(error));
  }
}

export const retreiveAvailableCarsByModel = async (req, res, next) => {
  const { model } = req.query;
  try {
    const carsAvailableByModel = await Car.find({ model, rentalStatus: "available" });

    if (!carsAvailableByModel) {
      return next(new appError("No cars were found available by that model", 404));
    }
    res.status(200).json({ carsAvailableByModel });
  } catch (error) {
    return next(new appError(error));
  }
};

export const retreiveRentedOrSpecificModelCars = async (req, res, next) => {
  const { model } = req.query;
  try {
    const cars = await Car.find({
      $or: [{ rentalStatus: 'rented' }, { model }]
    });

    if (!cars) {
      return next(new appError("No cars were found either rented or by that model", 404));
    }
    res.status(200).json({ cars });

  } catch (error) {
    return next(new appError(error));
  }
};

export const retreiveAvailableOrRentedByModelCars = async (req, res, next) => {
  const { model } = req.query;
  try {
    const cars = await Car.find({
      $or: [
        { model, rentalStatus: 'available' },
        { model, rentalStatus: 'rented' }
      ]
    });

    if (!cars) {
      return next(new appError("No cars were found either rented or available by that model", 404));
    }

    res.status(200).json({ cars });

  } catch (error) {
    return next(new appError(error));
  }
};

export const updateCar = async (req, res) => {};

export const deleteCar = async (req, res) => {};
