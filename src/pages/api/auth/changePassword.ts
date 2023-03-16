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
    const { passwordCurrent, newPassword, email } = req.body as {
      passwordCurrent: string;
      newPassword: string;
      email: string;
    };
    const user = await User.findOne({ email }).lean();

    if (
      !user?.password ||
      !(await bcrypt.compare(passwordCurrent, user?.password))
    ) {
      return res.status(400).json({
        message: "Mật khẩu hiện tại không đúng.",
      });
    }

    if (newPassword.length < 6 || newPassword.length > 52) {
      return res
        .status(400)
        .json({ message: "Độ dài mật khẩu ít nhất 6 ký tự, tối đa 52 ký tự." });
    }

    await User.findOneAndUpdate(
      { email },
      {
        password: await bcrypt.hash(newPassword, 12),
      }
    );
    res.json({
      message: "Cập nhật lại mật khẩu thành công.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
