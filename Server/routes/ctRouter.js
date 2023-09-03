const express = require("express");
const CTHelper = require("../helpers/ctHelper");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const ctHelper = new CTHelper();

router.get("/studies/:search", async (req, res) => {
  const apiUrl = `https://clinicaltrials.gov/api/v2/studies?query.cond=${req.params.search}&fields=NCTId,LocationState,LocationCountry,BriefTitle,Condition,LeadSponsorName,StudyType,Phase,EnrollmentInfo,PrimaryCompletionDate,StartDate,CompletionDate&pageSize=50`;
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

module.exports = router;
