const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./products.route");
const systemConfig = require("../../configs/system");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);
  app.use(`${PATH_ADMIN}/products`, productRoutes);
};
