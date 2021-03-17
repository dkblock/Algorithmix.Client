import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import icons from "./icons";
import "./Icon.scss";

const Icon = (props) => {
    const { type, tooltip, tooltipPosition } = props;

    if (tooltip)
        return <InnerTooltipIcon type={type} tooltip={tooltip} tooltipPosition={tooltipPosition}/>;

    return <InnerIcon type={type}/>;
};

const InnerIcon = ({ type }) => {
    const Icon = icons[type];

    return (
        <IconButton className="icon">
            <Icon/>
        </IconButton>
    );
};

const InnerTooltipIcon = ({ type, tooltip, tooltipPosition }) => {
    return (
        <Tooltip title={tooltip} placement={tooltipPosition} arrow>
            <div><InnerIcon type={type}/></div>
        </Tooltip>
    );
}

export default Icon;