const Page = require('./page');
const urls = require('../configs/urls');

class GalleryPage extends Page {
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
}

module.exports = GalleryPage;
