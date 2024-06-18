import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
      const { name, password, email, phonenumber } = req.body;

      if (!name || !password || !email || !phonenumber) {
        return res.status(400).json("please fill all fields");
      }

    const doesEmailExist = await User.findOne({ email });

    if(doesEmailExist) return res.status(409).json("email already exists");

      const newUser = await User.insertOne({
        name,
        email,
        password,
        phonenumber,
      });

      if (!newUser) {
        return res.status(400).json("failed to register this user");
      }

    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json( error);
  }
}

export const retreiveUsers = async (req, res) => {
  try {
    const users = await User.find({}).toArray();

    if(!users) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json(error);
  }
}

export const retreiveUser = async (req, res) => {
  try {

    const { _id: id } = req.params;
    const user = await User.findOne({id});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });

  } catch (error) {
    res.status(500).json(error);
  }
}

export const loginUser = async () => {};

export const updateUser = async () => {};

export const deleteUser = async () => {};