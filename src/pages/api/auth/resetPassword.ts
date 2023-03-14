import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { email, password, token } = req.body as {
      email: string;
      password: string;
      token: string;
    };
    const user = await User.findOne({ email }).lean();

    if (
      !user ||
      !user?.passwordResetExpires ||
      !user?.passwordResetToken ||
      user?.passwordResetExpires < Date.now() ||
      !(await bcrypt.compare(token, user?.passwordResetToken))
    ) {
      return res.status(400).json({
        message:
          "Đường link đặt lại mật khẩu này không tồn tại hoặc đã hết hiệu lực.",
      });
    }

    if (password.length < 6 || password.length > 52) {
      return res
        .status(400)
        .json({ message: "Độ dài mật khẩu ít nhất 6 ký tự, tối đa 52 ký tự." });
    }

    await User.findOneAndUpdate(
      { email },
      {
        $set: { password: await bcrypt.hash(password, 12) },
        $unset: { passwordResetExpires: "", passwordResetToken: "" },
      }
    );
    res.json({
      message: "Cập nhật lại mật khẩu thành công.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
