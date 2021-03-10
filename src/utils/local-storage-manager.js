const ACCESS_TOKEN = "ACCESS_TOKEN";
const CURRENT_USER_ID = "CURRENT_USER_ID";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const setAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN, token);
export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);

export const getCurrentUserId = () => localStorage.getItem(CURRENT_USER_ID);
export const setCurrentUserId = (userId) => localStorage.setItem(CURRENT_USER_ID, userId);
export const clearCurrentUserId = () => localStorage.removeItem(CURRENT_USER_ID);