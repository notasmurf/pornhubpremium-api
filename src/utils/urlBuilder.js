const QueryString = require('querystring');
const kebabCase = require('lodash.kebabcase');
const urls = require('../configs/urls');
const search = require('../configs/search');

/**
 * 
 * @param options
 * @returns {string}
 * @private
 */
const _getBaseVideoUrl = (options = {}) => {
    if (Array.isArray(options.categories) && options.categories.length > 0) {
        if (options.categories.length === 1) {
            return `${urls.baseUrl}/${search.categories[options.categories[0]]}`;
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
const _getVideosParams = (params = {}) => Object.keys(params)
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
const _getPageParams = (params = {}) => params.page ? { page: params.page } : {};

/**
 * 
 * @param options
 * @returns {`${string}?${string}`}
 * @private
 */
const _buildVideosUrl = (options = {}) => {
    const videoBase = _getBaseVideoUrl(options);
    const queryObject = {
        ..._getVideosParams(options.video),
        ..._getPageParams(options.page),
    };
    const queryString = QueryString.stringify(queryObject);

    return `${videoBase}?${queryString}`;
};

module.exports = {
    buildSearchUrl: _buildVideosUrl,
};
