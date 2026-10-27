import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, isLocale, matchLocale } from "@/lib/i18n";
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();
  const c = req.cookies.get(COOKIE)?.value;
  const loc = c && isLocale(c) ? c : matchLocale(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${loc}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}
export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
