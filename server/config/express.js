const express = require("express");
const cors = require("cors");
const moongoose = require("mongoose");
const { default: mongoose } = require("mongoose");

const connectionString =
  process.env.DB_URL || "mongodb://localhost:27017/dream-furniture";

module.exports = async (app) => {
  const connection = await mongoose.connect(connectionString);
  console.log("Connected to Database");

  app.use(express.json());
  app.use(cors());
  //session middleware
  //queryParams middleware
};
