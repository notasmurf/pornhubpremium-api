/* eslint-env mocha */
const assert = require('assert');
const nock = require('nock');
const ph = require('../../src');
const fixtures = require('../helpers/fixtures');
const matching = require('../helpers/matching');

describe('Search Page', () => {
  before(() => nock.disableNetConnect());
  after(() => nock.enableNetConnect());

  it('should use the provided cookie in the request', async () => {
    const cookie = 'tinycookie;';
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/pornstars/search')
      .get('/pornstars/search')
      .matchHeader('cookie', cookie)
      .reply(200, '');

    await ph.authenticate({ cookie });
    await ph.search('Abby', 'pornstars');
  });

  it('should correctly parameterize the search', async () => {
    const expected = { search: 'Abby' };
    nock('https://www.pornhubpremium.com')
      .get('/pornstars/search')
      .query(expected)
      .reply(200, '');

    await ph.search('Abby', 'pornstars');
  });

  it('should correctly parameterize the page number', async () => {
    const expected = { search: 'Abby', page: '2' };
    nock('https://www.pornhubpremium.com')
      .get('/pornstars/search')
      .query(expected)
      .reply(200, '');

    await ph.search('Abby', 'pornstars', { page: 2 });
  });

  it('should return a list of models for a models search', async () => {
    const expected = {
      rank: '8041',
      name: 'Abby Lane',
      videos: '12 Videos',
      views: '382K views',
    };
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/pornstars/search')
      .get('/pornstars/search')
      .reply(200, fixtures.getFixture('validSearchModelResult.html'));

    const results = await ph.search('Abby', 'pornstars', { page: 2 });
    const models = results.getModels();

    const hasExpected = matching.findMatchingKeys(expected, models);
    assert.ok(hasExpected);
  });
});