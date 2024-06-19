import Customer from "../models/customer.model.js";
import jwt from 'jsonwebtoken';
import appError from "../utils/appError.js";
import bcrypt from 'bcryptjs';

export const registerCustomer = async (req, res) => {
  try {
    const { name, password, email, phonenumber } = req.body;

    if (!name || !password || !email || !phonenumber) {
      return res.status(400).json("please fill all fields");
    }

    const doesEmailExist = await Customer.findOne({ email });

    if (doesEmailExist) return res.status(409).json("email already exists");

    if (password.trim().length < 8) {
      return next(
        new appError("Password must be at least 8 characters"),
        400
      );
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCustomer = await Customer.create({
      name,
      email,
      password : hashedPassword,
      phonenumber,
    });

    if (!newCustomer) {
      return res.status(400).json("failed to register this customer");
    }

    res.status(201).json({ customer : newCustomer });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const retreiveCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    if (!customers) {
      return res.status(404).json({ message: "No customers found" });
    }

    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const retreiveCustomer = async (req, res) => {
  try {
    const {  id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new appError("Fill in all fields.", 400));
    }

    const newEmail = email.toLowerCase();

    const customer = await Customer.findOne({ email: newEmail });

    if (!customer) {
      return next(new appError("Invalid credentials.", 400));
    }

    const comparePasswords = bcrypt.compare(password, customer.password);

    if (!comparePasswords) {
      return next(new appError("Invalid credentials.", 400));
    }

    const { _id: id, name } = customer;

    const token = jwt.sign({ id, name }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(
      new appError(error)
    );
  }
};

export const updateCustomer = async (req, res, next) => {};

export const deleteCustomer = async (req, res, next) => {};
