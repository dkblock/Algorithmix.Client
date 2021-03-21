import {
    AccountTree,
    Delete,
    Equalizer,
    ExitToApp,
    Extension,
    Home,
    Info,
    ListAlt,
    Person,
    Settings
} from "@material-ui/icons";
import iconTypes from "./icon-types";

const icons = {
    [iconTypes.account]: Person,
    [iconTypes.algorithms]: AccountTree,
    [iconTypes.constructor]: Extension,
    [iconTypes.delete]: Delete,
    [iconTypes.home]: Home,
    [iconTypes.info]: Info,
    [iconTypes.logout]: ExitToApp,
    [iconTypes.settings]: Settings,
    [iconTypes.stats]: Equalizer,
    [iconTypes.tests]: ListAlt
};

export default icons;