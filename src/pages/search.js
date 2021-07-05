const Page = require('./page');

class SearchPage extends Page {
  constructor(html, options = {}) {
    super(html);

    this.options = options;
  }

  getPage() {
    return this.options.page || 1;
  }

  getModels() {
    const modelSearchResults = Array.from(this.dom('#pornstarsSearchResult .wrap'));

    const models = modelSearchResults.map((searchResult) => {
      const searchResultElem = this.dom(searchResult);
      const thumbnailWrapper = searchResultElem.find('.thumbnail-info-wrapper');
      const thumbnailAnchor = thumbnailWrapper.find('a');

      const name = thumbnailAnchor.text().trim();
      const rank = searchResultElem.find('.rank_number').text().trim();
      const videos = thumbnailWrapper.find('.videosNumber').text().trim();
      const views = thumbnailWrapper.find('.pstarViews').text().trim();

      return {
        rank,
        name,
        videos,
        views,
      };
    });

    return models;
  }
}

module.exports = SearchPage;
