import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    // 1. Read tokens from HttpOnly cookies
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;
    console.log("Product api run");
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token missing" },
        { status: 401 }
      );
    }

    // 2. Call Django product API using Axios
    const response = await axios.get(
      `${process.env.DJANGO_API_URL}/api/products/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // 3. Log response for testing
    console.log("Products response:", response.data);

    // 4. Return response to frontend
    return NextResponse.json(response.data, {
      status: response.status,
      headers: {
        "Cache-Control": "no-store",
      },
    });

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Django API error:", error.response?.data);

      return NextResponse.json(
        error.response?.data || { message: "Product API failed" },
        { status: error.response?.status || 502 }
      );
    }

    console.error("Product API error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}