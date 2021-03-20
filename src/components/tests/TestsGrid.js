import React from "react";
import { useTitle } from "../../hooks";

const TestsGrid = ({ tests }) => {
    useTitle("Тесты");

    return (
        <div>
            {tests.map((test) => (
                <div>{`${test.id} | ${test.name} | ${test.questions.length} вопросов | ${test.algorithm.id}`}</div>
            ))}
        </div>
    );
};

export default TestsGrid;