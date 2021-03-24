import * as materialIcons from "@material-ui/icons";
import iconTypes from "./icon-types";

const icons = {
    [iconTypes.account]: materialIcons.Person,
    [iconTypes.algorithms]: materialIcons.AccountTree,
    [iconTypes.constructor]: materialIcons.Extension,
    [iconTypes.delete]: materialIcons.Delete,
    [iconTypes.home]: materialIcons.Home,
    [iconTypes.info]: materialIcons.Info,
    [iconTypes.logout]: materialIcons.ExitToApp,
    [iconTypes.plus]: materialIcons.AddBox,
    [iconTypes.settings]: materialIcons.Settings,
    [iconTypes.stats]: materialIcons.Equalizer,
    [iconTypes.tests]: materialIcons.ListAlt
};

export default icons;