import accountRoutes from "./routes/account-routes";
import algorithmRoutes from "./routes/algorithm-routes";
import testRoutes from "./routes/test-routes";

const api = {
    account: accountRoutes,
    algorithms: algorithmRoutes,
    tests: testRoutes
};

export default api;