import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { Paper } from "@mui/material";
import { useTitle } from "../../../hooks";
import { fetchPublishedTests } from "../../../store/actions/test";
import Loader from "../../_common/loader";
import TestListTable from "./test-list-table";
import "./test-list.scss";

const TestList = () => {
  const dispatch = useDispatch();
  const { publishedTests: tests, isFetching } = useSelector((state) => state.test);

  const [searchText, setSearchText] = useState("");

  useTitle("Тесты", "Тесты");

  useEffect(() => {
    dispatch(fetchPublishedTests({ searchText }));
  }, [dispatch]);

  const handleSearch = useDebouncedCallback((searchText) => {
    dispatch(fetchPublishedTests({ searchText }));
  }, 500);

  const handleSearchTextChange = useCallback((value) => {
    setSearchText(value);
    handleSearch(value);
  }, []);

  return (
    <div className="test-list-container">
      <Paper className="test-list">
        {isFetching ? (
          <Loader className="m-auto" />
        ) : tests.length > 0 ? (
          <TestListTable tests={tests} searchText={searchText} onTestsSearch={handleSearchTextChange} />
        ) : (
          <div className="m-auto">Нет тестов</div>
        )}
      </Paper>
    </div>
  );
};

export default TestList;
