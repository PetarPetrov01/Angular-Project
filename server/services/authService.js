const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = process.env.JWT_SECRET || "whg73hdgw6";

async function login(email, password) {
  const existingUser = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (!existingUser) {
    throw new Error("Invalid email or password");
  }

  const matchPass = await bcrypt.compare(password, existingUser.hashedPassword);
  if (!matchPass) {
    throw new Error("Invalid email or password");
  }

  return createToken(existingUser);
}

async function register(username, email, password) {
  const existingUser = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingUser) {
    throw new Error("This email is already taken");
  }

  const user = await User.create({
    email,
    username,
    hashedPassword: await bcrypt.hash(password, 10),
  });

  return createToken(user);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  return {
    user: {
      _id: user._id,
      email: user.email,
      username: user.username,
    },
    authToken: jwt.sign(payload, secret, {expiresIn: '30s'}),
  };
}

const authService = {
  login,
  register,
  verifyToken,
};

module.exports = authService;
