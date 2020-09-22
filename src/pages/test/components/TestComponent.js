import React from "react";
import bem from "../../../utils/bem";
import styles from "./TestComponent.module.scss";

const block = bem(styles);

const TestComponent = () => {
    const items = [0, 1, 2, 3, 4, 5];

    return (
        <div className={block()}>
            {items.map((item, index) => (
                <div className={index % 2 === 0 ? block("item") : block("item", { ["green"]: true })}>
                    {item}
                </div>
            ))}
        </div>
    )
};

export default TestComponent;