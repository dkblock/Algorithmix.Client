import React from "react";
import bem from "../../utils/bem";
import styles from "./PageTitle.module.scss";

const block = bem(styles);

const PageTitle = ({ children }) => (
    <div className={block()}>{children}</div>
);

export default PageTitle;