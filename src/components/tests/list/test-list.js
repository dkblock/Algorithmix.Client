import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import { useTitle } from "../../../hooks";
import { fetchPublishedTests } from "../../../store/actions/test";
import Loader from "../../_common/loader";
import TableToolbar from "../../_common/table/table-toolbar";
import TestListItem from "./test-list-item";
import "./test-list.scss";

const TestList = () => {
  const dispatch = useDispatch();
  const { publishedTests: tests, isFetching } = useSelector((state) => state.test);

  useTitle("Тесты", "Тесты");

  useEffect(() => {
    dispatch(fetchPublishedTests());
  }, [dispatch]);

  return (
    <div className="test-list-container">
      <Paper className="test-list">
        <TableToolbar title="Тесты" count={tests.length} />
        <div className="test-list__items">
          {isFetching ? (
            <Loader className="m-auto" />
          ) : tests.length > 0 ? (
            tests.map((test) => <TestListItem key={test.id} test={test} />)
          ) : (
            <div className="m-auto">Нет тестов</div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default TestList;
