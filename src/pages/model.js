const camelCase = require('lodash.camelcase');
const GalleryPage = require('./gallery');
const urls = require('../configs/urls');

class ModelPage extends GalleryPage {
  getDetailedInfo() {
    // @TODO: This function will be hyper sensitive to a DOM change.
    // @TODO: Try and find a better method for scraping this DOM.
    const detailElem = this.dom('.detailedInfo').first();
    const propElems = Array.from(this.dom(detailElem).find('.infoPiece'));

    const details = propElems.reduce((acc, detail) => {
      const spans = Array.from(this.dom(detail).find('span'));
      const fieldElem = this.dom(spans[0]);
      const infoElem = this.dom(spans[1]);
      acc[camelCase(fieldElem.text().trim())] = infoElem.text().trim();

      return acc;
    }, {});

    return details;
  }

  getMoreVideosUrl() {
    const url = this.dom('#profileVideos a').attr('href');
    return `${urls.baseUrl}${url}`;
  }

  getMorePremiumVideosUrl() {
    return `${this.getMoreVideosUrl()}?premium=1`;
  }
}

module.exports = ModelPage;
