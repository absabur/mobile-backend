const createError = require("http-errors");
const Phone = require("../models/phoneModel.js");
const FilterValue = require("../models/filterValueModel.js");
const cloudinary = require("cloudinary");
const Category = require("../models/categoryModel.js");
const Specs = require("../models/specificationNameModel.js.js");
const { createSlug } = require("../utils/createSlug.js");

exports.createPhone = async (req, res, next) => {
  try {
    let { name, price, brand, specifications } = req.body;
    console.log(req.body);
    if ((!name || !price || !brand, !specifications)) {
      throw createError(400, "All fields are required");
    }
    req.body.price = JSON.parse(req.body.price).map((priceItem) => {
      return {
        ...priceItem,
        price: Number(priceItem.price),
      };
    });
    req.body.brand = JSON.parse(req.body.brand);
    req.body.specifications = JSON.parse(req.body.specifications);

    const slug = createSlug(name.trim());
    let slugExists = Phone.findOne({ slug: slug });
    if (slugExists) {
      let index = 1;
      while (true) {
        const existingSlug = await Phone.findOne({ slug: `${slug}_${index}` });
        if (!existingSlug) {
          slugExists = false;
          break;
        }
        index++;
      }
      if (slugExists) {
        slug = `${slug}_${index}`;
      }
    }
    req.body.slug = slug;

    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "phones",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;

    req.body.user = req.user.id;
    const phone = await Phone.create(req.body);
    if (!phone) {
      throw createError(404, "unable to create phone");
    }
    res.status(200).json({
      success: true,
      phone,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPhones = async (req, res, next) => {
  try {
    const brands = JSON.parse(req.query.brand || "[]");
    const filters = JSON.parse(req.query.filter || "[]");
    const price = JSON.parse(
      req.query.price || '{"minPrice": 0, "maxPrice": 300000}' // Corrected JSON parsing
    );
    const search = req.query.search || "";

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const conditions = [];

    // Condition for search query
    if (search) {
      conditions.push({ name: { $regex: searchRegExp } });
    }

    // Condition for selected brands
    if (brands.length > 0) {
      conditions.push({ "brand.id": { $in: brands } });
    }

    Object.keys(filters).forEach((item) => {
      if (filters[item].length > 0) {
        conditions.push({
          "specifications.specs.filterValues.filterId": { $in: filters[item] },
        });
      }
    });

    // Condition for price range
    if (price.minPrice || price.maxPrice) {
      conditions.push({
        "price.price": { $gte: price.minPrice, $lte: price.maxPrice },
      });
    }

    // Construct the filter object for the query
    const filter = conditions.length > 0 ? { $and: conditions } : {};

    const phones = await Phone.find(filter);

    if (!phones || phones.length === 0) {
      throw createError(400, "Phones are not available");
    }
    const sanitizedPhones = phones.map((phone) => {
      const { specifications, user, createDate, updateDate, ...rest } =
        phone._doc;
      return rest;
    });

    res.status(200).json({
      success: true,
      phones: sanitizedPhones,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPhone = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    let phone = await Phone.findOne({ slug }).lean(); // Convert to plain object directly

    if (!phone) {
      throw createError(400, "Phone is not available");
    }

    res.status(200).json({
      success: true,
      phone,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePhone = async (req, res, next) => {
  try {
    let { name, price, brand, specifications } = req.body;
    if ((!name || !price || !brand, !specifications)) {
      throw createError(400, "All fields are required");
    }
    const id = req.params.id;
    const phone = await Phone.findById(id);
    if (!phone) {
      throw createError(400, "Phone can not find to update");
    }
    req.body.price = JSON.parse(req.body.price).map((priceItem) => {
      return {
        ...priceItem,
        price: Number(priceItem.price),
      };
    });
    req.body.brand = JSON.parse(req.body.brand);
    req.body.specifications = JSON.parse(req.body.specifications);
    const slug = createSlug(name.trim());
    let slugExists = Phone.findOne({ slug: slug });
    if (slugExists) {
      let index = 1;
      while (true) {
        const existingSlug = await Phone.findOne({ slug: `${slug}_${index}` });
        if (!existingSlug) {
          slugExists = false;
          break;
        }
        index++;
      }
      if (slugExists) {
        slug = `${slug}_${index}`;
      }
    }
    req.body.slug = slug;

    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      for (let i = 0; i < phone.images.length; i++) {
        await cloudinary.v2.uploader.destroy(phone.images[i].public_id);
      }

      const imagesLinks = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "phones",
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      req.body.images = imagesLinks;
    }

    const updateOptions = {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    };

    const updatePhone = await Phone.findByIdAndUpdate(
      id,
      req.body,
      updateOptions
    );

    res.status(200).json({
      success: true,
      updatePhone,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePhone = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phone = await Phone.findById(id);
    if (!phone) {
      throw createError(401, "phone can not find to delete");
    }

    for (let i = 0; i < phone.images.length; i++) {
      await cloudinary.v2.uploader.destroy(phone.images[i].public_id);
    }

    await Phone.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
exports.comparePhone = async (req, res, next) => {
  try {
    const { phones } = req.query;

    if (!phones) {
      throw createError(400, "At least one phone is required for comparison");
    }

    // Split phone IDs and trim any potential spaces
    const phoneIds = phones.split(",").map((id) => id.trim());

    // Fetch specifications for each phone ID provided
    const promises = phoneIds.map(async (phoneId) => {
      const phone = await Phone.findOne({ slug: phoneId }).lean();
      return phone;
    });

    const phoneDetails = await Promise.all(promises);

    const allSpecKeys = new Set();
    phoneDetails.forEach((phone) => {
      phone.specifications.forEach((specCategory) => {
        specCategory.specs.forEach((spec) => {
          allSpecKeys.add(`${specCategory.categoryValue}-${spec.specKey}`);
        });
      });
    });

    // Convert the set to an array for consistent ordering
    const specKeysArray = Array.from(allSpecKeys);

    const comparableData = {
      phones: phoneDetails.map((phone) => {
        const formattedSpecs = specKeysArray.reduce((acc, fullKey) => {
          const [categoryValue, specKey] = fullKey.split("-");
          const specCategory = phone.specifications.find(
            (cat) => cat.categoryValue === categoryValue
          );

          if (specCategory) {
            const spec = specCategory.specs.find((s) => s.specKey === specKey);
            if (spec) {
              // If spec has a value, use it; if it has filterValues, join them; otherwise, mark as "N/A"
              acc[categoryValue] = acc[categoryValue] || {};
              acc[categoryValue][specKey] =
                spec.value ||
                (spec.filterValues && spec.filterValues.length > 0
                  ? spec.filterValues
                      .map((value) => value.filterValue)
                      .join(", ")
                  : "");
            } else {
              // Spec is missing, set it as empty or "N/A"
              acc[categoryValue] = acc[categoryValue] || {};
              acc[categoryValue][specKey] = "";
            }
          } else {
            // Category is missing, ensure it has the empty spec.
            acc[categoryValue] = acc[categoryValue] || {};
            acc[categoryValue][specKey] = "";
          }
          return acc;
        }, {});

        return {
          _id: phone._id,
          images: phone.images,
          name: phone.name,
          brand: phone.brand,
          slug: phone.slug,
          price: phone.price,
          // .map((p) => `${p.price} BDT (${p.varient})`)
          // .join(", "),
          specifications: formattedSpecs,
        };
      }),
    };

    res.status(200).json({
      success: true,
      specifications: comparableData,
    });
  } catch (error) {
    next(error);
  }
};
exports.specsTable = async (req, res, next) => {
  try {
    const categories = await Category.find();
    const specs = await Specs.find();
    const filter = await FilterValue.find();

    let specifications = categories.map((category) => {
      // Find all specs under the current category.
      let categorySpecs = specs.filter((spec) =>
        spec.categoryId.equals(category._id)
      );

      // Map and group specs by specKey.
      let mappedSpecs = categorySpecs.map((spec) => {
        // Collect all filter values for the current spec.
        let relevantFilters = filter.filter((filter) =>
          filter.specId.equals(spec._id)
        );

        // Map the filter values.
        let filters = relevantFilters.map((filter) => ({
          filterId: filter._id,
          filterValue: filter.value,
        }));

        // Return the spec object with filters.
        return {
          specKeyId: spec._id,
          specKey: spec.name,
          placeholder: spec?.placeholder,
          label: spec?.label,
          multiple: spec?.multiple,
          filterValues: filters,
        };
      });

      // Return the final structure for the category.
      return {
        categoryId: category._id,
        categoryValue: category.name,
        specs: mappedSpecs,
      };
    });

    res.status(200).json({
      success: true,
      specifications,
    });
  } catch (error) {
    next(error);
  }
};
