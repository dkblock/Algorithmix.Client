import React from "react";
import { useSelector } from "react-redux";
import TestListItem from "./TestListItem";
import Loader from "../../_common/Loader";

const TestListItems = () => {
    const { tests, selectedTest, isFetching } = useSelector(state => state.test);

    if (isFetching)
        return <Loader className="test-list__loader" size="medium"/>;

    return (
        <ul className="test-list__items">
            {tests.map((test) => (
                <TestListItem
                    key={test.id}
                    test={test}
                    isSelected={test.id === selectedTest.id}
                />
            ))}
        </ul>
    );
};

export default TestListItems;