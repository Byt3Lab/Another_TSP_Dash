const LoginService = async (data) => {
  try {
    const response = await fetch(`http://127.0.0.1:7000/auth`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { LoginService };
