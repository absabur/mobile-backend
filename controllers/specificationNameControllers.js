const createError = require("http-errors");
const Specs = require("../models/specificationNameModel.js.js");
const Category = require("../models/categoryModel.js");
const FilterValue = require("../models/filterValueModel.js");
const Phone = require("../models/phoneModel.js");

exports.createSpecs = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw createError(400, "Specs Name is required");
    }
    if (!req.body.categoryId) {
      throw createError(400, "category is required");
    }
    if (!req.body.categoryValue) {
      throw createError(400, "category is required");
    }
    // if (!req.body.placeholder) {
    //   throw createError(400, "Specs placeholder is required");
    // }
    // if (!req.body.label) {
    //   throw createError(400, "label is required");
    // }
    // if (!req.body.multiple) {
    //   throw createError(400, "multiple is required");
    // }

    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      throw createError(400, "Category does not Exists.");
    }

    const exists = await Specs.find({
      name: { $exists: true, $eq: req.body.name },
      categoryValue: { $exists: true, $eq: req.body.categoryValue },
    });
    if (exists.length > 0) {
      throw createError(400, "Specs already Exists.");
    }

    req.body.user = req.user.id;

    const specificationName = await Specs.create(req.body);
    if (!specificationName) {
      throw createError(404, "unable to create specificationName");
    }
    let specificationNames = await Specs.find();
    res.status(200).json({
      success: true,
      specificationNames,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSpecss = async (req, res, next) => {
  try {
    let specificationNames = await Specs.find();

    if (!specificationNames) {
      throw createError(400, "Specss are not available");
    }

    res.status(200).json({
      success: true,
      specificationNames,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSpecs = async (req, res, next) => {
  try {
    const id = req.params.id;
    let specificationName = await Specs.findById(id);

    if (!specificationName) {
      throw createError(400, "Specss are not available");
    }

    res.status(200).json({
      success: true,
      specificationName,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSpecs = async (req, res, next) => {
  try {
    const { name, categoryId, categoryValue, placeholder, label, multiple } =
      req.body;

    const id = req.params.id;
    if (!req.body) {
      throw createError(400, "No data to update");
    }

    const specificationName = await Specs.findById(id);
    if (!specificationName) {
      throw createError(400, "Specs is not find to update");
    }

    if (categoryId && categoryValue) {
      let cate = Category.findById(categoryId);
      if (!cate) {
        throw createError(400, "Category does not Exists.");
      }
      specificationName.categoryId = categoryId;
      specificationName.categoryValue = categoryValue;
    }

    specificationName.name = name || specificationName.name;
    specificationName.placeholder =
      placeholder || specificationName.placeholder;
    specificationName.label = label || specificationName.label;
    specificationName.multiple =
      multiple !== "" ? multiple : specificationName.multiple;

    await specificationName.save();

    await FilterValue.updateMany(
      { specId: id },
      {
        $set: {
          specValue: specificationName.name,
          categoryId: specificationName.categoryId,
          categoryValue: specificationName.categoryValue,
        },
      }
    );

    let specificationNames = await Specs.find();
    res.status(200).json({
      success: true,
      specificationNames,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSpecs = async (req, res, next) => {
  try {
    const id = req.params.id;
    const specificationName = await Specs.findById(id);
    if (!specificationName) {
      throw createError(401, "specificationName can not find to delete");
    }

    await Specs.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// exports.getSpecss = async (req, res, next) => {
//   try {
//     const search = req.query.search || "";
//     let category = req.query.category || "";
//     const sort = req.query.sort || "";
//     const lte = Number(req.query.lte) || 1000000;
//     const gte = Number(req.query.gte) || 0;
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 8;

//     let makeSort = {};
//     if (sort === "Top Sales") {
//       makeSort = { sold: -1 };
//     } else if (sort === "Top Reviews") {
//       makeSort = { numOfReviews: -1 };
//     } else if (sort === "Newest Arrivals") {
//       makeSort = { createdAt: -1 };
//     } else if (sort === "Price Low to High") {
//       makeSort = { price: +1 };
//     } else if (sort === "Price High to Low") {
//       makeSort = { price: -1 };
//     } else {
//       makeSort = { updatedAt: -1 };
//     }

//     const searchRegExp = new RegExp(".*" + search + ".*", "i");

//     if (category == "" || category == "null") {
//       var filter = {
//         $or: [{ name: { $regex: searchRegExp } }],
//         $and: [{ price: { $lte: lte, $gte: gte } }],
//       };
//     } else {
//       if (category.length !== 24) {
//         const categoryfind = await Category.findOne({ name: category });
//         category = categoryfind._id;
//       }
//       var filter = {
//         $or: [{ name: { $regex: searchRegExp } }],
//         $and: [{ price: { $lte: lte, $gte: gte } }, { category: category }],
//       };
//     }

//     const products = await Specs.find(filter)
//       .limit(limit)
//       .skip((page - 1) * limit)
//       .sort(makeSort);

//     if (!products) {
//       throw createError(400, "Specs is not avilable");
//     }
//     const count = await Specs.find(filter).countDocuments();

//     res.status(200).json({
//       success: true,
//       products,
//       pagination: {
//         number_of_Specss: count,
//         number_of_product_in_a_page: limit,
//         number_of_Pages: Math.ceil(count / limit),
//         currentPage: page,
//         prevPage: page - 1 > 0 ? page - 1 : null,
//         nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
