import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "../../../utils/validation";
import TextField from "../../_common/text-field";
import { updateAlgorithm } from "../../../store/actions/algorithm";
import { useDebouncedCallback } from "use-debounce";

const { validateName, validateAlgorithm } = validator.algorithm;

const AlgorithmInfoDesigner = () => {
  const dispatch = useDispatch();
  const { algorithm, validationErrors: serverValidationErrors } = useSelector((state) => state.algorithmDesign);

  const [id, setId] = useState(algorithm.id);
  const [name, setName] = useState(algorithm.name);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setId(algorithm.id);
    setName(algorithm.name);
    setValidationErrors({});
  }, [algorithm.id, algorithm.name]);

  useEffect(() => {
    setValidationErrors({ ...validationErrors, ...serverValidationErrors });
  }, [serverValidationErrors]);

  const handleUpdateAlgorithm = useCallback(
    (params) => {
      const updatedAlgorithm = { ...algorithm, id, name, ...params };
      const { isValid } = validateAlgorithm(updatedAlgorithm);

      if (isValid) {
        dispatch(updateAlgorithm({ algorithmId: id, algorithm: updatedAlgorithm }));
      }
    },
    [dispatch, id, name]
  );

  const handleUpdateNameDebounced = useDebouncedCallback(({ value }) => {
    handleUpdateAlgorithm({ name: value });
  }, 500);

  const handleNameChange = useCallback(
    (value) => {
      setName(value);
      handleUpdateNameDebounced({ value });
    },
    [handleUpdateNameDebounced]
  );
  const handleNameFocus = useCallback(() => setValidationErrors({ ...validationErrors, name: null }), [
    validationErrors,
  ]);
  const handleNameFocusOut = useCallback(() => {
    const validationError = validateName(name);
    setValidationErrors({ ...validationErrors, name: validationError });
  }, [name, validationErrors]);

  return (
    <div className="algorithm-info-designer">
      <TextField
        className="w-100"
        label="ID алгоритма"
        value={id}
        disabled
      />
      <TextField
        className="w-100"
        label="Название алгоритма"
        error={Boolean(validationErrors.name)}
        helperText={validationErrors.name}
        value={name}
        onChange={handleNameChange}
        onFocus={handleNameFocus}
        onFocusOut={handleNameFocusOut}
      />
    </div>
  );
};

export default AlgorithmInfoDesigner;
