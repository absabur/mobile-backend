const express = require("express");
const {
  getAllPhones,
  createPhone,
  updatePhone,
  deletePhone,
  getPhone,
  comparePhone,
  specsTable,
} = require("../controllers/phoneControllers");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

const phoneRouter = express.Router();

phoneRouter.get("/", getAllPhones);

phoneRouter.get("/specs-table", specsTable);

phoneRouter.get("/compare", comparePhone);

phoneRouter.get("/:slug", getPhone);

phoneRouter.post("/new", isLoggedIn, isAdmin, createPhone);

phoneRouter.put("/:id([0-9a-fA-F]{24})", isLoggedIn, isAdmin, updatePhone);

phoneRouter.delete("/:id([0-9a-fA-F]{24})", isLoggedIn, isAdmin, deletePhone);

module.exports = phoneRouter;
