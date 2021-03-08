import { getAccessToken } from "../../utils/local-storage-manager";

const baseService = () => {
    const post = async (url, data) => {
        try {
            return await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Authorization": `Bearer ${getAccessToken()}`,
                    "Content-Type": "application/json"
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const get = async (url) => {
        try {
            return await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${getAccessToken()}`
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    return {
        post,
        get
    };
};

export default baseService();