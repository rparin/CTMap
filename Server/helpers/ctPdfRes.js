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
          ?.officialTitle;
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
        const references = this.ctPdf.protocolSection?.referencesModule?.references;
    
        if (references) {
            const publications = new Set();
    
            for (let i = 0; i < references.length; i++) {
                if (references[i].citation) {
                    publications.add(references[i].citation);
                }
            }
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
        const groups = this.ctPdf.resultsSection?.participantFlowModule?.groups;

        if (groups) {
            const allGroups = {};

            for (let i = 0; i < groups.length; i++) {
               allGroups[groups[i].title] = groups[i].description;
            }
    
            console.log(allGroups);
            return allGroups;
        }
    }

    getPeriods() {
        const periods = this.ctPdf.resultsSection?.participantFlowModule?.periods;

        if (periods) {
            const summary = {};
    
            for (let period of periods) {
                const periodTitle = period.title;
                summary[periodTitle] = {};
    
                for (let milestone of period.milestones) {
                    const milestoneType = milestone.type;
                    summary[periodTitle][milestoneType] = {};
    
                    for (let achievement of milestone.achievements) {
                        const groupId = achievement.groupId;
                        const numSubjects = achievement.numSubjects;
                        summary[periodTitle][milestoneType][groupId] = numSubjects;
                    }
                }
            }
            return summary;
        }
    }

    getBaseline(){
        return this.ctPdf.resultsSection?.baselineCharacteristicsModule?.populationDescription;
    }

    getBaselineGroups(){
        const groups = this.ctPdf.resultsSection?.baselineCharacteristicsModule?.groups

        if (groups) {
            const allGroups = {};

            for (let i = 0; i < groups.length; i++) {
               allGroups[groups[i].title] = groups[i].description;
            }
    
            console.log(allGroups);
            return allGroups;
        }

    }

          
  }
  module.exports = CTPdfRes;
  