import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Vui lòng nhập họ tên."],
      minlength: [2, "Độ dài tên ít nhất 2 ký tự."],
      maxlength: [32, "Độ dài tên tối đa 32 ký tự."],
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Email không hợp lệ."],
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642479/992490_sskqn3.png",
    },
    password: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu."],
      minlength: [6, "Độ dài mật khẩu ít nhất 6 ký tự."],
      maxlength: [52, "Độ dài mật khẩu tối đa 52 ký tự."],
    },
    phone: String,
    address: String,
    favoriteColor: [String],
    role: {
      type: String,
      default: "user",
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
