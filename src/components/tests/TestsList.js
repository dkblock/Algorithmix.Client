import React from "react";
import { useExecutiveRole, useTitle } from "../../hooks";
import Button, { buttonColors } from "../_common/Button";
import { iconTypes } from "../_common/Icon";
import TestsListItem from "./TestsListItem";
import CreateTestModal from "./CreateTestModal";

const TestsList = ({ tests }) => {
    const isExecutive = useExecutiveRole();

    useTitle("Тесты");

    return (
        <div className="tests-container">
            {/*<CreateTestModal/>*/}
            <div className="tests-container__header">
                <div>Тесты</div>
                {isExecutive && (
                    <Button color={buttonColors.success} startIcon={iconTypes.plus}>
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