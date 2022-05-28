export default (() => {
  const config = {
    "development": () => require("./config.development.json"),
    "production": () => ({
      baseUrl: process.env.SERVER_URL,
    }),
  };

  return config[process.env.NODE_ENV]();
})();
