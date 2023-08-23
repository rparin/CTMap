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
    const data = {};
    const cords = new Map();
    for (let i = 0; i < res.studies.length; i++) {
      const location = new Set();

      for (
        let j = 0;
        res.studies[i].protocolSection.contactsLocationsModule &&
        res.studies[i].protocolSection.contactsLocationsModule.locations &&
        j <
          res.studies[i].protocolSection.contactsLocationsModule.locations
            .length;
        j++
      ) {
        let loc =
          res.studies[i].protocolSection.contactsLocationsModule.locations[j]
            .country;
        if (
          res.studies[i].protocolSection.contactsLocationsModule.locations[j]
            .state
        ) {
          loc =
            res.studies[i].protocolSection.contactsLocationsModule.locations[j]
              .state +
            ", " +
            res.studies[i].protocolSection.contactsLocationsModule.locations[j]
              .country;
        }

        if (!cords.has(loc)) {
          const latLong = await this.getLatLong(
            loc,
            "MAP_TOKEN"
          );
          cords.set(loc, latLong);
        }

        location.add(cords.get(loc));
      }

      data[res.studies[i].protocolSection.identificationModule.nctId] =
        Array.from(location);
    }
    return data;
  }
}

module.exports = ctHelper;
