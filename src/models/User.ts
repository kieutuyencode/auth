import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642479/992490_sskqn3.png",
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    address: String,
    favoriteColor: [String],
    role: {
      type: String,
      default: "user",
    },
    passwordResetToken: String,
    passwordResetExpires: Number,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
