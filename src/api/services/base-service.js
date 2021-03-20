import { getAccessToken } from "../../utils/local-storage-manager";

const baseService = () => {
    const getBase = async (url) => {
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

    const postBase = async (url, data) => {
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

    const deleteBase = async (url) => {
        try {
            return await fetch(url, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getAccessToken()}`
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const putBase = async (url, data) => {
        try {
            return await fetch(url, {
                method: "PUT",
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

    return {
        getBase,
        postBase,
        deleteBase,
        putBase
    };
};

export default baseService();