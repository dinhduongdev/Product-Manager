const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
// system configuration
const systemConfig = require("./configs/system");
//import database
const database = require("./configs/database");
database.connect();

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));
//  Route
route(app);
routeAdmin(app);

// app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
