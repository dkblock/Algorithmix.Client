import accountRoutes from "./routes/account-routes";
import algorithmRoutes from "./routes/algorithm-routes";
import testRoutes from "./routes/test-routes";
import testAnswerRoutes from "./routes/test-answer-routes";
import testQuestionRoutes from "./routes/test-question-routes";

const api = {
    account: accountRoutes,
    algorithms: algorithmRoutes,
    tests: testRoutes,
    testAnswers: testAnswerRoutes,
    testQuestions: testQuestionRoutes
};

export default api;