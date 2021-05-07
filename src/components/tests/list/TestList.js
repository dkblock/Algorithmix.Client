import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { useTitle } from "../../../hooks";
import { fetchPublishedTests } from "../../../store/actions/test";
import TableToolbar from "../../_common/Table/TableToolbar";
import TestListItem from "./TestListItem";
import "./TestList.scss";

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
          <div>
            {tests.map((test) => (
              <TestListItem key={test.id} test={test} />
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default TestList;
