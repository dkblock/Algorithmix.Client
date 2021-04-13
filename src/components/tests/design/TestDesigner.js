import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../../hooks";
import { editTest } from "../../../store/actions/test";
import { fetchTestQuestions } from "../../../store/actions/test-question";
import Redirect, { routes } from "../../_common/Route/Redirect";
import TestQuestionList from "./TestQuestionList";
import TestQuestionDesigner from "./TestQuestionDesigner";
import "./TestDesigner.scss";

const TestDesigner = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { editedTest, tests } = useSelector((state) => state.test);
  const isTestExist = tests.length === 0 || tests.some((test) => test.id === parseInt(testId));

  useTitle("Тесты");

  useEffect(() => {
    if (!editedTest) {
      const test = tests.find((t) => t.id === parseInt(testId));
      dispatch(editTest({ test }));
    }

    dispatch(fetchTestQuestions({ testId }));
  }, [dispatch, editedTest, testId, tests]);

  if (!isTestExist) {
    return <Redirect to={routes.tests} />;
  }

  if (!editedTest) {
    return null;
  }

  return (
    <div className="test-edit">
      <TestQuestionList />
      <TestQuestionDesigner />
    </div>
  );
};

export default TestDesigner;
