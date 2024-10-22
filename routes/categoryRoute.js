const express = require("express");
const {
  getCategorys,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

const categoryRouter = express.Router();

categoryRouter.get("/", getCategorys);

categoryRouter.post("/new", isLoggedIn, isAdmin, createCategory);

categoryRouter.put(
  "/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  updateCategory
);

// categoryRouter.delete(
//   "/:id([0-9a-fA-F]{24})",
//   isLoggedIn,
//   isAdmin,
//   deleteCategory
// );

module.exports = categoryRouter;
