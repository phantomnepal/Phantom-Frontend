
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1. Get refresh token from browser request
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token missing" },
        { status: 401 }
      );
    }

    // 2. Request a new access token from Django
    const djangoResponse = await fetch(
      `${process.env.DJANGO_API_URL}/api/admin/refresh/access-token/`,
      {
        method: "POST",
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        cache: "no-store",
      }
    );

    const data = await djangoResponse.json();

    if (!djangoResponse.ok) {
      return NextResponse.json(data, {
        status: djangoResponse.status,
      });
    }

    // 3. Get new access token
    const newAccessToken = data.access_token;

    if (!newAccessToken || typeof newAccessToken !== "string") {
      return NextResponse.json(
        { message: "New access token not received" },
        { status: 502 }
      );
    }

    // 4. Create response
    const response = NextResponse.json({
      success: true,
      message: "Token refreshed successfully",
    });

    // 5. Set new access token cookie
    response.cookies.set({
      name: "access_token",
      value: newAccessToken,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    // 6. Debug without exposing JWT values
    console.log("New access token received:", !!newAccessToken);
    console.log(
      "Set-Cookie header exists:",
      response.headers.has("set-cookie")
    );

    return response;

  } catch (error) {
    console.error("Refresh failed:", error);

    return NextResponse.json(
      { message: "Unable to refresh token" },
      { status: 502 }
    );
  }
}
