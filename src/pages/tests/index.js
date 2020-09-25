import React, { useEffect } from "react";
import TestsContainer from "./components/TestsContainer";

const Tests = () => {
    useEffect(() => {
        document.title = "Тесты"
    }, []);

    return <TestsContainer/>;
};

export default Tests;