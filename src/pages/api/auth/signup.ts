import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import validator from "validator";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDb();
    const { name, email, password, confirmPassword } = req.body as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin." });
    }
    if (name.length < 2 || name.length > 32) {
      return res
        .status(400)
        .json({ message: "Độ dài tên ít nhất 2 ký tự, tối đa 32 ký tự." });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email không hợp lệ." });
    }
    if (password.length < 6 || password.length > 52) {
      return res
        .status(400)
        .json({ message: "Độ dài mật khẩu ít nhất 6 ký tự, tối đa 52 ký tự." });
    }
    if (confirmPassword !== password) {
      return res.status(400).json({ message: "Mật khẩu nhập lại không đúng." });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email này đã tồn tại." });
    }
    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });
    res.json({
      message: "Đăng ký thành công.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default handler;
