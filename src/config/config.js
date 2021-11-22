const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return require("./config.development.json");
    case "production":
      return require("./config.production.json");
    default:
      return require("./config.production.json");
  }
};

export default getConfig();
