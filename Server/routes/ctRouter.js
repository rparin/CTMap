const express = require("express");
const CTHelper = require("../helpers/ctHelper");
const CTPdfInfo = require("../helpers/ctPdfInfo");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const ctHelper = new CTHelper();
const fields =
  "NCTId,LocationState,LocationCountry,BriefTitle,Condition,LeadSponsorName,StudyType,Phase,EnrollmentInfo,PrimaryCompletionDate,StartDate,CompletionDate,MinimumAge,MaximumAge,Sex,StdAge,HealthyVolunteers";
const ctPdfInfo = new CTPdfInfo();
const pdfFields = 
  "NCTId,OfficialTitle,DescriptionModule,Condition,LeadSponsorName,StudyType,Phase,EnrollmentInfo,PrimaryCompletionDate,StartDate,CompletionDate,ReferencesModule,ParticipantFlowModule";

router.get("/studies/:search/:filter", async (req, res) => {
  let aggFilter = ctHelper.getAggFilterUrl(JSON.parse(req.params.filter));
  let postFilter = ctHelper.getPostFilterUrl(JSON.parse(req.params.filter));
  var apiUrl = `https://clinicaltrials.gov/api/v2/studies?query.cond=${req.params.search}&fields=${fields}&pageSize=50${aggFilter}${postFilter}`;
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


router.get("/addct/:item", async (req, res) => {
  var apiUrl = `https://clinicaltrials.gov/api/v2/studies/${req.params.item}?fields=${pdfFields}`;
  try {
    let response = await fetch(apiUrl);
    response = await response.json()
    pdf = await ctPdfInfo.getInfo(response);
    // res.json({ itemList: item });
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

module.exports = router;
