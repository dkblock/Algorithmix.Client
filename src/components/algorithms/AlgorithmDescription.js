import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { useTitle } from "../../hooks";
import { fetchAlgorithms } from "../../store/actions/algorithms";
import algorithmDescriptions from "./descriptions";
import routes from "../../utils/routes";
import AlgorithmTimeComplexity from "./AlgorithmTimeComplexity";

const DescriptionComponent = (props) => {
    const { component: PassedComponent } = props;
    return <PassedComponent/>;
};

const AlgorithmDescription = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const algorithm = useSelector(state => state.algorithms.algorithms.find(a => a.id === params.id));
    const component = algorithmDescriptions[params.id];

    useTitle(algorithm?.name);

    if (!algorithm) {
        dispatch(fetchAlgorithms());
        return null;
    }

    const algorithmTimeComplexity = {
        deletionAverageTime: "deletionAverageTime",
        deletionWorstTime: "deletionWorstTime",
        insertionAverageTime: "insertionAverageTime",
        insertionWorstTime: "insertionWorstTime",
        searchingAverageTime: "searchingAverageTime",
        searchingWorstTime: "searchingWorstTime"
    };

    return <DescriptionComponent component={component}/>;
    // return <AlgorithmTimeComplexity complexity={algorithmTimeComplexity}/>
};


export default AlgorithmDescription;