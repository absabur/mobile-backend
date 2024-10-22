const express = require("express");
const {
  getSpecss,
  getSpecs,
  createSpecs,
  updateSpecs,
  deleteSpecs,
} = require("../controllers/specificationNameControllers");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

const specRouter = express.Router();

specRouter.get("/", getSpecss);
specRouter.get("/:id", getSpecs);

specRouter.post("/new", isLoggedIn, isAdmin, createSpecs);

specRouter.put("/:id([0-9a-fA-F]{24})", isLoggedIn, isAdmin, updateSpecs);

specRouter.delete("/:id([0-9a-fA-F]{24})", isLoggedIn, isAdmin, deleteSpecs);

module.exports = specRouter;
