const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { database } = require("./keys.js");
const passport = require("passport");

// Initializations
const app = express();
require("./lib/passport.js");

// Settings
app.set("port", process.env.port || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars.js"),
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(
  session({
    key: "favorite_links_session",
    secret: "favorite_links_session",
    store: new MySQLStore(database),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require("./routes/index.js"));
app.use(require("./routes/authentication.js"));
app.use("/links", require("./routes/links.js"));

// Public
app.use(express.static(path.join(__dirname, "public")));

// Starting server
app.listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});
