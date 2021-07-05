const endpoints = require('./utils/endpoints');
const VideosPage = require('./pages/videos');
const VideoPage = require('./pages/video');

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
  const videosPage = new VideosPage(html);

  return videosPage;
};

/**
 *
 * @param url
 * @returns {Promise<VideoPage>}
 * @private
 */
const video = async (url) => {
  const response = await endpoints.fetchPage(url, cookie);

  const html = await response.text();
  const videoPage = new VideoPage(html);

  return videoPage;
};

module.exports = {
  authenticate,
  videos,
  video,
};
