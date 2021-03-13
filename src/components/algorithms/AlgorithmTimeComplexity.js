import React from "react";

const AlgorithmTimeComplexity = ({ complexity }) => (
    <>
        <h6 className="text-center">Временная сложность</h6>
        <table className="table table-bordered text-center description-table">
            {!!complexity.sortingAverageTime &&
            <tbody>
                <tr>
                    <td><b>В худшем</b></td>
                    <td>{complexity.sortingWorstTime}</td>
                </tr>
                <tr>
                    <td><b>В среднем</b></td>
                    <td>{complexity.sortingAverageTime}</td>
                </tr>
                <tr>
                    <td><b>В лучшем</b></td>
                    <td>{complexity.sortingBestTime}</td>
                </tr>
            </tbody>}

            {!!complexity.searchingAverageTime &&
            <>
                <thead>
                <tr>
                    <th>Операция</th>
                    <th>В среднем</th>
                    <th>В худшем</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>Поиск</td>
                    <td>{complexity.searchingAverageTime}</td>
                    <td>{complexity.searchingWorstTime}</td>
                </tr>

                {!!complexity.insertionAverageTime &&
                <tr>
                    <td>Вставка</td>
                    <td>{complexity.insertionAverageTime}</td>
                    <td>{complexity.insertionWorstTime}</td>
                </tr>}

                {!!complexity.deletionAverageTime &&
                <tr>
                    <td>Удаление</td>
                    <td>{complexity.deletionAverageTime}</td>
                    <td>{complexity.deletionWorstTime}</td>
                </tr>}

                </tbody>
            </>}
        </table>
    </>
);

export default AlgorithmTimeComplexity;