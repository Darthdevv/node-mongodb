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

export const retreiveRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find();

    if (!rentals) {
      return res.status(404).json({ message: "No rentals found" });
    }

    res.status(200).json({ rentals });
  } catch (error) {
    return next(new appError(error));
  }
};

export const retreiveRental = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rental = await Rental.findById(id);

    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    res.status(200).json({ rental });
  } catch (error) {
    return next(new appError(error));
  }
};

export const updateRental = async (req, res, next) => {
  try {
    let updatedRental;
    const { id } = req.params;

    let { carId, rentalDate, returnDate } = req.body;

    if (!rentalDate || !returnDate) {
      return next(new appError("Fill in all fields.", 400));
    }

    const rental = await Rental.findById(id);
    console.log(rental.customer);
    console.log(req.customer.id);

    if (rental.customer == req.customer.id) {
      updatedRental = await Rental.findByIdAndUpdate(
        id,
        {
          car: carId,
          customer: req.customer.id,
          rentalDate,
          returnDate,
        },
        { new: true }
      );
    }

    if (!updatedRental) {
      return res.status(400).json("failed to update this rental.");
    }

    res.status(200).json({ updatedRental });

  } catch (error) {
    return next(new appError(error));
  }
};

export const deleteRental = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new appError("Rental unavailable.", 400));
    }

    const rental = await Rental.findById(id);

    if (rental.customer == req.customer.id) {
      await Rental.findByIdAndDelete(id);
    }

    res.status(204).json({ message: "Rental deleted successfully." });

  } catch (error) {
    return next(new appError(error));
  }
};
