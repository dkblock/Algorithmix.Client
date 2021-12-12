import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { useTitle } from "../../hooks";
import { navigateToAlgorithmConstructor } from "../../utils/navigator";
import { fetchAllAlgorithms } from "../../store/actions/algorithm";
import Button from "../_common/button";
import Table from "../_common/table";
import { iconTypes } from "../_common/icon";

const ConstructorListButton = ({ width, id, name }) => (
  <div className="m-auto" style={{ width: `${width}px` }}>
    <Button
      className="w-100"
      startIcon={iconTypes.constructor}
      endIcon={iconTypes.launch}
      onClick={() => navigateToAlgorithmConstructor(id)}
    >
      {name}
    </Button>
  </div>
);

const getButtonWidth = (algorithms) => algorithms.sort((a, b) => b.length - a.length)[0]?.length * 16;

const getColumns = (buttonWidth) => [
  {
    id: "left",
    label: "Алгоритмы...",
    align: "center",
    renderCell: ({ left }) => <ConstructorListButton id={left.id} name={left.name} width={buttonWidth} />,
  },
  {
    id: "right",
    label: "...и структуры данных",
    align: "center",
    renderCell: ({ right }) =>
      right ? <ConstructorListButton id={right.id} name={right.name} width={buttonWidth} /> : null,
  },
];

const prepareAlgorithms = (algorithms) => {
  const rows = [];

  algorithms
    .filter((algorithm) => algorithm.hasConstructor)
    .map((algorithm, i) => {
      if (i % 2 === 0) rows.push({ id: algorithm.id, left: { id: algorithm.id, name: algorithm.name } });
      else rows[rows.length - 1].right = { id: algorithm.id, name: algorithm.name };
    });

  return rows;
};

const ConstructorList = () => {
  const dispatch = useDispatch();
  const { algorithms, isFetching } = useSelector((state) => state.algorithm);

  useTitle("Конструктор", "Конструктор");

  useEffect(() => {
    dispatch(fetchAllAlgorithms());
  }, []);

  const preparedAlgorithms = prepareAlgorithms(algorithms);
  const buttonWidth = getButtonWidth(algorithms.map((a) => a.name));
  const columns = getColumns(buttonWidth);

  return (
    <div className="constructor-container">
      <Paper className="constructor-content">
        <Table columns={columns} data={preparedAlgorithms} isFetching={isFetching} />
      </Paper>
    </div>
  );
};

export default ConstructorList;
