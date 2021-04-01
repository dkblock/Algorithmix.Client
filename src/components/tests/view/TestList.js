import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useExecutiveRole } from "../../../hooks";
import TestListItem from "./TestListItem";
import Loader from "../../_common/Loader";
import TextField from "../../_common/TextField";
import Button, { colors } from "../../_common/Button";
import { iconTypes } from "../../_common/Icon";
import { showCreateTestModal } from "../../../store/actions/test";

const TestList = () => {
    const dispatch = useDispatch();
    const isExecutive = useExecutiveRole();
    const { tests, selectedTest, isFetching } = useSelector(state => state.test);

    const handleCreateTest = () => dispatch(showCreateTestModal());

    return (
        <div className="test-list">
            <div className="test-list__header">
                <TextField label="Поиск здоровый"/>
                {isExecutive && (
                    <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleCreateTest}>
                        Новый тест
                    </Button>
                )}
            </div>

            {isFetching
                ? (<Loader className="test-list__loader" size="medium"/>)
                : (
                    <ul className="test-list__items">
                        {tests.map((test, index) => (
                            <TestListItem
                                key={test.id}
                                test={test}
                                isSelected={test.id === selectedTest.id}
                                index={index + 1}
                            />
                        ))}
                    </ul>
                )}
        </div>
    );
};

export default TestList;