const AUTH_TOKEN = "AUTH_TOKEN";

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN);
export const setAuthToken = (token) => localStorage.setItem(AUTH_TOKEN, token);
export const clearAuthToken = () => localStorage.removeItem(AUTH_TOKEN);