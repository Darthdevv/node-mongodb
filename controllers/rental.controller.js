import Rental from '../models/rental.model.js';
import Car from '../models/car.model.js';
import appError from '../utils/appError.js';

export const createRental = async (req, res, next) => {
  try {
    let { carId, rentalDate, returnDate } = req.body;

    if ( !rentalDate || !returnDate ) {
      return next(
        new appError("Fill in all fields.", 400)
      );
    }

    const car = await Car.findById(carId);
    if (!car) {
      return next( new appError("Car not found.", 404));
    }

    if (car.rentalStatus === "rented") {
      return next( new appError("Car is already rented.", 400));
    }

    const newRental = await Rental.create({
      car: carId,
      customer: req.customer.id,
      rentalDate,
      returnDate
    });

    const updatedRentalStatus = 'rented';
    await Car.findByIdAndUpdate(carId, { rentalStatus: updatedRentalStatus });

    if (!newRental) {
      return next(new appError("Car couldn't be rented.", 400));
    }

    res.status(201).json(newRental);

  } catch (error) {
    return next(new appError(error));
  }
};

export const retreiveRentals = async (req, res) => {};

export const retreiveRental = async (req, res) => {};

export const updateRental = async (req, res) => {};

export const deleteRental = async (req, res) => {};
