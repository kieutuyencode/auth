import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDb();
    const { color, email } = req.body as {
      color: string;
      email: string;
    };
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      return res.status(400).json({ message: "Màu không hợp lệ." });
    }
    if (!email) {
      return res
        .status(400)
        .json({ message: "Bạn cần đăng nhập để thêm màu ưa thích." });
    }
    const user = await User.findOneAndUpdate(
      { email },
      { $push: { favoriteColor: color } },
      { new: true }
    );

    res.json({
      message: "Thêm màu ưa thích thành công.",
      data: user.favoriteColor,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default handler;
