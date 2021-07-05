const endpoints = require('./utils/endpoints');
const VideosPage = require('./pages/videos');
const VideoPage = require('./pages/video');

let _cookie;

/**
 *
 * @param credentials
 * @returns {Promise<void>}
 * @private
 */
const _authenticate = async (credentials = {}) => {
    const { username, password, cookie } = credentials;

    if (!cookie) {
        const response = await endpoints.fetchAuth(username, password);
        _cookie = response.headers.get('set-cookie');
    } else {
        _cookie = cookie;
    }
}

/**
 *
 * @param options
 * @returns {Promise<VideosPage>}
 * @private
 */
const _videos = async (options = {}) => {
    const response = await endpoints.fetchVideos(options, _cookie);
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
const _video = async (url) => {
    const response = await endpoints.fetchPage(url, _cookie);

    const html = await response.text();
    const videoPage = new VideoPage(html);

    return videoPage;
}


module.exports = {
    authenticate: _authenticate,
    videos: _videos,
    video: _video,
};
