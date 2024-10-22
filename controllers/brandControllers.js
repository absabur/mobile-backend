const createError = require("http-errors");
const Brand = require("../models/brandModel.js");

exports.createBrand = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw createError(400, "Brand Name is required");
    }
    const exists = await Brand.findOne({ name: req.body.name });
    if (exists) {
      throw createError(400, "Brand already Exists.");
    }

    req.body.user = req.user.id;
    const newbrand = await Brand.create(req.body);
    if (!newbrand) {
      throw createError(404, "unable to create brand");
    }
    const brand = await Brand.find();
    res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brand = await Brand.find();
    if (!brand) {
      throw createError(400, "Brand is not avilable");
    }
    res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    if (!name) {
      throw createError(400, "Brand Name is required");
    }
    const findBrand = await Brand.findById(id);
    if (!findBrand) {
      throw createError(400, "Brand can not find to update");
    }

    const updateOptions = {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    };

    const updateBrand = await Brand.findByIdAndUpdate(
      id,
      { name },
      updateOptions
    );
    const brand = await Brand.find();
    res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBrand = async (req, res, next) => {
  try {
    const id = req.params.id;
    const brand = await Brand.findById(id);
    if (!brand) {
      throw createError(401, "brand can not find to delete");
    }

    await Brand.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
