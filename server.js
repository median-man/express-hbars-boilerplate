require("dotenv").config();
const express = require("express");
const sequelize = require("./config/connection");
const router = require("./controllers");
const exphbs = require("express-handlebars");
const helpers = require("./util/helpers");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

// setup app middleware
app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", exphbs({ helpers }));
app.set("view engine", "handlebars");
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// connect db and listen
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log(`App listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
