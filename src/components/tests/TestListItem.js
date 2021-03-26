import React, { useCallback, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Popover from "@material-ui/core/Popover";
import { useExecutiveRole } from "../../hooks";
import { Icon, IconButton, iconTypes } from "../_common/Icon";

const TestListItem = ({ test }) => {
    const isExecutive = useExecutiveRole();
    const [isHovered, setIsHovered] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

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

    }, []);

    return (
        <ListItem
            className="test-list-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            button
            dense
        >
            <ListItemText
                primary={`${test.id} | ${test.name} | ${test.questions.length} вопросов | ${test.algorithm.id}`}
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
                            <MenuItem onClick={handleMenuClose}>
                                <ListItemIcon>
                                    <Icon type={iconTypes.edit}/>
                                </ListItemIcon>
                                Редактировать
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
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