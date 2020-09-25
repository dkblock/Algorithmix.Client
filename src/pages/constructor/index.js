import React, { useEffect } from "react";
import ConstructorContainer from "./components/ConstructorContainer";

const Constructor = () => {
    useEffect(() => {
        document.title = "Конструктор";
    }, []);

    return <ConstructorContainer/>;
};

export default Constructor;