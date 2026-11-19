import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Next.js server calls Django using Axios
    const djangoResponse = await axios.post(
      `${process.env.DJANGO_API_URL}/api/admin/login/`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = djangoResponse.data;

    // Access Next.js cookies
    const cookieStore = await cookies();

    // const isProduction =
    //   process.env.NODE_ENV === "production";

    // Store access token
    cookieStore.set("access_token", data.data.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 60 * 15,
    });

    // Store refresh token
    cookieStore.set("refresh_token", data.data.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: data.user,
    });
  } catch (error) {
    console.error("Login error:", error);

    // Handle Django API errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return NextResponse.json(error.response.data, {
          status: error.response.status,
        });
      }

      // Django server unavailable / network error
      return NextResponse.json(
        { message: "Unable to connect to authentication server" },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
