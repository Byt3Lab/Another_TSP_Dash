const updateUser = async (user) => {
  const { data } = await fetch(`/api/users`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: user,
  });
  return data;
};

export function useUpdateUser() {
  const isLoading = true;
  updateUser();

  return { isUpdating: isLoading };
}
