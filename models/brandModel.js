const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter brand Name"],
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

const Brand = model("Brand", brandSchema);

module.exports = Brand;
