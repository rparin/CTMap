const express = require("express");
const CTHelper = require("../helpers/ctHelper");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const ctHelper = new CTHelper();

router.get("/studies/:search", async (req, res) => {
  const apiUrl = `https://clinicaltrials.gov/api/v2/studies?query.cond=${req.params.search}&fields=NCTId,LocationState,LocationCountry&pageSize=50`;
  try {
    let response = await fetch(apiUrl);
    response = await response.json();
    result = await ctHelper.parseSearchResults(response);
    res.json({ searchResult: result });
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

router.get("/location/:coords", async (req, res) => {
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.params.coords}.json?types=country,region,postcode,district,place&access_token=MAP_TOKEN`;
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

module.exports = router;
