import React from "react";
import { IconButton } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import palette from "../../../styles/palette";
import icons from "./icons";
import "./Icon.scss";

const Icon = (props) => {
    const { type, selected, tooltip, tooltipPosition, tooltipWithMargin, onClick } = props;
    const Icon = <InnerIcon type={type} selected={selected} onClick={onClick}/>;

    if (tooltip)
        return (
            <InnerTooltipIcon tooltip={tooltip} position={tooltipPosition} withMargin={tooltipWithMargin}>
                {Icon}
            </InnerTooltipIcon>
        );

    return Icon;
};

const ButtonIcon = ({ type }) => {
    const Icon = icons[type];
    return <Icon/>
};

const InnerIcon = ({ type, selected, onClick }) => {
    const Icon = icons[type];
    const color = selected ? palette.primary.main : "";

    return (
        <IconButton className="icon" onClick={onClick}>
            <Icon style={{ color: color }}/>
        </IconButton>
    );
};

const InnerTooltipIcon = ({ tooltip, position, withMargin, children }) => {
    const margins = { right: "Left", left: "Right", top: "Bottom", bottom: "Top" };

    return (
        <OverlayTrigger
            placement={position}
            overlay={
                <Tooltip
                    id={`tooltip-${tooltip}`}
                    style={withMargin ? { [`margin${margins[position]}`]: "8px" } : {}}>
                    {tooltip}
                </Tooltip>
            }
        >
            <div>{children}</div>
        </OverlayTrigger>
    );
}

export { ButtonIcon };
export default Icon;