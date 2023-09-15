const express = require("express");
const CTHelper = require("../helpers/ctHelper");
const CTPdfInfo = require("../helpers/ctPdfInfo");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const ctHelper = new CTHelper();
const fields =
  "NCTId,LocationState,LocationCountry,LocationFacility,BriefTitle,Condition,LeadSponsorName,StudyType,Phase,EnrollmentInfo,PrimaryCompletionDate,StartDate,CompletionDate,MinimumAge,MaximumAge,Sex,StdAge,HealthyVolunteers";
const ctPdfInfo = new CTPdfInfo();
const pdfFields =
  "NCTId,OfficialTitle,DescriptionModule,Condition,LeadSponsorName,StudyType,Phase,EnrollmentInfo,PrimaryCompletionDate,StartDate,CompletionDate,ReferencesModule,ParticipantFlowModule";

router.get(
  "/studies/:search/:filter/:pageToken/:pageSize",
  async (req, res) => {
    var filter = "null";
    if (req.params.filter && req.params.filter != "null") {
      filter = req.params.filter;
    }
    const aggFilter = ctHelper.getAggFilterUrl(filter);
    const postFilter = ctHelper.getPostFilterUrl(filter);
    const locFilter = ctHelper.getLocationFilter(filter);
    const pageFilter = ctHelper.getPageFilter(req.params.pageToken);
    const apiUrl = `https://clinicaltrials.gov/api/v2/studies?query.cond=${req.params.search}&fields=${fields}${locFilter}&pageSize=${req.params.pageSize}${aggFilter}${postFilter}${pageFilter}`;
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
  }
);

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

router.get("/addct/:item", async (req, res) => {
  var apiUrl = `https://clinicaltrials.gov/api/v2/studies/${req.params.item}?fields=${pdfFields}`;
  try {
    let response = await fetch(apiUrl);
    response = await response.json();
    pdf = await ctPdfInfo.getInfo(response);
    // res.json({ itemList: item });
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

module.exports = router;
