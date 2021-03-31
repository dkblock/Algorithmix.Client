import { getRoute } from "../../utils/get-route";

const testRoutes = {
    fetchTests: () => getRoute("tests"),
    fetchTest: (testId) => getRoute(`tests/${testId}`),
    createTest: () => getRoute("tests"),
    deleteTest: (testId) => getRoute(`tests/${testId}`),
    updateTest: (testId) => getRoute(`tests/${testId}`)
};

export default testRoutes;