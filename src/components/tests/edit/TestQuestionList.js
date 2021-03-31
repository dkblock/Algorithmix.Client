import React from "react";
import { useSelector } from "react-redux";

const TestQuestionList = () => {
    const { questions } = useSelector(state => state.test);

    return (
        <div className="test-question-list">

        </div>
    );
};

export default TestQuestionList;