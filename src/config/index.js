export default (() => {
  const config = {
    "development": () => require("./config.development.json"),
    "production": () => ({
      baseUrl: import.meta.env.SERVER_URL,
    }),
  };

  return config[process.env.NODE_ENV]();
})();
