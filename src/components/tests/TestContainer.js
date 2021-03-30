import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useExecutiveRole, useTitle } from "../../hooks";
import TestInfo from "./TestInfo";
import TestListItems from "./TestListItems";
import TestFilter from "./TestFilter";
import Button, { colors } from "../_common/Button";
import { iconTypes } from "../_common/Icon";
import { showCreateTestModal } from "../../store/actions/test";

const TestContainer = () => {
    const dispatch = useDispatch();
    const isExecutive = useExecutiveRole();
    const { selectedTest } = useSelector(state => state.test);

    const handleCreateTest = () => dispatch(showCreateTestModal());

    useTitle("Тесты");

    return (
        <div className="test-container">
            <div className="test-list">
                {/*<div className="test-list__header">*/}
                {/*    Тесты*/}
                {/*    {isExecutive && (*/}
                {/*        <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleCreateTest}>*/}
                {/*            Новый тест*/}
                {/*        </Button>*/}
                {/*    )}*/}
                {/*</div>*/}
                <div className="test-list__content">
                    <TestFilter/>
                    <TestListItems/>
                </div>
            </div>
            <TestInfo test={selectedTest}/>
        </div>
    );
};

export default TestContainer;