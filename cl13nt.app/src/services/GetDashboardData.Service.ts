const GetDashboardData = async (data) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:7000/admin/data/dashboard/`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: null,
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { GetDashboardData };
