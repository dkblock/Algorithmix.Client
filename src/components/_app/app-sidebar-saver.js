import React from "react";
import { useSelector } from "react-redux";
import routes from "../../utils/routes";
import Loader from "../_common/loader";
import { Icon, iconTypes } from "../_common/icon";
import Tooltip from "../_common/tooltip";
import colors from "../../constants/colors";

const AppSidebarSaver = () => {
  const { pathname: currentRoute } = useSelector((state) => state.router.location);
  const { isSaving: accountSaving } = useSelector((state) => state.account);
  const { isSaving: accountSettingsSaving } = useSelector((state) => state.accountSettings);
  const { isSaving: algorithmSaving } = useSelector((state) => state.algorithm);
  const { isSaving: algorithmDesignSaving } = useSelector((state) => state.algorithmDesign);
  const { isSaving: groupSaving } = useSelector((state) => state.group);
  const { isSaving: testSaving } = useSelector((state) => state.test);
  const { isSaving: testDesignSaving } = useSelector((state) => state.testDesign);
  const { isSaving: userSaving } = useSelector((state) => state.user);
  const { isSaving: userTestResultSaving } = useSelector((state) => state.userTestResult);

  const renderSaver =
    currentRoute.includes(routes.account.settings) ||
    currentRoute.includes(routes.management.main) ||
    currentRoute.includes("design");

  if (!renderSaver) return null;

  const isSaving =
    accountSaving ||
    accountSettingsSaving ||
    algorithmSaving ||
    algorithmDesignSaving ||
    groupSaving ||
    testSaving ||
    testDesignSaving ||
    userSaving ||
    userTestResultSaving;

  return (
    <div className="app-sidebar__saver">
      {isSaving ? (
        <Tooltip title="Идёт сохранение..." placement="right">
          <Loader size="small" />
        </Tooltip>
      ) : (
        <Tooltip title="Сохранено" placement="right">
          <Icon type={iconTypes.done} color={colors.primary} />{" "}
        </Tooltip>
      )}
    </div>
  );
};

export default AppSidebarSaver;
