import React from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { useTitle } from "../../hooks";
import { navigateToAlgorithmConstructor } from "../../utils/navigator";
import Table from "../_common/table";
import { iconTypes } from "../_common/icon";

const columns = [{ id: "name", label: "Алгоритм" }];

const actions = [
  {
    label: "Конструктор",
    icon: iconTypes.constructor,
    onClick: (algorithm) => navigateToAlgorithmConstructor(algorithm.id),
  },
];

const prepareAlgorithms = (algorithms) =>
  algorithms
    .filter((algorithm) => algorithm.hasConstructor)
    .map((algorithm) => ({
      id: algorithm.id,
      name: algorithm.name,
      image: algorithm.imageUrl,
    }));

const ConstructorMain = () => {
  const { algorithms, isFetching } = useSelector((state) => state.algorithm);

  useTitle("Конструктор", "Конструктор");

  const preparedAlgorithms = prepareAlgorithms(algorithms);

  return (
    <div className="constructor-container">
      <Paper className="constructor-content">
        <Table
          columns={columns}
          data={preparedAlgorithms}
          actions={actions}
          isFetching={isFetching}
          toolbar={<Table.Toolbar title="Алгоритмы" count={preparedAlgorithms.length} />}
        />
      </Paper>
    </div>
  );
};

export default ConstructorMain;
