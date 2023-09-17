const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = express.Router();

//Import Env Variables
require("dotenv").config({ path: "../.env" });
const { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE } = process.env;

router.get("/location/:coords", async (req, res) => {
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.params.coords}.json?types=country,region,postcode,district,place&access_token=${REACT_APP_MAPBOX_ACCESS_TOKEN}`;

  try {
    let response = await fetch(apiUrl);
    response = await response.json();
    result = response.features[0].place_name;
    res.json({ locationResult: result });
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

router.get("/cord/:place", async (req, res) => {
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.params.place}.json?access_token=${REACT_APP_MAPBOX_ACCESS_TOKEN}`;
  try {
    let response = await fetch(apiUrl);
    response = await response.json();
    res.json({ cord: response?.features[0]?.center });
    res.status(200);
  } catch (error) {
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

module.exports = router;

console.log(REACT_APP_MAPBOX_ACCESS_TOKEN);
