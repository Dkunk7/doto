const express = require("express");
const routes = require("./controllers");
const path = require("path");
const expbhs = require("express-handlebars");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = expbhs.create();
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));


// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
});