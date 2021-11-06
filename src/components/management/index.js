import React from "react";
import { useSelector } from "react-redux";
import { Paper } from "@mui/material";
import {
  navigateToAlgorithmsManagement,
  navigateToGroupsManagement,
  navigateToTestResultsManagement,
  navigateToTestsManagement,
  navigateToUsersManagement,
} from "../../utils/navigator";
import routes from "../../utils/routes";
import ExecutiveRoute from "../_common/route/executive-route";
import TabPanel from "../_common/tab-panel";
import AlgorithmList from "./algorithms/algorithm-list";
import TestList from "./tests/test-list";
import UserTestResultList from "./user-test-results/user-test-result-list";
import UserList from "./users/user-list";
import GroupList from "./groups/group-list";
import "./management.scss";

const tabRoutes = [
  routes.management.algorithms,
  routes.management.tests,
  routes.management.testResults,
  routes.management.users,
  routes.management.groups,
];

const tabs = [
  { label: "Алгоритмы", onClick: () => navigateToAlgorithmsManagement() },
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
          <ExecutiveRoute path={routes.management.algorithms} render={(props) => <AlgorithmList {...props} />} />
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
