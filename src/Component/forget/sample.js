import React, { useState, useEffect } from "react";
import axios from "axios";

const Sample = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://666161c963e6a0189fe987d0.mockapi.io/api/v1/login"
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Call fetchData function when component mounts
    fetchData();
  }, []);

  // Render loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state if request fails
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-red-600 p-4">
      <h1>Data from API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Sample;
