const endpoints = require('./utils/endpoints');
const VideosPage = require('./pages/videos');
const VideoPage = require('./pages/video');
const SearchPage = require('./pages/search');

let cookie;

/**
 *
 * @param credentials
 * @returns {Promise<void>}
 * @private
 */
const authenticate = async (credentials = {}) => {
  const { username, password, cookie: authCookie } = credentials;

  if (!authCookie) {
    // @TODO: Make this work.
    const response = await endpoints.fetchAuth(username, password);
    cookie = response.headers.get('set-cookie');
  } else {
    cookie = authCookie;
  }
};

/**
 *
 * @param options
 * @returns {Promise<VideosPage>}
 * @private
 */
const videos = async (options = {}) => {
  const response = await endpoints.fetchVideos(options, cookie);

  const html = await response.text();
  const videosPage = new VideosPage(html, options);

  return videosPage;
};

/**
 *
 * @param url
 * @returns {Promise<VideoPage>}
 * @private
 */
const video = async (url) => {
  const response = await endpoints.fetchVideo(url, cookie);

  const html = await response.text();
  const videoPage = new VideoPage(html);

  return videoPage;
};

/**
 *
 * @param text
 * @param type
 * @param options
 * @returns {Promise<SearchPage>}
 */
const search = async (text = '', type = 'videos', options = {}) => {
  const response = await endpoints.fetchSearch(text, type, options, cookie);

  const html = await response.text();
  const searchPage = new SearchPage(html);

  return searchPage;
};

module.exports = {
  authenticate,
  videos,
  video,
  search,
};
