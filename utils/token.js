/** @format */

import jwt from "jsonwebtoken";

export const createToken = async (data) => {
  const key = process.env.JWT_TOKEN_SECRET;
  const expireTime = process.env.TOKEN_EXPIRATION2;
  const token = await jwt.sign(data, key, { expiresIn: expireTime });
  return token;
};

export const decodeToken = async (token) => {
  const key = process.env.JWT_TOKEN_SECRET;
  const decodedToken = await jwt.verify(token, key);
  return decodedToken;
};