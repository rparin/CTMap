class CTRes {
  constructor(res) {
    this.ctRes = res;
    this.len = res.studies.length;
  }

  getJson(index) {
    return {
      nctId: this.getNCTId(index),
      title: this.getTitle(index),
      sponsor: this.getSponsor(index),
      conditions: this.getConditions(index),
      studyStart: this.getStudyStart(index),
      studyComp: this.getStudyCompletion(index),
      primaryComp: this.getPrimaryCompletion(index),
      studyType: this.getStudyType(index),
      enroll: this.getEnrollment(index),
      enrollType: this.getEnrollmentType(index),
      phase: this.getPhase(index),
      locations: this.getLocations(index),
      ageRange: this.getAgeRange(index),
      sex: this.getSex(index),
      healthy: this.getAcceptsHealthy(index),
      facility: this.getFacility(index),
    };
  }

  getNCTId(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection.identificationModule
        .nctId;
    }
    return undefined;
  }

  getTitle(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection.identificationModule
        ?.briefTitle;
    }
    return undefined;
  }

  getSponsor(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection
        ?.sponsorCollaboratorsModule?.leadSponsor?.name;
    }
    return undefined;
  }

  getConditions(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[
        index
      ].protocolSection?.conditionsModule?.conditions?.toString();
    }
    return undefined;
  }

  getSex(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection?.eligibilityModule?.sex;
    }
    return undefined;
  }

  getMinAge(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection?.eligibilityModule
        ?.minimumAge;
    }
    return undefined;
  }

  getMaxAge(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection?.eligibilityModule
        ?.maximumAge;
    }
    return undefined;
  }

  getStdAges(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[
        index
      ].protocolSection?.eligibilityModule?.stdAges?.toString();
    }
    return undefined;
  }

  getAgeRange(index) {
    var minAge = this.getMinAge(index);
    var maxAge = this.getMaxAge(index);
    if (!minAge && !maxAge) {
      return undefined;
    } else if (!minAge) {
      return "up to " + maxAge;
    } else if (!maxAge) {
      return minAge + " and older";
    } else if (minAge && maxAge) {
      return minAge + " to " + maxAge;
    }
    return undefined;
  }

  getAcceptsHealthy(index) {
    if (this._validIndex(index)) {
      const healthy =
        this.ctRes.studies[index].protocolSection?.eligibilityModule
          ?.healthyVolunteers;
      if (healthy == undefined) return undefined;
      else if (healthy) return "Yes";
      else return "No";
    }
    return undefined;
  }

  getStudyStart(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection?.statusModule
        ?.startDateStruct?.date;
    }
    return undefined;
  }

  getStudyCompletion(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection?.statusModule
        ?.primaryCompletionDateStruct?.date;
    }
    return undefined;
  }

  getPrimaryCompletion(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection?.statusModule
        ?.completionDateStruct?.date;
    }
    return undefined;
  }

  getStudyType(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection?.designModule?.studyType;
    }
    return undefined;
  }

  getEnrollment(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection?.designModule
        ?.enrollmentInfo?.count;
    }
    return undefined;
  }

  getEnrollmentType(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[index].protocolSection?.designModule
        ?.enrollmentInfo?.type;
    }
    return undefined;
  }

  getPhase(index) {
    if (this._validIndex(index)) {
      return this.ctRes.studies[
        index
      ].protocolSection?.designModule?.phases?.toString();
    }
    return undefined;
  }

  getFacility(index) {
    if (this._validIndex(index)) {
      if (
        this.ctRes.studies[index].protocolSection?.contactsLocationsModule
          ?.locations
      ) {
        const location = new Set();

        for (
          let i = 0;
          i <
          this.ctRes.studies[index].protocolSection.contactsLocationsModule
            .locations.length;
          i++
        ) {
          let facility =
            this.ctRes.studies[index].protocolSection.contactsLocationsModule
              .locations[i].facility;

          location.add(facility);
        }

        return Array.from(location);
      }
      return undefined;
    }
    return undefined;
  }

  getLocations(index) {
    if (this._validIndex(index)) {
      if (
        this.ctRes.studies[index].protocolSection?.contactsLocationsModule
          ?.locations
      ) {
        const location = new Set();

        for (
          let i = 0;
          i <
          this.ctRes.studies[index].protocolSection.contactsLocationsModule
            .locations.length;
          i++
        ) {
          let country =
            this.ctRes.studies[index].protocolSection.contactsLocationsModule
              .locations[i].country;

          let state =
            this.ctRes.studies[index].protocolSection.contactsLocationsModule
              .locations[i].state;

          let city =
            this.ctRes.studies[index].protocolSection.contactsLocationsModule
              .locations[i].city;

          let zip =
            this.ctRes.studies[index].protocolSection.contactsLocationsModule
              .locations[i].zip;

          let loc = country;

          if (state) {
            loc = `${state},${loc}`;
          }
          if (city) {
            loc = `${city},${loc}`;
          }
          if (zip) {
            loc = `${zip},${loc}`;
          }
          location.add(loc);
        }

        return Array.from(location);
      }
      return undefined;
    }
    return undefined;
  }

  getNextPage() {
    return this.ctRes?.nextPageToken;
  }

  getLen() {
    return this.len;
  }

  _validIndex(index) {
    if (index >= 0 && index < this.getLen()) {
      return true;
    }
    return false;
  }
}
module.exports = CTRes;
