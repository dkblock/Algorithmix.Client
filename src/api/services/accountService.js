import api from "../api";

const auth = async () => {
    const url = api.account.authUrl();
    const task = {
        Name: "TaskName",
        Description: "Хуипшн"
    };

    const data = await fetch(url, {
        method: "POST",
        body: JSON.stringify(task),
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    console.log(await data.json());
};

const login = async () => {
    const url = api.account.loginUrl();
    const credentials = {
        Name: "Testoviy",
        Password: "Qwerty12345"
    };

    const data = await fetch(url, {
        method: "POST",
        body: JSON.stringify(credentials),
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    console.log(await data.json());
}

const logout = async () => {
    const url = api.account.logoutUrl();
    const data = await fetch(url, { credentials: "include", });

    console.log(await data.json());
}

const register = async () => {
    const url = api.account.registerUrl();
    const credentials = {
        Email: "Testoviy@mail.ru",
        Name: "Testoviy",
        Password: "Qwerty12345"
    };

    const data = await fetch(url, {
        method: "POST",
        body: JSON.stringify(credentials),
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    console.log(await data.json());
}

export default {
    auth,
    login,
    logout,
    register
};