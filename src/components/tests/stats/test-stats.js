import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useTitle } from "../../../hooks";
import { fetchTestStats } from "../../../store/actions/test-stats";
import TestStatsInfo from "./test-stats-info";
import TestQuestionStatsList from "./test-question-stats-list";
import Loader from "../../_common/loader";
import "./test-stats.scss";

const TestStats = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { test, questionStats, isFetching } = useSelector((state) => state.testStats);

  useTitle(test?.name, test?.name);

  useEffect(() => {
    dispatch(fetchTestStats({ testId }));
  }, [dispatch, testId]);

  if (isFetching) return <Loader className="m-auto" size="large" />;
  if (!test) return null;

  return (
    <div className="test-stats-container">
      <Paper className="test-stats">
        <TestStatsInfo test={test} />
        <Divider className="test-stats__divider" />
        <TestQuestionStatsList questionStats={questionStats} />
      </Paper>
    </div>
  );
};

export default TestStats;
