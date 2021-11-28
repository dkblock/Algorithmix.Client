import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../../hooks";
import { startTestPass } from "../../../store/actions/test-pass";
import Redirect, { routes } from "../../_common/route/redirect";
import Loader from "../../_common/loader";
import TestPassQuestion from "./test-pass-question";
import "./test-pass.scss";

const TestPass = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { currentTest, isStarted } = useSelector((state) => state.testPass);

  useTitle(currentTest?.name, currentTest?.name);

  useEffect(() => {
    dispatch(startTestPass({ testId }));
  }, [testId]);

  if (currentTest?.userResult) return <Redirect to={routes.tests.result(testId)} />;
  if (!isStarted) return <Loader className="m-auto" size="large" />;

  return (
    <div className="test-pass">
      <TestPassQuestion />
    </div>
  );
};

export default TestPass;
