const checkStatusCode = (response, expected) => response.status === expected;

const statusCode = {
  ok: (response) => checkStatusCode(response, 200),
  created: (response) => checkStatusCode(response, 201),
  noContent: (response) => checkStatusCode(response, 204),
  badRequest: (response) => checkStatusCode(response, 400),
  unauthorized: (response) => checkStatusCode(response, 401),
  forbidden: (response) => checkStatusCode(response, 403),
  internalServerError: (response) => checkStatusCode(response, 500),
};

export default statusCode;
