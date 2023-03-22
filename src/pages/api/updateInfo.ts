import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { phone, address, email } = req.body as {
      phone: string;
      address: string;
      email: string;
    };
    const user = await User.findOne({ email }).lean();

    if (!/^(0[2|3|5|7|8|9])([0-9]{8}|[0-9]{9})$/.test(phone)) {
      return res.status(400).json({ message: "Số điện thoại không hợp lệ." });
    }
    if (address.length < 5 || address.length > 100) {
      return res
        .status(400)
        .json({ message: "Độ dài địa chỉ ít nhất 5 ký tự, tối đa 100 ký tự." });
    }
    await User.findOneAndUpdate(
      { email },
      {
        phone,
        address,
      }
    );
    res.json({
      message: "Cập nhật lại thông tin thành công.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
