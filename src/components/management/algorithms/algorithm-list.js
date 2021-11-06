import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import { fetchAlgorithms, showCreateAlgorithmModal, showDeleteAlgorithmModal } from "../../../store/actions/algorithm";
import Table from "../../_common/table";
import Button, { colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";

const getActions = (onAlgorithmDelete) => [
  { label: "Редактировать", icon: iconTypes.edit, onClick: (algorithm) => onAlgorithmDelete(algorithm) },
  { label: "Удалить", icon: iconTypes.delete, onClick: (algorithm) => onAlgorithmDelete(algorithm) },
];

const columns = [
  { id: "name", label: "Название" },
  { id: "id", label: "ID" },
  { id: "testsCount", label: "Количество тестов", align: "center" },
];

const prepareAlgorithms = (algorithms) =>
  algorithms.map((algorithm) => ({
    ...algorithm,
    testsCount: algorithm.tests.length,
  }));

const AlgorithmList = () => {
  const dispatch = useDispatch();
  const { algorithms, isFetching } = useSelector((state) => state.algorithm);

  useTitle("Алгоритмы", "Алгоритмы");

  useEffect(() => {
    dispatch(fetchAlgorithms());
  }, []);

  const handleCreateGroup = useCallback(() => dispatch(showCreateAlgorithmModal()), [dispatch]);
  const handleDeleteGroup = useCallback((algorithm) => dispatch(showDeleteAlgorithmModal({ algorithm })), [dispatch]);

  const actions = useMemo(() => getActions(handleDeleteGroup), []);
  const preparedAlgorithms = useMemo(() => prepareAlgorithms(algorithms), [algorithms]);

  return (
    <Table
      toolbar={
        <Table.Toolbar title="Алгоритмы" count={algorithms.length}>
          <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleCreateGroup}>
            Новый алгоритм
          </Button>
        </Table.Toolbar>
      }
      columns={columns}
      data={preparedAlgorithms}
      actions={actions}
      isFetching={isFetching}
    />
  );
};

export default AlgorithmList;
