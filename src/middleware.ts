import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  if (pathname == "/dang-ky" || pathname == "/dang-nhap") {
    if (session) return NextResponse.redirect(origin);
  }
  if (pathname.startsWith("/user")) {
    if (!session) return NextResponse.redirect(origin);
  }
}
