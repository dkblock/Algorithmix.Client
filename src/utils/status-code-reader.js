const statusCode = () => {
    const ok = (response) => response.status === 200;
    const created = (response) => response.status === 201;
    const badRequest = (response) => response.status === 400;
    const unauthorized = (response) => response.status === 401;
    const forbidden = (response) => response.status === 403;
    const internalServerError = (response) => response.status === 500;

    return {
        ok,
        created,
        badRequest,
        unauthorized,
        forbidden,
        internalServerError
    };
};

export default statusCode();