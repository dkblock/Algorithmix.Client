import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../_common/Loader";

const TestQuestionList = () => {
    const { selectedTest: test } = useSelector(state => state.test);
    const { questions, isFetching } = useSelector(state => state.testQuestion);

    return (
        <div className="test-question-list">
            <div className="test-question-list__header">
                <h5>{test.name}</h5>
            </div>
            <div className="test-question-list__items">
                {isFetching
                    ? <Loader/>
                    : questions.map((question) => (
                        <div>{question.id}</div>
                    ))}
            </div>
        </div>
    );
};

export default TestQuestionList;