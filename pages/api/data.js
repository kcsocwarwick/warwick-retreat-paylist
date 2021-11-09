import { passwordCheckHandler } from "@storyofams/next-password-protect";
const csv = require("csvtojson");
const axios = require("axios");

const URL = process.env.URL;

export default async function handler(req, res) {
  const check = await passwordCheckHandler(process.env.PASSWORD, {
    cookieName: "next-password-protect",
  });
  console.log(check);

  const { data } = await axios.get(URL);
  const data_without_first_line = data.substring(data.indexOf("\n") + 1);
  const json = await csv().fromString(data_without_first_line);
  res.status(200).json(json);
}
