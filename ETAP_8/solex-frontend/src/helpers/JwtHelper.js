export const getJWT = () => {
  return localStorage.getItem("jwt-token");
};

export const setJWT = (jwt) => {
  localStorage.setItem("jwt-token", jwt);
};

export const getUser = () => {
  return localStorage.getItem("username");
};

export const setUser = (user) => {
  localStorage.setItem("username", user.username);
  localStorage.setItem("role", user.role.name);
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const clearUserData = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("jwt-token");
};
