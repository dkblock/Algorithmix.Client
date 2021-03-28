const ACCESS_TOKEN = "ACCESS_TOKEN";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const setAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN, token);
export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);