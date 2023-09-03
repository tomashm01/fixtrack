
export const setToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const isAuthenticated = () => {
  const token = getToken();
  // Aquí podrías verificar la validez del token si es necesario
  return token != null;
};

export const checkRole = (allowedRoles: string[]) => {
  // Aquí podrías verificar el rol del usuario si es necesario
  return true;
};
