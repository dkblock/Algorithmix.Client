import React from "react";
import Paper from "@material-ui/core/Paper";
import { getImageSrc } from "../../../utils/get-image-src";

const TestInfo = ({ test }) => {
    if (!test)
        return null;

    return (
        <Paper className="test-info">
            <section className="test-info__section--description">
                <h4>{test.name}</h4>
                <hr/>
            </section>
            <section className="test-info__section--image">
                <img
                    className="test-info__image"
                    src={getImageSrc(test.algorithm.imageUrl)}
                    alt="algorithm-image"
                />
            </section>
        </Paper>
    );
};

export default TestInfo;