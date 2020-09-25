import React, { useState } from "react";
import bem from "../../../utils/bem";
import styles from "./TestComponent.module.scss";

const block = bem(styles);

const TestComponent = () => {
    const [items, setItems] = useState([0, 1, 2, 3, 4, 5]);

    return (
        <div>
            <div className={block()}>
                {items.map((_) =>
                    items.map((_) => (
                        <img className="col-2" src="https://localhost:5000/cat" alt="cat"/>
                    ))
                )}
            </div>
        </div>
    );
};

export default TestComponent;
