import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../../hooks";
import { fetchTest } from "../../../store/actions/test";
import Redirect, { routes } from "../../_common/Route/Redirect";
import TestQuestionList from "./TestQuestionList";
import TestQuestionDesigner from "./test-question/TestQuestionDesigner";
import "./TestDesigner.scss";

const TestDesigner = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { tests, isFetching } = useSelector((state) => state.test);
  const { test } = useSelector((state) => state.testDesign);
  const isTestExist = isFetching || tests.some((test) => test.id === parseInt(testId));

  useTitle(test?.name, test?.name);

  useEffect(() => {
    dispatch(fetchTest({ testId }));
  }, [dispatch, testId]);

  if (!isTestExist) return <Redirect to={routes.management.tests} />;
  if (!test) return null;

  return (
    <div className="test-design">
      <TestQuestionList />
      {/*<TestQuestionDesigner />*/}
    </div>
  );
};

export default TestDesigner;
