import routes from "./routes";

const sidebarSelector = {
  home: (currentRoute) => currentRoute === "/" || currentRoute.includes(routes.home),
  algorithms: (currentRoute) =>
    currentRoute.includes(routes.algorithms.main) &&
    !currentRoute.includes(routes.management.main) &&
    !currentRoute.includes("design"),
  constructor: (currentRoute) => currentRoute.includes(routes.constructor.main),
  tests: (currentRoute) =>
    currentRoute.includes(routes.tests.main) &&
    !currentRoute.includes(routes.management.main) &&
    !currentRoute.includes("design"),
  management: (currentRoute) => currentRoute.includes(routes.management.main) || currentRoute.includes("design"),
};

export default sidebarSelector;
