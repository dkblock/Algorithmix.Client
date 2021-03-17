import { AccountTree, Delete, Extension, Home, ListAlt } from "@material-ui/icons";
import iconTypes from "./icon-types";

const icons = {
    [iconTypes.algorithms]: AccountTree,
    [iconTypes.constructor]: Extension,
    [iconTypes.delete]: Delete,
    [iconTypes.home]: Home,
    [iconTypes.tests]: ListAlt
};

export default icons;