import React, { useState } from "react";
import "./AppHeader.scss";

const AppHeader = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const handleOpenMenu = () => () => {
        setIsMenuOpened(!isMenuOpened);
    };

    return (
        <header className="app-header">
            <section className="app-header__section">
                <div className="app-header__logo">Visual Algorithms</div>
            </section>
            <section className="app-header__section">
                User settings
            </section>
        </header>
    );
}

export default AppHeader;