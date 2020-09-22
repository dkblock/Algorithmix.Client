import React, { useEffect } from "react";
import TestComponent from "./components/TestComponent";

const Test = () => {
    const title = "Test";

    useEffect(() => {
        document.title = title;
    }, []);

    return (<TestComponent/>);
};

export default Test;