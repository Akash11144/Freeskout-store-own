const getAuthToken = () => {
  const token = localStorage.getItem("freeskout_shop_auth_token");
  if (token && token.length) return `Bearer ${token}`;
  return null;
};

const setAuthToken = (token) => {
  localStorage.setItem("freeskout_shop_auth_token", token);
};

const removeAuthToken = () => {
  localStorage.removeItem("freeskout_shop_auth_token");
};

module.exports = { getAuthToken, setAuthToken, removeAuthToken };
