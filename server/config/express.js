const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const cookieParser = require('cookie-parser');

const session = require("../middlewares/session");
const queryParams = require("../controllers/queryParams");

const connectionString =
  process.env.DB_URL || "mongodb://localhost:27017/dream-furniture";
const cookieSecret = process.env.COOKIE_SECRET || 'DreamFurniture';

module.exports = async (app) => {
  const connection = await mongoose.connect(connectionString);
  console.log("Connected to Database");

  app.use(express.json());
  app.use(cookieParser(cookieSecret))
  app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));
  app.use(session());
  app.use(queryParams());
};
