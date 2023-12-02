import User from "../models/user.model.js";

export const createUser = (req, res) => {
  res.send("from controller");
};

export const deleteUser = (req, res) => {
  res.send("from controller");
};

export const getUser = async (req, res, next) => {
  try {
    const userById = await User.findById(req.params.id);
    if (!userById) {
      console.log("User not found");
    }
    res.status(200).send(userById);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const usersList = await User.find();
    if (!usersList) {
      console.log("User not found");
    }
    res.status(200).send(usersList);
  } catch (error) {
    next(error);
  }
};
