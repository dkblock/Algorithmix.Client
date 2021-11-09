import algorithmDataTypes from "./algorithm-data-types";

const algorithmsData = {
  [algorithmDataTypes.constructor]: (algorithmId) => `algorithms/${algorithmId}/constructor/${algorithmId}.html`,
  [algorithmDataTypes.description]: (algorithmId) => `algorithms/${algorithmId}/description/${algorithmId}.html`,
};

export default algorithmsData;
