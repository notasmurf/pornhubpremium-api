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

  return urls.videoUrl;
};

/**
 *
 * @param type
 * @returns {string}
 */
const getBaseSearchUrl = (type) => (type === 'video' ? urls.videoSearchUrl : urls.modelSearchUrl);

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
 * @param page
 * @returns {{page}}
 */
const getPageParams = (page) => (page ? { page } : {});

/**
 *
 * @param quality
 * @returns {*}
 */
const getQualityParams = (quality) => (
  quality
    ? { [search.keys.quality]: search.quality[quality] }
    : {}
);

/**
 *
 * @param production
 * @returns {*}
 */
const getProductionParams = (production) => (
  production
    ? { [search.keys.production]: production }
    : {}
);

/**
 *
 * @param ranking
 * @param range
 * @returns {{}}
 */
const getRankRangeParams = (ranking, range) => {
  const params = {};
  if (search.rankings[ranking]) {
    params[search.keys.rankings] = search.rankings[ranking];
    if (search.rangedRankings.includes(ranking) && search.ranges[range]) {
      params[search.keys.ranges] = search.ranges[range];
    }
  }

  return params;
};

/**
 *
 * @param duration
 * @returns {{}}
 */
const getDurationParams = (duration = {}) => Object.keys(search.duration)
  .reduce((acc, key) => {
    if (duration[key]) acc[search.duration[key]] = duration[key];
    return acc;
  }, {});

/**
 *
 * @param options
 * @returns {`${string}?${string}`}
 * @private
 */
const buildVideosUrl = (options = {}) => {
  const defaultOptions = {
    ranking: '',
    range: '',
    ...options,
  };
  const videoBase = getBaseVideoUrl(defaultOptions);
  let queryObject = QueryString.parseUrl(videoBase);

  queryObject = {
    ...queryObject.query,
    ...getVideosParams(defaultOptions.video),
    ...getPageParams(defaultOptions.page),
    ...getQualityParams(defaultOptions.quality),
    ...getDurationParams(defaultOptions.duration),
    ...getProductionParams(defaultOptions.production),
    ...getRankRangeParams(defaultOptions.ranking, defaultOptions.range),
  };
  const queryString = QueryString.stringify(queryObject);
  const urlString = videoBase.split('?')[0]; // Remove latent queries.

  return `${urlString}${queryString.length ? '?' : ''}${queryString}`;
};

/**
 *
 * @param query
 * @param type
 * @param options
 * @returns {string}
 */
const buildSearchUrl = (query, type, options) => {
  const searchBase = getBaseSearchUrl(type);

  const queryObject = {
    ...getPageParams(options.page),
    search: query,
  };
  const queryString = QueryString.stringify(queryObject);

  return `${searchBase}${queryString.length ? '?' : ''}${queryString}`;
};

/**
 *
 * @param url
 * @param options
 * @returns {string}
 */
const buildModelVideosUrl = (url, options) => {
  const queryObject = {
    ...getPageParams(options.page),
  };
  const queryString = QueryString.stringify(queryObject);

  return `${url}${queryString.length ? '?' : ''}${queryString}`;
};

module.exports = {
  buildVideosUrl,
  buildSearchUrl,
  buildModelVideosUrl,
};
