const CTRes = require("./CTRes");

class ctHelper {
  constructor() {}

  async getLatLong(place, accessToken) {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${accessToken}`
    );
    const res = await response.json();
    return res.features[0].center;
  }

  //parse data from clinical trial api
  //https://clinicaltrials.gov/api/v2/studies
  async parseSearchResults(res) {
    const ctRes = new CTRes(res);
    const data = {};
    const cords = new Map();

    for (let i = 0; i < ctRes.getLen(); i++) {
      data[ctRes.getNCTId(i)] = ctRes.getJson(i);
      data[ctRes.getNCTId(i)]["geolocations"] = [];
      let locations = data[ctRes.getNCTId(i)].locations;

      for (let j = 0; j < locations?.length; j++) {
        let loc = locations[j];
        if (!cords.has(loc)) {
          const latLong = await this.getLatLong(
            loc,
            "MAP_TOKEN"
          );
          cords.set(loc, latLong);
        }
        data[ctRes.getNCTId(i)]["geolocations"].push(cords.get(loc));
      }
    }

    return data;
  }
}

module.exports = ctHelper;
