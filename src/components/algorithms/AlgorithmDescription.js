import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../hooks";
import { fetchAlgorithms } from "../../store/actions/algorithms";
import algorithmDescriptions from "./descriptions";

const DescriptionComponent = (props) => {
    const { algorithm, component: PassedComponent } = props;

    if (!PassedComponent)
        return null;

    return <PassedComponent algorithm={algorithm}/>;
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

    return <DescriptionComponent algorithm={algorithm} component={component}/>;
};

export default AlgorithmDescription;