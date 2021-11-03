import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../hooks";
import algorithmsData from "../../constants/algorithms-data";
import { getFileSrc } from "../../utils/get-file-src";

const { constructor } = algorithmsData;

const ConstructorAlgorithm = () => {
  const { algorithmId } = useParams();
  const { algorithms } = useSelector((state) => state.algorithm);
  const algorithm = algorithms?.find((a) => a.id === algorithmId);

  useTitle("Конструктор", algorithm?.name);

  return (
    <iframe
      style={{ width: "100%", backgroundColor: "#FFFFFF" }}
      frameBorder={0}
      src={getFileSrc(constructor(algorithmId))}
      title="constructor"
    />
  );
};

export default ConstructorAlgorithm;
