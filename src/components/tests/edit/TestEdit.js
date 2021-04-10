import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../../hooks";
import { fetchTestQuestions } from "../../../store/actions/test-question";
import Redirect, { routes } from "../../_common/Route/Redirect";
import TestQuestionList from "./TestQuestionList";
import TestQuestionInfo from "./TestQuestionInfo";
import "./TestEdit.scss";

const TestEdit = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { tests, isFetching } = useSelector((state) => state.test);
  const editedTest = tests.find((test) => test.id === parseInt(testId));

  useTitle("Тесты");

  useEffect(() => {
    dispatch(fetchTestQuestions({ testId }));
  }, [dispatch, testId]);

  if (!isFetching && !editedTest) {
    return <Redirect to={routes.tests} />;
  }

  return (
    <div className="test-edit">
      <TestQuestionList />
      <TestQuestionInfo />
    </div>
  );
};

export default TestEdit;
