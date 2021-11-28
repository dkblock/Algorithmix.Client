import * as materialIcons from "@mui/icons-material";
import TestsIcon from "./custom/tests-icon";
import iconTypes from "../../../constants/icon-types";

const icons = {
  [iconTypes.account]: materialIcons.Person,
  [iconTypes.algorithms]: materialIcons.AccountTree,
  [iconTypes.arrowDown]: materialIcons.KeyboardArrowUp,
  [iconTypes.arrowLeft]: materialIcons.NavigateBefore,
  [iconTypes.arrowRight]: materialIcons.NavigateNext,
  [iconTypes.clear]: materialIcons.Clear,
  [iconTypes.close]: materialIcons.Close,
  [iconTypes.constructor]: materialIcons.Widgets  ,
  [iconTypes.delete]: materialIcons.Delete,
  [iconTypes.done]: materialIcons.Done,
  [iconTypes.download]: materialIcons.Download,
  [iconTypes.draggable]: materialIcons.DragIndicator,
  [iconTypes.edit]: materialIcons.Edit,
  [iconTypes.help]: materialIcons.Help,
  [iconTypes.home]: materialIcons.Home,
  [iconTypes.info]: materialIcons.Info,
  [iconTypes.launch]: materialIcons.Launch,
  [iconTypes.logout]: materialIcons.ExitToApp,
  [iconTypes.manage]: materialIcons.Build,
  [iconTypes.more]: materialIcons.MoreVert,
  [iconTypes.play]: materialIcons.PlayCircleFilled,
  [iconTypes.plus]: materialIcons.Add,
  [iconTypes.result]: materialIcons.AssignmentTurnedIn,
  [iconTypes.search]: materialIcons.Search,
  [iconTypes.settings]: materialIcons.Settings,
  [iconTypes.stats]: materialIcons.Equalizer,
  [iconTypes.tests]: TestsIcon,
  [iconTypes.upload]: materialIcons.Publish,
  [iconTypes.uploadCloud]: materialIcons.CloudUpload,
};

export default icons;
