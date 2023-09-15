class CTPdfRes {
    constructor(res) {
      this.ctPdf = res;
    }
  
    getNCTId() {
        return this.ctPdf.protocolSection.identificationModule
          .nctId;
    }
    
    getLongTitle() {
        return this.ctPdf.protocolSection.identificationModule
          ?.OfficialTitle;
    }
  
    getSponsor() {
        return this.ctPdf.protocolSection
          ?.sponsorCollaboratorsModule?.leadSponsor?.name;
    }
  
    getConditions() {
        return this.ctPdf.protocolSection?.conditionsModule?.conditions?.toString();
    }
  
    getStudyStart() {
        return this.ctPdf.protocolSection?.statusModule
          ?.startDateStruct?.date;
    }
  
    getStudyCompletion() {
        return this.ctPdf.protocolSection?.statusModule
          ?.primaryCompletionDateStruct?.date;
    }
  
    getPrimaryCompletion() {
        return this.ctPdf.protocolSection?.statusModule
          ?.completionDateStruct?.date;
    }
  
    getStudyType() {
        return this.ctPdf.protocolSection?.designModule?.studyType;
    }

    getBriefSummary() {
        return this.ctPdf.protocolSection?.descriptionModule.briefSummary;
    }

    getDetailedDescription() {
        return this.ctPdf.protocolSection?.descriptionModule.detailedDescription;
    }

    getPublications() {
        if (this.ctPdf.protocolSection?.referencesModule?.references) {

            const jsonData = this.ctPdf.protocolSection?.referencesModule?.references
            const publications = new Set();
            console.log(jsonData)

            for (let i = 0; i < jsonData.length; i++)
                {
                    if (jsonData.citation)
                    {
                        publications.add(jsonData.citation)
                    }
                }
            console.log(publications)
            return Array.from(publications);
        }
    }

    getPreassignmentDetails() {
        return this.ctPdf.resultsSection?.participantFlowModule.preAssignmentDetails;
    }

    getRecruitmentDetails() {
        return this.ctPdf.resultsSection?.participantFlowModule.recruitmentDetails;
    }

    getGroups() {
        if (this.ctPdf.resultsSection?.participantFlowModule?.groups) {
            
          const jsonData = this.ctPdf.resultsSection?.participantFlowModule?.groups
          const groups = new Set();

            while (jsonData)
                {
                    groups[jsonData.title] = jsonData.description;
                }
            return groups;
        }
    }

    getPeriods() {
        if (
            this.ctPdf.resultsSection?.participantFlowModule?.periods?.title
        ) {

            const jsonData = this.ctPdf.resultsSection?.participantFlowModule?.periods
            const periods = new {};

            for (let i = 0; i < jsonData?.length; i++)
                {
                    periods[jsonData.title] = {};
                    if (jsonData.title.milestones === "STARTED" || jsonData.title.milestones === "COMPLETED")
                    {
                      periods[jsonData.title][jsonData.milestones.type] = jsonData.milestones.achievements.reduce((sum, achievement) => sum + parseInt(jsonData.milestones.achievements.numSubjects), 0);
                    }
                }
            return periods
            }
          }
          
  }
  module.exports = CTPdfRes;
  