import cookie from "cookie";
import jwt from "jsonwebtoken";
const csv = require("csvtojson");
const axios = require("axios");

const URL = process.env.URL;

export default async function handler(req, res) {
  console.log(URL);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.

  const check = await passwordCheck(process.env.PASSWORD);
  const checkRes = await check(req, res);
  if (!checkRes) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: "Unauthorized" }));
    return;
  }

  const { data } = await axios.get(URL);
  const data_without_first_line = data.substring(data.indexOf("\n") + 1);
  const json = await csv().fromString(data_without_first_line);
  res.status(200).json(json);
}

export const passwordCheck = (password, options) => async (req) => {
  try {
    if (req.method !== "GET") {
      throw new Error("Invalid method.");
    }

    if (req?.headers?.cookie) {
      const cookies = cookie.parse(req.headers.cookie);
      const cookieName = options?.cookieName || "next-password-protect";
      jwt.verify(cookies?.[cookieName], password);
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};
