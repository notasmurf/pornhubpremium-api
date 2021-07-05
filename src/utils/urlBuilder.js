const QueryString = require('query-string');
const kebabCase = require('lodash.kebabcase');
const camelCase = require('lodash.camelcase');
const urls = require('../configs/urls');
const search = require('../configs/search');

/**
 *
 * @param options
 * @returns {string}
 * @private
 */
const getBaseVideoUrl = (options = {}) => {
  if (Array.isArray(options.categories) && options.categories.length > 0) {
    if (options.categories.length === 1) {
      const option = camelCase(options.categories[0]);
      return `${urls.baseUrl}${search.categories[option]}`;
    }
    const incategories = [
      kebabCase(options.categories[0]).toLowerCase(),
      kebabCase(options.categories[1]).toLowerCase(),
    ].join('/');

    return `${urls.incategories}/${incategories}`;
  }

  return urls.videosUrl;
};

/**
 *
 * @param params
 * @returns {{}}
 */
const getVideosParams = (params = {}) => Object.keys(params)
  .reduce((acc, key) => {
    const match = search.video[key];
    if (match) acc[search.video[key]] = params[key];

    return acc;
  }, {});

/**
 *
 * @param params
 * @returns {{page: *}}
 */
const getPageParams = (params = {}) => (params.page ? { page: params.page } : {});

/**
 *
 * @param options
 * @returns {`${string}?${string}`}
 * @private
 */
const buildVideosUrl = (options = {}) => {
  const videoBase = getBaseVideoUrl(options);
  let queryObject = QueryString.parseUrl(videoBase);
  queryObject = {
    ...queryObject.query,
    ...getVideosParams(options.video),
    ...getPageParams(options.page),
  };
  const queryString = QueryString.stringify(queryObject);
  const urlString = videoBase.split('?')[0]; // Remove latent queries.

  return `${urlString}${queryString.length ? '?' : ''}${queryString}`;
};

module.exports = {
  buildVideosUrl,
};
