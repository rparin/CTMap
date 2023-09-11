const express = require("express");
const CTHelper = require("../helpers/ctHelper");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const ctHelper = new CTHelper();
const fields =
  "NCTId,LocationState,LocationCountry,BriefTitle,Condition,LeadSponsorName,StudyType,Phase,EnrollmentInfo,PrimaryCompletionDate,StartDate,CompletionDate,MinimumAge,MaximumAge,Sex,StdAge,HealthyVolunteers";

router.get("/studies/:search/:filter/:pageToken", async (req, res) => {
  let aggFilter = ctHelper.getAggFilterUrl(JSON.parse(req.params.filter));
  let postFilter = ctHelper.getPostFilterUrl(JSON.parse(req.params.filter));
  var apiUrl = `https://clinicaltrials.gov/api/v2/studies?query.cond=${req.params.search}&fields=${fields}&pageSize=50${aggFilter}${postFilter}`;
  if (
    req.params.pageToken != null &&
    req.params.pageToken != "" &&
    req.params.pageToken != "null"
  ) {
    apiUrl = `https://clinicaltrials.gov/api/v2/studies?query.cond=${req.params.search}&fields=${fields}&pageSize=50${aggFilter}${postFilter}&pageToken=${req.params.pageToken}`;
  }
  try {
    let response = await fetch(apiUrl);
    response = await response.json();
    result = await ctHelper.parseSearchResults(response);
    nextPage = ctHelper.getNextPageToken(response);
    res.json({ searchResult: result, nextPageToken: nextPage });
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
