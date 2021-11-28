import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useTitle } from "../../../hooks";
import { fetchUserTestResult } from "../../../store/actions/user-test-result";
import UserTestResultInfo from "./user-test-result-info";
import UserAnswersList from "./user-answers-list";
import Loader from "../../_common/loader";
import "./test-result.scss";

const UserTestResult = () => {
  const dispatch = useDispatch();
  const { testId, userId } = useParams();
  const { testResult, isFetching } = useSelector((state) => state.userTestResult);

  useTitle("Тесты", "Тесты");

  useEffect(() => {
    dispatch(fetchUserTestResult({ testId, userId }));
  }, [dispatch, testId, userId]);

  if (isFetching) return <Loader className="m-auto" size="large" />;
  if (!testResult) return null;

  return (
    <div className="test-result-container">
      <Paper className="test-result">
        <UserTestResultInfo testResult={testResult} own={false} />
        <Divider className="test-result__divider" />
        <UserAnswersList testResult={testResult} own={false} />
      </Paper>
    </div>
  );
};

export default UserTestResult;
