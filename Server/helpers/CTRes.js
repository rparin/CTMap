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
      enrollType: this.getEnrollment(index),
      enrollType: this.getEnrollmentType(index),
      phase: this.getPhase(index),
      locations: this.getLocations(index),
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
          let loc =
            this.ctRes.studies[index].protocolSection.contactsLocationsModule
              .locations[i].country;
          if (
            this.ctRes.studies[index].protocolSection.contactsLocationsModule
              .locations[i].state
          ) {
            loc =
              this.ctRes.studies[index].protocolSection.contactsLocationsModule
                .locations[i].state +
              ", " +
              this.ctRes.studies[index].protocolSection.contactsLocationsModule
                .locations[i].country;
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
