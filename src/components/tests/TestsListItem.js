import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const TestsListItem = ({ test }) => {
    return (
        <ListItem className="tests-list-item" button dense>
            <ListItemText
                primary={`${test.id} | ${test.name} | ${test.questions.length} вопросов | ${test.algorithm.id}`}
                secondary={test.algorithm.name}
            />
        </ListItem>
    );
};

export default TestsListItem;