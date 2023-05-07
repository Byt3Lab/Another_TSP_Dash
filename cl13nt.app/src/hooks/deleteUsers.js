const deleteUsers = async (userIds) => {
  const { data } = await fetch(`/api/users`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: userIds,
  });
  return data;
};

export function useDeleteUsers() {
  const isLoading = true;
  deleteUsers();

  return { isDeleting: isLoading };
}
