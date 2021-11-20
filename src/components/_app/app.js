import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/actions/account";
import { fetchAllAlgorithms } from "../../store/actions/algorithm";
import { fetchAllGroups } from "../../store/actions/group";
import routes from "../../utils/routes";
import AppContent from "./app-content";
import AppSidebar from "./app-sidebar";

const App = () => {
  const dispatch = useDispatch();
  const currentRoute = useSelector((state) => state.router.location.pathname);
  const { header } = useSelector((state) => state.app);

  const renderHeader = currentRoute !== routes.home && currentRoute !== "/";

  useEffect(() => {
    dispatch(authenticate());
    dispatch(fetchAllAlgorithms());
    dispatch(fetchAllGroups());
  }, [dispatch]);

  return (
    <div className="app">
      <AppSidebar />
      <div className="app__main">
        {renderHeader && (
          <header className="app__page-header bg-light">
            <div className="app__page-header-title">{header}</div>
          </header>
        )}
        <AppContent />
      </div>
    </div>
  );
};

export default App;
