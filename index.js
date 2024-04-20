const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser');
const session = require('express-session');

require("dotenv").config();

//app
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//express flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//end express flash


// parse application/json
app.use(bodyParser.json())

app.use(methodOverride("_method"));


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
  console.log(`Listening on port ${port}`);
});
