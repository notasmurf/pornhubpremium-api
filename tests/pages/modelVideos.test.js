/* eslint-env mocha */
const assert = require('assert');
const nock = require('nock');
const ph = require('../../src');
const fixtures = require('../helpers/fixtures');
const matching = require('../helpers/matching');

describe('Videos Page', () => {
  before(() => nock.disableNetConnect());
  after(() => nock.enableNetConnect());

  it('should use the provided cookie in the request', async () => {
    const cookie = 'tinycookie;';
    nock('https://www.pornhubpremium.com')
      .get('/pornstar/britney-amber')
      .matchHeader('cookie', cookie)
      .reply(200, '');

    await ph.authenticate({ cookie });
    await ph.modelVideos('https://www.pornhubpremium.com/pornstar/britney-amber');
  });

  it('should correctly parameterize the page number', async () => {
    const expected = { page: '2' };
    nock('https://www.pornhubpremium.com')
      .get('/videos')
      .query(expected)
      .reply(200, '');

    await ph.videos({ page: 2 });
  });

  it('should return a page number', async () => {
    nock('https://www.pornhubpremium.com')
      .get('/pornstar/britney-amber')
      .query({ page: '2' })
      .reply(200, '');

    const modelVideosPage = await ph.modelVideos('https://www.pornhubpremium.com/pornstar/britney-amber', { page: 2 });
    const pageNumber = modelVideosPage.getPage();

    assert.equal(pageNumber, 2);
  });

  it('should return an array of videos from the results', async () => {
    const expected = {
      title: 'Stepmom Britney Amber Discipline Her Naughty Stepdaughter Katya Rodriguez',
      url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph60c34a288632f',
      duration: '21:56',
      username: 'Broken MILF',
    };
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/pornstar/britney-amber')
      .get('/pornstar/britney-amber')
      .reply(200, fixtures.getFixture('validModelVideosResult.html'));

    const modelVideosPage = await ph.modelVideos('https://www.pornhubpremium.com/pornstar/britney-amber');
    const videos = modelVideosPage.getVideos();

    const hasExpected = matching.findMatchingKeys(expected, videos);
    assert.ok(hasExpected);
  });
});
