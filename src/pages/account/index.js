import React, { useEffect } from "react";
import AccountContainer from "./components/AccountContainer";

const Account = () => {
    useEffect(() => {
        document.title = "Аккаунт";
    }, []);

    return <AccountContainer/>;
};

export default Account;