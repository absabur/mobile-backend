const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;
const Category = require("../models/categoryModel");
const Specs = require("../models/specificationNameModel.js");
const FilterValue = require("../models/filterValueModel");
const Phone = require("../models/phoneModel.js");

exports.createCategory = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw createError(400, "Category Name is required");
    }
    const exists = await Category.find({ name: req.body.name });
    if (exists.length > 0) {
      throw createError(400, "Category already exists");
    }

    req.body.user = req.user.id;
    const specificationName = await Category.create(req.body);
    if (!specificationName) {
      throw createError(404, "unable to create specificationName");
    }
    let category = await Category.find();
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategorys = async (req, res, next) => {
  try {
    let category = await Category.find();

    if (!category) {
      throw createError(400, "Categorys are not available");
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw createError(400, "Category Name is required");
    }
    const exists = await Category.find({ name: req.body.name });
    if (exists.length > 0) {
      throw createError(400, "Category already exists");
    }
    const id = req.params.id;
    const specificationName = await Category.findById(id);
    if (!specificationName) {
      throw createError(400, "category is not find to update");
    }

    const updateOptions = {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    };

    await Category.findByIdAndUpdate(id, req.body, updateOptions);

    await Specs.updateMany(
      { categoryId: id },
      { $set: { categoryValue: req.body.name } }
    );

    await FilterValue.updateMany(
      { categoryId: id },
      { $set: { categoryValue: req.body.name } }
    );

    await Phone.updateMany(
      { "specifications.categoryId": id }, // Match documents with the specified categoryId
      { $set: { "specifications.$[spec].categoryValue": req.body.name } }, // Update only matching categoryValues
      { arrayFilters: [{ "spec.categoryId": id }] } // Only update specifications that match the categoryId
    );

    let category = await Category.find();
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const specificationName = await Category.findById(id);
    if (!specificationName) {
      throw createError(401, "specificationName can not find to delete");
    }

    await Category.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
