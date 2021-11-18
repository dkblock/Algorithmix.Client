import React from "react";
import { getFileSrc } from "../../../utils/get-file-src";
import AlgorithmTimeComplexity from "./algorithm-time-complexity";

const AlgorithmDescriptionHeader = ({ algorithm }) => (
  <div className="algorithm-description-header">
    <div className="algorithm-description-header__image">
      <img className="w-100" src={getFileSrc(algorithm.imageUrl)} alt="algorithm-image" />
    </div>
    <div className="algorithm-description-header__time-complexity">
      <AlgorithmTimeComplexity complexity={algorithm.timeComplexity} />
    </div>
  </div>
);

export default AlgorithmDescriptionHeader;
