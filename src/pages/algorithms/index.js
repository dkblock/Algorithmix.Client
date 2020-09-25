import React, { useEffect } from "react";
import AlgorithmsContainer from "./components/AlgorithmsContainer";

const Algorithms = () => {
    useEffect(() => {
        document.title = "Алгоритмы";
    }, []);

    return <AlgorithmsContainer/>;
};

export default Algorithms;