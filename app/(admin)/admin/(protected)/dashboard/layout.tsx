import axios from "axios";
import { cookies } from "next/headers";
import api from "@/lib/axios/axios-server";
export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
   console.log("Dashboard Layout Executed");

  try {
    // const url = `http://localhost:3000/api/general_apis/product/`;
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;
    console.log("Access Token Exists:", !!accessToken);
    console.log("Refresh Token Exists:", !!refreshToken);

    const response = await api.get(
      `http://localhost:3000/api/general_apis/product/`,
      {
        headers: {
          Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
        },
      }
    );
//     const response = await axios.get(url, {
//   headers: {
//     Cookie: `access_token=${accessToken}`,
//   },
// });

    console.log("Products response:", response.data);

  } catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("Error message:", error.message);
    console.error("Error URL:", error.config?.url);
    console.error("Error status:", error.response?.status);
    console.error("Error response:", error.response?.data);
  } else {
    console.error(error);
  }
}

  return <>{children}</>;
}