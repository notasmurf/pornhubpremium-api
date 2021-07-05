const Page = require('./page');
const urls = require('../configs/urls');

class VideoPage extends Page {
    constructor(html) {
        super(html);
    }

    getDownloads() {
        const downloadButtons = Array.from(this.dom('.downloadBtn'));

        const downloads = downloadButtons.map(downloadButton => {
            const downloadButtonElem = this.dom(downloadButton);
            const definition = downloadButtonElem.text().trim();
            const url = downloadButtonElem.attr('href');

            return {
                definition,
                url,
            };
        });

        return downloads;
    }

    getModels() {
        const modelButtons = Array.from(this.dom('.pstar-list-btn'));

        const models = modelButtons.map(modelButton => {
            const modelButtonElem = this.dom(modelButton);
            const name = modelButtonElem.attr('data-mxptext');
            const url = modelButtonElem.attr('href');

            return {
                name,
                url: `${urls.baseUrl}${url}`,
            };
        });
    }

}

module.exports = VideoPage;