import React from "react";
import {useDispatch} from "react-redux";
import { useExecutiveRole, useTitle } from "../../hooks";
import Button, { colors } from "../_common/Button";
import { iconTypes } from "../_common/Icon";
import TestsListItem from "./TestsListItem";
import { showModal } from "../../store/actions/modal";
import modalTypes from "../../constants/modal-types";
import { showCreateTestModal } from "../../store/actions/tests";


const TestsList = ({ tests }) => {
    const dispatch = useDispatch();
    const isExecutive = useExecutiveRole();

    const handleCreateTestClick = () => {
        showCreateTestModal(dispatch);
    }

    useTitle("Тесты");

    return (
        <div className="tests-container">
            {/*<CreateTestModal/>*/}
            <div className="tests-container__header">
                <div>Тесты</div>
                {isExecutive && (
                    <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleCreateTestClick}>
                        Новый тест
                    </Button>
                )}
            </div>
            <div className="tests-list">
                <div>
                    {tests.map((test) => (
                        <TestsListItem test={test}/>
                    ))}
                    {tests.map((test) => (
                        <TestsListItem test={test}/>
                    ))}
                    {tests.map((test) => (
                        <TestsListItem test={test}/>
                    ))}
                    {tests.map((test) => (
                        <TestsListItem test={test}/>
                    ))}
                    {tests.map((test) => (
                        <TestsListItem test={test}/>
                    ))}
                    {tests.map((test) => (
                        <TestsListItem test={test}/>
                    ))}
                    {tests.map((test) => (
                        <TestsListItem test={test}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestsList;