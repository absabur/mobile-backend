const { Schema, model } = require("mongoose");

const filterValueSchema = new Schema(
  {
    categoryId: { type: Schema.ObjectId, ref: "Category", required: true },
    categoryValue: { type: String, required: true },
    specId: {
      type: Schema.ObjectId,
      ref: "Specs",
      required: true,
    },
    specValue: { type: String },
    value: {
      type: String,
      trim: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    createDate: {
      type: Object,
    },
    updateDate: {
      type: Object,
    },
  },
  { timestamps: true }
);

const FilterValue = model("FilterValue", filterValueSchema);

module.exports = FilterValue;
