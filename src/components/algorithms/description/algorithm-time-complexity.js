import React from "react";

const AlgorithmTimeComplexity = ({ complexity }) => {
    const hasSortingComplexity = () => (
        complexity.sortingAverageTime || complexity.sortingWorstTime || complexity.sortingBestTime
    );
    const hasSearchingComplexity = () => (complexity.searchingAverageTime || complexity.searchingWorstTime);
    const hasInsertionComplexity = () => (complexity.insertionAverageTime || complexity.insertionWorstTime);
    const hasDeletionComplexity = () => (complexity.deletionAverageTime || complexity.deletionWorstTime);
    const hasOperationsComplexity = () => (
        hasSearchingComplexity() || hasInsertionComplexity() || hasDeletionComplexity()
    );

    return (
        <>
            <h6 className="text-center">Временная сложность</h6>
            <table className="table table-bordered text-center description-table">
                {hasSortingComplexity() && <SortingComplexity complexity={complexity}/>}

                {hasOperationsComplexity() && (
                    <>
                        <thead>
                        <tr>
                            <th>Операция</th>
                            <th>В среднем</th>
                            <th>В худшем</th>
                        </tr>
                        </thead>

                        <tbody>
                        {hasSearchingComplexity() && <SearchingComplexity complexity={complexity}/>}
                        {hasInsertionComplexity() && <InsertionComplexity complexity={complexity}/>}
                        {hasDeletionComplexity() && <DeletionComplexity complexity={complexity}/>}
                        </tbody>
                    </>
                )}
            </table>
        </>
    );
};

const SortingComplexity = ({ complexity }) => (
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
    </tbody>
);

const SearchingComplexity = ({ complexity }) => (
    <tr>
        <td>Поиск</td>
        <td>{complexity.searchingAverageTime}</td>
        <td>{complexity.searchingWorstTime}</td>
    </tr>
);

const InsertionComplexity = ({ complexity }) => (
    <tr>
        <td>Вставка</td>
        <td>{complexity.insertionAverageTime}</td>
        <td>{complexity.insertionWorstTime}</td>
    </tr>
);

const DeletionComplexity = ({ complexity }) => (
    <tr>
        <td>Удаление</td>
        <td>{complexity.deletionAverageTime}</td>
        <td>{complexity.deletionWorstTime}</td>
    </tr>
);

export default AlgorithmTimeComplexity;