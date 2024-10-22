const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Your name."],
      trim: true,
      minlength: [3, "User Name must be atleast 3 charecter."],
      maxlength: [30, "User Name allowed max 30 charecter."],
    },
    email: {
      type: String,
      required: [true, "Please enter email."],
      trim: true,
      unique: [true, "email already in user"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [6, "Password should be greater than 6 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBan: {
      type: Boolean,
      default: false,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRE) * 24 * 60 * 1000,
  });
};

userSchema.methods.comparedPassword = async function (pass) {
  return await bcryptjs.compare(pass, this.password);
};

const User = model("User", userSchema);

module.exports = User;
