import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import emailTemplate from "@/utils/emailTemplate";
import sendMail from "@/utils/sendMail";
import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email này không tồn tại." });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const userUpdate = await User.findOneAndUpdate(
      { email },
      {
        passwordResetToken: await bcrypt.hash(token, 12),
        passwordResetExpires: Date.now() + 10 * 60 * 1000,
      }
    );

    const url = `${process.env.NEXTAUTH_URL}/reset/${token}?q=${email}`;
    await sendMail(email, url, "Bạn quên mật khẩu?", emailTemplate(url));
    res.json({
      message: "Đã gửi email thành công.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
