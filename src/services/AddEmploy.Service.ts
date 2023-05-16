const AddEmployService = async (data) => {
    try {
    const response = await fetch(
      `http://127.0.0.1:7000/employ/add`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "*/*",
        },
        body: data,
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export {AddEmployService}