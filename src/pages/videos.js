const Page = require('./page');
const urls = require('../configs/urls');

class VideosPage extends Page {
  constructor(html, options = {}) {
    super(html);

    this.options = options;
  }

  getPage() {
    return this.options.page || 1;
  }

  getVideos() {
    const videoListItems = Array.from(this.dom('.pcVideoListItem'));

    const videos = videoListItems.map((videoListItem) => {
      const videoListElem = this.dom(videoListItem);

      const username = videoListElem.find('.usernameWrap').first().text().trim();
      const duration = videoListElem.find('.duration').first().text().trim();
      const titleElem = videoListElem.find('[title]');
      const title = titleElem.attr('title').trim();
      const url = titleElem.attr('href');

      return {
        title,
        url: `${urls.baseUrl}${url}`,
        duration,
        username,
      };
    });

    return videos;
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
