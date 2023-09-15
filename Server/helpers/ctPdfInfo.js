const CtPdfRes = require('./ctPdfRes')

class ctPdfInfo {
    constructor() {}

    async getInfo(res) {
        const ctPdf = new CtPdfRes(res);
        console.log(ctPdf.getGroups())
        
    }
}

module.exports = ctPdfInfo;
