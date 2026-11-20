'use client'
import api from "@/lib/axios/axios-client";

function Dashboard() {

  const handleProduct = async () => {
    const response = await api.get(
      "http://localhost:3000/api/general_apis/product/"
    );

    console.log("Products response:", response.data);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleProduct}>
        Product
      </button>
    </div>
  );
}

export default Dashboard;
