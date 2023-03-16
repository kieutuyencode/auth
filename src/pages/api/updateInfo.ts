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
    const { name, phone, address, email } = req.body as {
      name: string;
      phone: string;
      address: string;
      email: string;
    };
    const user = await User.findOne({ email }).lean();

    if (name.length < 2 || name.length > 32) {
      return res
        .status(400)
        .json({ message: "Độ dài tên ít nhất 2 ký tự, tối đa 32 ký tự." });
    }
    if (!/^(0[2|3|5|7|8|9])([0-9]{8}|[0-9]{9})$/.test(phone)) {
      return res.status(400).json({ message: "Số điện thoại không hợp lệ." });
    }
    if (address.length < 5 || address.length > 100) {
      return res
        .status(400)
        .json({ message: "Độ dài địa ít nhất 5 ký tự, tối đa 100 ký tự." });
    }
    await User.findOneAndUpdate(
      { email },
      {
        name,
        phone,
        address,
      }
    );
    res.json({
      message: "Cập nhật lại mật khẩu thành công.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
