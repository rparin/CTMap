class ctHelper {
  constructor() {}

  //parse data from clinical trial api
  //https://clinicaltrials.gov/api/v2/studies
  parseSearchResults(res) {
    const data = {};
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
        if (
          res.studies[i].protocolSection.contactsLocationsModule.locations[j]
            .state
        ) {
          location.add(
            res.studies[i].protocolSection.contactsLocationsModule.locations[j]
              .state +
              ", " +
              res.studies[i].protocolSection.contactsLocationsModule.locations[
                j
              ].country
          );
        } else {
          location.add(
            res.studies[i].protocolSection.contactsLocationsModule.locations[j]
              .country
          );
        }
      }

      data[res.studies[i].protocolSection.identificationModule.nctId] =
        Array.from(location);
    }
    return data;
  }
}

module.exports = ctHelper;
