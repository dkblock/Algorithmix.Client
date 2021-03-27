import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTitle } from "../../hooks";
import Paper from "@material-ui/core/Paper";
import algorithmDescriptions from "./descriptions";

const DescriptionComponent = (props) => {
    const { algorithm, component: PassedComponent } = props;

    if (!PassedComponent)
        return null;

    return <PassedComponent algorithm={algorithm}/>;
};

const AlgorithmDescription = () => {
    const params = useParams();
    const { algorithms } = useSelector(state => state.algorithm);
    const algorithm = algorithms.find(a => a.id === params.id);

    useTitle(algorithm?.name);

    if (!algorithm)
        return null;

    const component = algorithmDescriptions[params.id];

    return (
        <Paper className="algorithm-description">
            <DescriptionComponent algorithm={algorithm} component={component}/>
        </Paper>
    );
};

export default AlgorithmDescription;