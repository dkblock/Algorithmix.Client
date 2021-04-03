import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useExecutiveRole } from "../../../hooks";
import ListItem from "../../_common/ListItem";
import { iconTypes } from "../../_common/Icon";
import { selectTest } from "../../../store/actions/test";
import { showDeleteTestModal } from "../../../store/actions/test";
import { navigateToTestEdit } from "../../../utils/navigator";

const TestListItem = ({ test, isSelected, index }) => {
    const dispatch = useDispatch();
    const isExecutive = useExecutiveRole();

    const handleClick = useCallback(() => {
        dispatch(selectTest(test));
    }, [dispatch, test]);

    const handleTestDelete = useCallback((e, onMenuClose) => {
        onMenuClose(e);
        dispatch(showDeleteTestModal(test));
    }, [dispatch, test]);

    const handleTestEdit = useCallback((e, onMenuClose) => {
        onMenuClose(e);
        navigateToTestEdit(test.id);
    }, [test.id]);

    return (
        <ListItem
            primaryText={test.name}
            secondaryText={test.algorithm.name}
            isSelected={isSelected}
            index={index}
            onClick={handleClick}
            actions={isExecutive ? ([
                {
                    id: "edit",
                    label: "Редактировать",
                    icon: iconTypes.edit,
                    onClick: (e, onMenuClose) => handleTestEdit(e, onMenuClose)
                },
                {
                    id: "delete",
                    label: "Удалить",
                    icon: iconTypes.delete,
                    onClick: (e, onMenuClose) => handleTestDelete(e, onMenuClose)
                },
                {
                    id: "stats",
                    label: "Статистика",
                    icon: iconTypes.stats,
                    onClick: (e, onMenuClose) => handleTestEdit(e, onMenuClose)
                }
            ]) : null}
        />
    );
};

export default TestListItem;