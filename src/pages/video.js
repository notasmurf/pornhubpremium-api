const Page = require('./page');
const urls = require('../configs/urls');

class VideoPage extends Page {
  getDownloads() {
    const downloadButtons = Array.from(this.dom('.downloadBtn'));

    const downloads = downloadButtons.map((downloadButton) => {
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

    const models = modelButtons.map((modelButton) => {
      const modelButtonElem = this.dom(modelButton);
      const name = modelButtonElem.attr('data-mxptext');
      const url = modelButtonElem.attr('href');

      return {
        name,
        url: `${urls.baseUrl}${url}`,
      };
    });

    return models;
  }

  getCategories() {
    const categoryItems = Array.from(this.dom('.categoriesWrapper .item'));

    const categories = categoryItems.map((categoryItem) => {
      const categoryItemElem = this.dom(categoryItem);
      const url = categoryItemElem.attr('href');
      const name = categoryItemElem.text();

      return {
        url: `${urls.baseUrl}${url}`,
        name,
      };
    });

    return categories;
  }
}

module.exports = VideoPage;
