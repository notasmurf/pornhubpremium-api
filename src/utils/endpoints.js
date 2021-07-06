const fetch = require('node-fetch');
const urls = require('../configs/urls');
const headers = require('../configs/headers');
const urlBuilder = require('./urlBuilder');

/**
 *
 * @param username
 * @param password
 * @returns {Promise<*>}
 */
const fetchAuth = async (username, password) => fetch(urls.authUrl, {
  headers,
  referrerPolicy: 'strict-origin-when-cross-origin',
  body: `username=${username}&password=${password}&remember_me=on&token=MTYyNTQyMDcwNb5XIi8iJdfI4nufH181JoGiF_SGbxS1ViuPgoFR5NkyppKnRiv6Aje9oYvSesEUEamrXgxmtEnbe-yzWOrkN6o.&redirect=&from=pc_premium_login&segment=straight`,
  method: 'POST',
  mode: 'cors',
});

/**
 *
 * @param options
 * @param cookie
 * @returns {Promise}
 */
const fetchVideos = async (options, cookie) => fetch(urlBuilder.buildVideosUrl(options),
  {
    headers: {
      ...headers,
      cookie,
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
  });

/**
 *
 * @param url
 * @param cookie
 * @returns {Promise}
 */
const fetchVideo = async (url, cookie) => fetch(url, {
  headers: {
    ...headers,
    cookie,
  },
  referrerPolicy: 'strict-origin-when-cross-origin',
  body: null,
  method: 'GET',
  mode: 'cors',
});

/**
 *
 * @param search
 * @param type
 * @param options
 * @param cookie
 * @returns {Promise}
 */
const fetchSearch = async (search, type, options, cookie) => fetch(
  urlBuilder.buildSearchUrl(search, type, options), {
    headers: {
      ...headers,
      cookie,
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
  },
);

/**
 *
 * @param url
 * @param cookie
 * @returns {Promise}
 */
const fetchModel = async (url, cookie) => fetch(url, {
  headers: {
    ...headers,
    cookie,
  },
  referrerPolicy: 'strict-origin-when-cross-origin',
  body: null,
  method: 'GET',
  mode: 'cors',
});

/**
 *
 * @param url
 * @param options
 * @param cookie
 * @returns {Promise}
 */
const fetchModelVideos = async (url, options, cookie) => fetch(
  urlBuilder.buildModelVideosUrl(url, options), {
    headers: {
      ...headers,
      cookie,
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
  },
);

module.exports = {
  fetchAuth,
  fetchVideos,
  fetchVideo,
  fetchSearch,
  fetchModel,
  fetchModelVideos,
};
