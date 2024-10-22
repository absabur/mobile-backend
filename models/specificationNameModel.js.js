const { Schema, model } = require("mongoose");

const specificationNameSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter specification Name"],
      trim: true,
    },
    categoryId: { type: Schema.ObjectId, ref: "Category", required: true },
    categoryValue: { type: String, required: true },
    placeholder: { type: String },
    label: { type: String },
    multiple: { type: Boolean },
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

const Specs = model("Specs", specificationNameSchema);

module.exports = Specs;
