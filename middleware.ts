import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessToken } from "@/lib/access";

/**
 * Optional password gate. If SITE_PASSWORD is set in Vercel, every proposal
 * asks for it once (remembered for 30 days). If it's not set, links are open
 * to anyone who has them, which the random slug suffix keeps hard to guess.
 */
export async function middleware(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  if (req.cookies.get(ACCESS_COOKIE)?.value === (await accessToken(password))) {
    return NextResponse.next();
  }

  const url = new URL("/unlock", req.url);
  url.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/|api/unlock|unlock|robots.txt|favicon.ico).+)"],
};
