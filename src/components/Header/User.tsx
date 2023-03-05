import Link from "next/link";

export default function User({ mobile }) {
  return (
    <div className="cursor-pointer relative group">
      <img
        src="https://st.ntcdntempv3.com/data/siteimages/anonymous.png"
        className="w-10 h-10 rounded-full"
      />
      <ul
        className={`hidden group-hover:block divide-y divide-gray-300 shadow border absolute ${
          mobile ? "left-0" : "right-0"
        } top-full bg-white min-w-[150px] rounded`}
      >
        <li className="hover:bg-gray-200">
          <Link href="/user" className="py-1 px-4 block">
            Trang cá nhân
          </Link>
        </li>
        <li className="hover:bg-gray-200">
          <Link href="/bat-dau" className="py-1 px-4 block">
            Bắt đầu
          </Link>
        </li>
        <li className="hover:bg-gray-200">
          <Link href="/tuy-chinh-giay" className="py-1 px-4 block">
            Tùy chỉnh giày
          </Link>
        </li>
      </ul>
    </div>
  );
}
