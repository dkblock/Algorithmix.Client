import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Popover from "@material-ui/core/Popover";

import { useExecutiveRole } from "../../../hooks";
import { Icon, IconButton, iconTypes } from "../../_common/Icon";
import Badge from "../../_common/Badge";
import { selectTest } from "../../../store/actions/test";
import { showDeleteTestModal } from "../../../store/actions/test";
import { navigateToTestEdit } from "../../../utils/navigator";

const useStyles = makeStyles({
    primary: {
        fontSize: "18px"
    },
    secondary: {
        fontSize: "14px"
    }
});

const TestListItem = ({ test, isSelected, index }) => {
    const dispatch = useDispatch();
    const isExecutive = useExecutiveRole();
    const [isHovered, setIsHovered] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const selectedClass = isSelected ? "test-list-item--selected" : "";
    const classes = useStyles();

    const handleMenuOpen = (e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
        setIsHovered(false);
    };

    const handleMenuClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    const handleClick = useCallback(() => {
        dispatch(selectTest(test));
    }, [dispatch, test]);

    const handleTestDelete = useCallback((e) => {
        handleMenuClose(e);
        dispatch(showDeleteTestModal(test));
    }, [dispatch, test]);

    const handleTestEdit = useCallback((e) => {
        handleMenuClose(e);
        navigateToTestEdit(test.id);
    }, [test.id]);

    return (
        <ListItem
            className="test-list-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            selected={isSelected}
            button
        >
            <ListItemIcon>
                <Badge content={index} color={isSelected ? "primary" : "secondary"}/>
            </ListItemIcon>
            <ListItemText
                classes={classes}
                primary={test.name}
                secondary={test.algorithm.name}
            />

            {isExecutive && (
                <>
                    <ListItemSecondaryAction
                        className={isHovered ? "test-list-item__secondary--hovered" : "test-list-item__secondary"}
                        onClick={handleMenuOpen}
                    >
                        <IconButton type={iconTypes.more}/>
                    </ListItemSecondaryAction>
                    <Popover
                        id="app-header-popover"
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right", }}
                        transformOrigin={{ vertical: "top", horizontal: "right", }}
                    >
                        <div className="test-list-item__secondary-menu">
                            <MenuItem onClick={handleTestEdit}>
                                <ListItemIcon>
                                    <Icon type={iconTypes.edit}/>
                                </ListItemIcon>
                                Редактировать
                            </MenuItem>
                            <MenuItem onClick={handleTestDelete}>
                                <ListItemIcon>
                                    <Icon type={iconTypes.delete}/>
                                </ListItemIcon>
                                Удалить
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <ListItemIcon>
                                    <Icon type={iconTypes.stats}/>
                                </ListItemIcon>
                                Статистика
                            </MenuItem>
                        </div>
                    </Popover>
                </>
            )}
        </ListItem>
    );
};

export default TestListItem;