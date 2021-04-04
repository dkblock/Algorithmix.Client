import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../../hooks";
import Redirect, { routes } from "../../_common/Route/Redirect";
import TestSettings from "./TestSettings";
import Loader from "../../_common/Loader";
import TestQuestionList from "./TestQuestionList";
import TestQuestionInfo from "./TestQuestionInfo";
import { fetchTest } from "../../../store/actions/test";
import { fetchTestQuestions } from "../../../store/actions/test-question";
import "./TestEdit.scss";

const TestEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedTest: test, isFetching } = useSelector((state) => state.test);
  const { selectedQuestion: question } = useSelector((state) => state.testQuestion);

  useTitle("Тесты");

  useEffect(() => {
    dispatch(fetchTest(id));
    dispatch(fetchTestQuestions(id));
  }, [dispatch, id]);

  if (isFetching) {
    return <Loader />;
  }

  if (!test) {
    return <Redirect to={routes.tests} />;
  }

  return (
    <div className="test-edit">
      <TestQuestionList />
      <TestQuestionInfo question={question} />
    </div>
  );
};

export default TestEdit;
