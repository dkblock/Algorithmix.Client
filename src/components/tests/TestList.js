import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useExecutiveRole, useTitle } from "../../hooks";
import Button, { colors } from "../_common/Button";
import { iconTypes } from "../_common/Icon";
import TestListItem from "./TestListItem";
import Loader from "../_common/Loader";
import { showCreateTestModal } from "../../store/actions/tests";

const TestList = ({ tests }) => {
    const dispatch = useDispatch();
    const isExecutive = useExecutiveRole();
    const { isFetching } = useSelector(state => state.tests);

    const handleCreateTestClick = () => {
        dispatch(showCreateTestModal());
    };

    useTitle("Тесты");

    return (
        <div className="tests-container">
            <div className="tests-container__header">
                <div>Тесты</div>
                {isExecutive && (
                    <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleCreateTestClick}>
                        Новый тест
                    </Button>
                )}
            </div>
            <div className="test-list">
                {isFetching && <Loader className="tests-page__loader" size="medium"/>}

                {!isFetching && (
                    <ul>
                        {tests.map((test) => (
                            <TestListItem key={test.id} test={test}/>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TestList;