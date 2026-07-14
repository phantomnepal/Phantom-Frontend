import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Serves store.phantom.com.np from the same app by rewriting store-subdomain
 * requests to the /store route (app/(store)/store/*). The URL bar stays clean —
 * visitors never see the /store prefix.
 *
 * The matcher excludes /api, /_next, and static files, so auth/order API routes
 * are never rewritten.
 *
 * (Next.js 16: this is the `proxy` convention that replaces the deprecated
 * `middleware` file.)
 */
export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  if (host.startsWith("store.")) {
    if (!url.pathname.startsWith("/store")) {
      url.pathname = `/store${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
