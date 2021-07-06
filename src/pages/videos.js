const GalleryPage = require('./gallery');
const urls = require('../configs/urls');

class VideosPage extends GalleryPage {
  constructor(html, options = {}) {
    super(html);

    this.options = options;
  }

  getPage() {
    return this.options.page || 1;
  }

  getCategories() {
    const categoryListItems = Array.from(this.dom('.checkHomepage'));

    const categories = categoryListItems
      .map((categoryListItem) => {
        const categoryListElem = this.dom(categoryListItem);
        const name = categoryListElem.find('.categoryName').first().text().trim();
        let count = categoryListElem.find('.categoryNumber').first().text().trim();
        count = parseInt(count.replace(',', ''), 10);
        const url = categoryListElem.find('a').first().attr('href');

        return {
          name,
          count,
          url: `${urls.baseUrl}${url}`,
        };
      })
      .filter((category) => category.name);

    return categories;
  }
}

module.exports = VideosPage;
