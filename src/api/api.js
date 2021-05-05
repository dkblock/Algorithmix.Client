import accountRoutes from "./routes/account-routes";
import algorithmRoutes from "./routes/algorithm-routes";
import groupRoutes from "./routes/group-routes";
import testRoutes from "./routes/test-routes";
import testAnswerRoutes from "./routes/test-answer-routes";
import testQuestionRoutes from "./routes/test-question-routes";
import userRoutes from "./routes/user-routes";
import userTestResultRoutes from "./routes/user-test-result-routes";

const api = {
  account: accountRoutes,
  algorithms: algorithmRoutes,
  groups: groupRoutes,
  tests: testRoutes,
  testAnswers: testAnswerRoutes,
  testQuestions: testQuestionRoutes,
  users: userRoutes,
  userTestResult: userTestResultRoutes,
};

export default api;
