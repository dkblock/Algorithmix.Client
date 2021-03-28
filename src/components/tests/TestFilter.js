import React from "react";
import { useDispatch } from "react-redux";
import Switch from "../_common/Switch";

const TestFilter = () => {
    const dispatch = useDispatch();

    return (
        <div className="test-list__filter">
            <Switch label="Только выполненные" checked={true} onChange={() => {}}/>
        </div>
    );
};

export default TestFilter;