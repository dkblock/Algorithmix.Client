import React from "react";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import {
  navigateToGroupsManagement,
  navigateToTestResultsManagement,
  navigateToTestsManagement,
  navigateToUsersManagement,
} from "../../utils/navigator";
import routes from "../../utils/routes";
import ExecutiveRoute from "../_common/Route/ExecutiveRoute";
import TabPanel from "../_common/TabPanel";
import TestList from "./tests/TestList";
import UserTestResultList from "./user-test-results/UserTestResultList";
import UserList from "./users/UserList";
import GroupList from "./groups/GroupList";
import "./Management.scss";

const tabRoutes = [
  routes.management.tests,
  routes.management.testResults,
  routes.management.users,
  routes.management.groups,
];

const tabs = [
  { label: "Тесты", onClick: () => navigateToTestsManagement() },
  { label: "Результаты", onClick: () => navigateToTestResultsManagement() },
  { label: "Пользователи", onClick: () => navigateToUsersManagement() },
  { label: "Группы", onClick: () => navigateToGroupsManagement() },
];

const Management = () => {
  const currentRoute = useSelector((state) => state.router.location.pathname);

  return (
    <div className="w-100">
      <TabPanel tabs={tabs} value={tabRoutes.indexOf(currentRoute)} />
      <div className="management">
        <Paper className="management__content">
          <ExecutiveRoute path={routes.management.tests} render={(props) => <TestList {...props} />} />
          <ExecutiveRoute path={routes.management.testResults} render={(props) => <UserTestResultList {...props} />} />
          <ExecutiveRoute path={routes.management.users} render={(props) => <UserList {...props} />} />
          <ExecutiveRoute path={routes.management.groups} render={(props) => <GroupList {...props} />} />
        </Paper>
      </div>
    </div>
  );
};

export default Management;
