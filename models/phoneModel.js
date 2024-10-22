const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const phoneSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter phone Name"],
      trim: true,
    },
    slug: {
      type: String,
    },
    brand: {
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
      value: { type: String, required: true },
    },
    specifications: [
      {
        categoryId: { type: ObjectId, ref: "Category", required: true },
        categoryValue: { type: String, required: true },
        specs: [
          {
            specKeyId: {
              type: ObjectId,
              ref: "Specs",
              required: true,
            },
            specKey: { type: String, required: true },
            value: { type: String },
            filterValues: [
              {
                filterId: { type: ObjectId, ref: "FilterValue" },
                filterValue: { type: String },
              },
            ],
          },
        ],
      },
    ],
    price: [
      {
        varient: { type: String },
        price: { type: Number },
        status: { type: String },
      },
    ],
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    user: {
      type: ObjectId,
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
phoneSchema.index({ "specifications.specs.filterValues.filterId": 1 });
phoneSchema.index({ "brand.id": 1 });
const Phone = model("Phone", phoneSchema);

module.exports = Phone;
