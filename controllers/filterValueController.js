const createError = require("http-errors");
const FilterValue = require("../models/filterValueModel.js");

exports.createFilterValue = async (req, res, next) => {
  try {
    if (!req.body.value) {
      throw createError(400, "filter Value Name is required");
    }
    if (!req.body.categoryId || !req.body.categoryValue) {
      throw createError(400, "filter Value Name is required");
    }
    if (!req.body.specId || !req.body.specValue) {
      throw createError(400, "filter Value Name is required");
    }

    req.body.user = req.user.id;
    const filterValue = await FilterValue.create(req.body);
    if (!filterValue) {
      throw createError(404, "unable to create filterValue");
    }
    const filterValues = await FilterValue.find();
    res.status(200).json({
      success: true,
      filterValues,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFilterValues = async (req, res, next) => {
  try {
    const filterValues = await FilterValue.find();
    if (!filterValues) {
      throw createError(400, "Filter Value is not avilable");
    }
    res.status(200).json({
      success: true,
      filterValues,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFilterValue = async (req, res, next) => {
  try {
    if (!req.body.value) {
      throw createError(400, "filter Value Name is required");
    }
    if (!req.body.categoryId || !req.body.categoryValue) {
      throw createError(400, "filter Value Name is required");
    }
    if (!req.body.specId || !req.body.specValue) {
      throw createError(400, "filter Value Name is required");
    }
    const id = req.params.id;
    const filterValue = await FilterValue.findById(id);
    if (!filterValue) {
      throw createError(400, "Filter Value can not find to update");
    }

    const updateOptions = {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    };

    const updateFilterValue = await FilterValue.findByIdAndUpdate(
      id,
      req.body,
      updateOptions
    );
    const filterValues = await FilterValue.find();
    res.status(200).json({
      success: true,
      filterValues,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFilterValue = async (req, res, next) => {
  try {
    const id = req.params.id;
    const filterValue = await FilterValue.findById(id);
    if (!filterValue) {
      throw createError(401, "filterValue can not find to delete");
    }

    await FilterValue.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
