import { getAccessToken } from "../utils/local-storage-manager";

export const useAuth = () => {
    return !!getAccessToken();
}