const express = require("express");

const app = express();

// 1) middlewares
app.use(express.static(`${__dirname}/public`));

// 2) routes

module.exports = app;
