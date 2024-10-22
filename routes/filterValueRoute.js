const express = require("express");
const {
  getFilterValues,
  createFilterValue,
  updateFilterValue,
  deleteFilterValue,
} = require("../controllers/filterValueController");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

const filterValueRouter = express.Router();

filterValueRouter.get("/", getFilterValues);

filterValueRouter.post("/new", isLoggedIn, isAdmin, createFilterValue);

filterValueRouter.put(
  "/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  updateFilterValue
);

filterValueRouter.delete(
  "/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  deleteFilterValue
);

module.exports = filterValueRouter;
