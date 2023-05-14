const LoginService = async (data) => {
  try {
    const response = await fetch(
      `https://adminsigninhandler-kaful2golq-uc.a.run.app`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { LoginService };
