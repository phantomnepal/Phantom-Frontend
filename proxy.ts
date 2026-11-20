// // middleware.ts
// import { NextResponse, type NextRequest } from "next/server";

// const PUBLIC_ADMIN_PATHS = ["/admin/login"];

// export function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // let the login page through
//   if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
//     return NextResponse.next();
//   }

//   const refresh = req.cookies.get("refresh_token")?.value;
  

//   if (!refresh) {
//     return NextResponse.redirect(new URL("/admin/login?expire=true", req.url));
//   }

//   return NextResponse.next();
// }

// // runs on /admin and everything under it, nothing else
// export const config = { matcher: ["/admin", "/admin/:path*"] };



import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const DJANGO_API_URL = process.env.DJANGO_API_URL;

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

// Check whether the access token is expired.
// This only decodes the JWT payload; Django validates its signature.
function isAccessTokenExpired(token?: string): boolean {
  if (!token) return true;

  try {
    const payloadPart = token.split(".")[1];

    if (!payloadPart) return true;

    const base64 = payloadPart
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const payload = JSON.parse(atob(base64));

    const currentTime = Math.floor(Date.now() / 1000);

    // Refresh 60 seconds before actual expiry.
    return payload.exp <= currentTime + 60;
  } catch {
    return true;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Allow public admin pages.
  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // 2. Read cookies from the incoming browser request.
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // 3. If access token is valid, continue normally.
  if (!isAccessTokenExpired(accessToken)) {
    return NextResponse.next();
  }

  // 4. Access token is missing/expired and refresh token is missing.
  if (!refreshToken) {
    const response = NextResponse.redirect(
      new URL("/admin/login?expire=true", req.url)
    );

    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");

    return response;
  }

  try {
    if (!DJANGO_API_URL) {
      throw new Error("DJANGO_API_URL is not configured");
    }

    // 5. Call Django refresh API using Axios.
    const djangoResponse = await axios.post(
      `${DJANGO_API_URL}/api/admin/refresh/access-token/`,
      {},
      {
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    const newAccessToken = djangoResponse.data.access_token;

    if (!newAccessToken) {
      throw new Error("New access token not received");
    }

    // 6. Update the incoming request cookie.
    req.cookies.set("access_token", newAccessToken);

    // 7. Forward updated cookies to the current Next.js render.
    const requestHeaders = new Headers(req.headers);

    const updatedCookieHeader = req.cookies
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    requestHeaders.set("cookie", updatedCookieHeader);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // 8. Also send the new access token to the browser.
    response.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;

  } catch (error) {
    console.error("Access token refresh failed:", error);

    const response = NextResponse.redirect(
      new URL("/admin/login?expire=true", req.url)
    );

    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");

    return response;
  }
}

// Run only for admin routes.
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
