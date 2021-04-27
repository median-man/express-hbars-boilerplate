require("dotenv").config();
const util = require("util");
const express = require("express");
const sequelize = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const listen = util.promisify(app.listen);
sequelize
  .sync({ force: false })
  .then(() => listen())
  .then(() => console.log(`App listening on PORT ${PORT}`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
