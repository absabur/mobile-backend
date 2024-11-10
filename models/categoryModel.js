const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter spec head Name"],
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

const Category = model("Category10", categorySchema);

module.exports = Category;
