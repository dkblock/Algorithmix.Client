import React from "react";
import { useDispatch } from "react-redux";
import Switch from "../../_common/switch";

const TestFilter = () => {
    const dispatch = useDispatch();

    return (
        <div className="test-list__filter">
            <Switch label="Только выполненные" checked={true} onChange={() => {}}/>
            <Switch label="Только выполненные" checked={true} onChange={() => {}}/>
            <Switch label="Только выполненные" checked={true} onChange={() => {}}/>
            <Switch label="Только выполненные" checked={true} onChange={() => {}}/>
        </div>
    );
};

export default TestFilter;