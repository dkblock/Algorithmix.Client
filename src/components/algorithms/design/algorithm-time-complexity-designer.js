import React from "react";
import TextField from "../../_common/text-field";

const AlgorithmTimeComplexityDesigner = () => {
  return (
    <table>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
        <tr>
          <td>{num}</td>
          <td>
            <TextField />
          </td>
        </tr>
      ))}
    </table>
  );
};

export default AlgorithmTimeComplexityDesigner;
