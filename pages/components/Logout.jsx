const clearCookie = async () => {
  await fetch("/api/logout", {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  window.location.reload();
};

const Logout = () => <button onClick={clearCookie}>Logout</button>;
export default Logout;
