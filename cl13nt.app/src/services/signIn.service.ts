const SignInService = async (data) => {
  try {
    const response = await fetch(
      `https://adminsigninhandler-kaful2golq-uc.a.run.app`,
      {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { SignInService };
