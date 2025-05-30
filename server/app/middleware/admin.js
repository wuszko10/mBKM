import jwt from "jsonwebtoken";
import config from "../config.js";

const admin = (req, res, next) => {

  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    req.user = jwt.verify(token, config.JwtSecret);
    if (!req.user.isAdmin) {
      return res.status(403).send('Access denied.');
    }
    next();
  }
  catch (ex) {
    res.status(401).send('Invalid token.');
  }
};

export default admin;
