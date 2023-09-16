const CTRes = require("./ctRes");

class ctHelper {
  constructor() {}

  async getLatLong(place) {
    try {
      let response = await fetch(`http://localhost:8080/api/mb/cord/${place}`);
      response = await response.json();
      return response?.cord;
    } catch (error) {
      return null;
    }
  }

  getNextPageToken(res) {
    const ctRes = new CTRes(res);
    return ctRes.getNextPage();
  }

  //parse data from clinical trial api
  //https://clinicaltrials.gov/api/v2/studies
  async parseSearchResults(res) {
    const ctRes = new CTRes(res);
    const data = {};
    const cords = new Map();

    for (let i = 0; i < ctRes.getLen(); i++) {
      data[ctRes.getNCTId(i)] = ctRes.getJson(i);
      data[ctRes.getNCTId(i)].geolocations = [];
      let locations = data[ctRes.getNCTId(i)].locations;
      var latLong = undefined;

      for (let j = 0; j < locations?.length; j++) {
        let loc = locations[j];
        if (!cords.has(loc)) {
          latLong = await this.getLatLong(loc);

          if (latLong) {
            cords.set(loc, latLong);
          }
        } else {
          latLong = cords.get(loc);
        }
        if (latLong) {
          data[ctRes.getNCTId(i)].geolocations.push(cords.get(loc));
        }
      }
    }

    return data;
  }

  getAggFilterUrl(filterJson) {
    if (filterJson == "null" || !filterJson) return "";
    var aggFilter = "&aggFilters=";
    if (filterJson?.eligibility?.sex != "") {
      aggFilter += "sex:" + filterJson.eligibility.sex + ",";
    }

    if (filterJson?.eligibility?.volunteers != "") {
      aggFilter += "healthy:" + filterJson.eligibility.volunteers + ",";
    }

    var phaseStr = "";
    for (var key in filterJson?.phase) {
      if (filterJson.phase[key] != "") {
        phaseStr += filterJson.phase[key] + " ";
      }
    }
    if (phaseStr != "") {
      aggFilter += "phase:" + phaseStr.trim() + ",";
    }

    var typeStr = "";
    for (var key in filterJson?.type) {
      if (filterJson.type[key] != "") {
        typeStr += filterJson.type[key] + " ";
      }
    }
    if (typeStr != "") {
      aggFilter += "studyType:" + typeStr.trim() + ",";
    }

    if (filterJson?.results?.with && filterJson?.results?.without) {
      // Do Nothing
    } else if (filterJson?.results?.with) {
      aggFilter += "results:with";
    } else if (filterJson?.results?.without) {
      aggFilter += "results:without";
    }
    if (aggFilter != "&aggFilters=") {
      if (aggFilter[aggFilter.length - 1] == ",")
        aggFilter = aggFilter.substring(0, aggFilter.length - 1);
      return aggFilter;
    }
    return "";
  }

  getPostFilterUrl(filterJson) {
    if (filterJson == "null" || !filterJson) return "";
    var min1, min2, max1, max2;
    const child = filterJson?.eligibility?.age?.child;
    const adult = filterJson?.eligibility?.age?.adult;
    const olderAdult = filterJson?.eligibility?.age?.older_adult;

    if ((child && adult && olderAdult) || (!child && !adult && !olderAdult)) {
      return "";
    } else if (child && adult) {
      (min1 = "MIN"), (min2 = "17 years");
      (max1 = "18 years"), (max2 = "64 years");
    } else if (child && olderAdult) {
      (min1 = "MIN"), (min2 = "17 years");
      (max1 = "65 years"), (max2 = "MAX");
    } else if (adult && olderAdult) {
      (min1 = "18 years"), (min2 = "64 years");
      (max1 = "65 years"), (max2 = "MAX");
    } else if (child) {
      (min1 = "MIN"), (min2 = "17 years");
      (max1 = min1), (max2 = min2);
      min1 = "MIN";
    } else if (adult) {
      (min1 = "18 years"), (min2 = "64 years");
      (max1 = min1), (max2 = min2);
    } else if (olderAdult) {
      (min1 = "65 years"), (min2 = "MAX");
      (max1 = min1), (max2 = min2);
    }
    var filter = `&postFilter.advanced=AREA[MinimumAge]RANGE[${min1}, ${min2}] AND AREA[MaximumAge]RANGE[${max1}, ${max2}]`;
    return filter;
  }

  getLocationFilter(filterJson) {
    if (filterJson == "null" || !filterJson) return "";
    const lat = filterJson?.location?.lat;
    const lng = filterJson?.location?.lng;
    const zip = filterJson?.location?.zip;
    const city = filterJson?.location?.city;
    var dist = filterJson?.location?.dist;
    var locField = "";

    if (city) {
      locField = ",LocationCity";
    }

    if (zip) {
      locField = `,LocationZip${locField}`;
    }

    if (lat && lng) {
      if (!dist) dist = "5";
      locField = `${locField}&filter.geo=distance(${lat},${lng},${dist}mi)`;
    }

    return locField;
  }

  getPageFilter(pageToken) {
    if (pageToken != null && pageToken != "" && pageToken != "null") {
      return `&pageToken=${pageToken}`;
    }
    return "";
  }
}

module.exports = ctHelper;
