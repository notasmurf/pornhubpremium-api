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

  it('should return a page number', async () => {
    nock('https://www.pornhubpremium.com')
      .get('/pornstars/search')
      .query({ search: 'Abby', page: '2' })
      .reply(200, '');

    const results = await ph.search('Abby', 'pornstars', { page: 2 });
    const pageNumber = results.getPage();

    assert.equal(pageNumber, 2);
  });

  it('should default the page number to 1', async () => {
    nock('https://www.pornhubpremium.com')
      .get('/pornstars/search')
      .query({ search: 'Abby' })
      .reply(200, '');

    const results = await ph.search('Abby', 'pornstars');
    const pageNumber = results.getPage();

    assert.equal(pageNumber, 1);
  });

  it('should return a list of models for a models search', async () => {
    const expected = {
      rank: '8041',
      name: 'Abby Lane',
      videos: '12 Videos',
      views: '382K views',
      url: 'https://www.pornhubpremium.com/pornstar/abby-lane',
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

  it('should return a list of videos for a videos search', async () => {
    const expected = {
      title: 'My Friend‘s Mom By Cory Chase and Codey Steele',
      url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph60e0b1cde0307',
      duration: '30:30',
      username: 'Dr.K In LA',
    };
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/pornstars/search')
      .get('/pornstars/search')
      .reply(200, fixtures.getFixture('validSearchModelResult.html'));

    const results = await ph.search('Abby', 'videos', { page: 2 });
    const videos = results.getVideos();

    const hasExpected = matching.findMatchingKeys(expected, videos);
    assert.ok(hasExpected);
  });
});
