import React from "react";
import { useTitle } from "../../hooks";

const TestsGrid = ({ tests }) => {
    useTitle("Тесты");

    return <div>{tests.length}</div>
};

export default TestsGrid;