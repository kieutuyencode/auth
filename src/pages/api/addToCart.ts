import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Color } from "@/components/Shoe/ModelShoe";
import Cart from "@/models/Cart";
const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDb();
    const { email, color } = req.body as {
      email: string;
      color: Color;
    };
    const arrayColor = Object.values(color) as string[];
    arrayColor.forEach((color) => {
      if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
        return res.status(400).json({ message: "Màu không hợp lệ." });
      }
    });

    if (!email) {
      return res
        .status(400)
        .json({ message: "Bạn cần đăng nhập để mua sản phẩm." });
    }
    const user = await User.findOne({ email }).lean();
    const cart = await Cart.create({
      ...color,
      time: new Date(),
      user: user._id,
    });

    res.json({
      message: "Mua sản phẩm thành công, vào giỏ hàng để kiểm tra.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDb();
    const { id } = req.body as {
      id: string;
    };
    const cart = await Cart.findByIdAndDelete(id);

    res.json({
      message: "Xóa sản phẩm đã mua thành công.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default handler;
