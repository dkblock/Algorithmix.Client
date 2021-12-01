import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../../hooks";
import { fetchTest } from "../../../store/actions/test";
import Loader from "../../_common/loader";
import TabPanel from "../../_common/tab-panel";
import TestSettings from "./test-settings";
import TestQuestionList from "./test-question-list";
import TestQuestionDesigner from "./test-question-designer/test-question-designer";
import TestDesignerStatus from "./test-designer-status";
import Redirect, { routes } from "../../_common/route/redirect";
import "./test-designer.scss";

const getTabs = (onQuestionListSelect, onTestSettingsSelect) => [
  { label: "Вопросы", onClick: () => onQuestionListSelect() },
  { label: "Настройки", onClick: () => onTestSettingsSelect() },
];

const TestDesigner = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { test, question, isFetching, hasError } = useSelector((state) => state.testDesign);

  const [currentTab, setCurrentTab] = useState(0);

  useTitle(test?.name, test?.name);

  useEffect(() => {
    dispatch(fetchTest({ testId }));
  }, [dispatch, testId]);

  const handleQuestionListSelect = useCallback(() => setCurrentTab(0), []);
  const handleTestSettingsSelect = useCallback(() => setCurrentTab(1), []);

  const tabs = useMemo(() => getTabs(handleQuestionListSelect, handleTestSettingsSelect), [
    handleQuestionListSelect,
    handleTestSettingsSelect,
  ]);

  if (isFetching) return <Loader className="m-auto" size="large" />;
  if (hasError) return <Redirect to={routes.management.tests} />;

  return (
    <div className="test-design">
      <div className="test-design-dashboard">
        <TabPanel tabs={tabs} value={currentTab} />
        <TestDesignerStatus />
        <div className="test-design-dashboard__body">
          {currentTab === 0 && <TestQuestionList />}
          {currentTab === 1 && <TestSettings />}
        </div>
      </div>
      {question && <TestQuestionDesigner />}
    </div>
  );
};

export default TestDesigner;
