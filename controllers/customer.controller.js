import Customer from "../models/customer.model.js";

export const registerCustomer = async (req, res) => {
  try {
    const { name, password, email, phonenumber } = req.body;

    if (!name || !password || !email || !phonenumber) {
      return res.status(400).json("please fill all fields");
    }

    const doesEmailExist = await Customer.findOne({ email });

    if (doesEmailExist) return res.status(409).json("email already exists");

    const newCustomer = await Customer.create({
      name,
      email,
      password,
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
    const { _id: id } = req.params;
    const customer = await Customer.findOne({ id });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginCustomer = async () => {};

export const updateCustomer = async () => {};

export const deleteCustomer = async () => {};
