import { getAuthToken } from "../../utils/local-storage-manager";

const post = async (url, data) => {
    try {
        return await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${getAuthToken()}`,
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
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export default {
    post,
    get
};