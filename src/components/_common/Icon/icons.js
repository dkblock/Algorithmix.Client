import { AccountTree, Delete, ExitToApp, Extension, Home, ListAlt, Person, Settings } from "@material-ui/icons";
import iconTypes from "./icon-types";

const icons = {
    [iconTypes.account]: Person,
    [iconTypes.algorithms]: AccountTree,
    [iconTypes.constructor]: Extension,
    [iconTypes.delete]: Delete,
    [iconTypes.logout]: ExitToApp,
    [iconTypes.home]: Home,
    [iconTypes.settings]: Settings,
    [iconTypes.tests]: ListAlt
};

export default icons;