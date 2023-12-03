import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const createUser = (req, res) => {
  res.send("from controller");
};

export const deleteUser = (req, res) => {
  res.send("from controller");
};

export const getUser = async (req, res, next) => {
  try {
    const userById = await User.findById(req.params.id);
    if (!userById) next(createError(404, "User not found!"));
    res.status(200).send(userById);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.email && { email: q.email }),
    ...(q.gender && { gender: q.gender }),
    ...(q.domain && { domain: q.domain }),
  };

  if (q.search) {
    filters.$or = [
      { first_name: { $regex: q.search, $options: "i" } },
      { last_name: { $regex: q.search, $options: "i" } },
    ];
  }
  // Pagination options
  const page = parseInt(q.page) || 1;
  const limit = parseInt(q.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const usersList = await User.find(filters).skip(skip).limit(limit);
    if (!usersList || usersList.length === 0)
      next(createError(404, "User not found!"));
    res.status(200).send(usersList);
  } catch (error) {
    next(error);
  }
};
