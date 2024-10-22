const express = require("express");
const {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandControllers");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

const brandRouter = express.Router();

brandRouter.get("/", getBrands);

brandRouter.post("/new", isLoggedIn, isAdmin, createBrand);

brandRouter.put("/:id([0-9a-fA-F]{24})", isLoggedIn, isAdmin, updateBrand);

// brandRouter.delete("/:id([0-9a-fA-F]{24})", isLoggedIn, isAdmin, deleteBrand);

module.exports = brandRouter;
