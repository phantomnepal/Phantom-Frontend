import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // 1. Read the HttpOnly refresh token
    const refreshToken = (await cookies()).get("refresh_token")?.value;

    // 2. If cookie doesn't exist, session is invalid
    if (!refreshToken) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // 3. Ask Django to validate the refresh token
    const djangoResponse = await fetch(
      `${process.env.DJANGO_API_URL}/api/admin/auth/check/`,
      {
        method: "GET",
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
        cache: "no-store",
      }
    );

    // 4. Django says token is invalid or expired
    if ([400, 401, 403].includes(djangoResponse.status)) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // 5. Handle unexpected backend errors
    if (!djangoResponse.ok) {
      return NextResponse.json(
        { message: "Authentication service unavailable" },
        { status: 502 }
      );
    }

    // 6. Session is valid
    return NextResponse.json(
      { authenticated: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

  } catch (error) {
    console.error("Session check failed:", error);

    return NextResponse.json(
      { message: "Unable to verify session" },
      { status: 502 }
    );
  }
}