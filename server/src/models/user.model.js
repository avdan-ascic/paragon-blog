import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First name is required!",
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last name is required!",
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required!",
    match: [/.+\@.+\../, "Please enter a valid email address!"],
  },
  password: {
    type: String,
    required: "Password is required!",
  },
});

userSchema.pre("save", async function (next) {
  const userModel = mongoose.model("user", userSchema);

  const checkEmail = await userModel.findOne({ email: this.email });

  if (checkEmail) {
    if (this._id.toString() !== checkEmail._id.toString()) {
      if (checkEmail) next(new Error("Email is already in use!"));
    } else {
      next();
    }
  }

  if (this.password.length < 6)
    next(new Error("Password must contain at least 6 characters"));

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
});

export default mongoose.model("user", userSchema);
