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
      .get('/videos')
      .matchHeader('cookie', cookie)
      .reply(200, '');

    await ph.authenticate({ cookie });
    await ph.videos();
  });

  it('should return a list of videos with no params', async () => {
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/videos')
      .get('/videos')
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    await ph.videos();
  });

  it('should return a single category as a param', async () => {
    const expected = { c: '42', download: '1', premium: '1' };
    nock('https://www.pornhubpremium.com')
      .get('/video')
      .query(expected)
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    await ph.videos({
      video: {
        premiumOnly: 1,
        downloadOnly: 1,
      },
      categories: ['Red Head'],
    });
  });

  it('should return multiple categories as a new URL', async () => {
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/videos/incategories/red-head/asian')
      .get('/videos/incategories/red-head/asian')
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    await ph.videos({
      categories: ['Red Head', 'Asian'],
    });
  });

  it('should return an array of videos from the results', async () => {
    const expected = {
      title: 'Eliza Ibarra Wants To Get Creampied Over And Over To Celebrate The 4th Of July!',
      url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph60dca43f969c6',
      duration: '26:34',
      username: 'Cum4K',
    };
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/videos/incategories/red-head/asian')
      .get('/videos/incategories/red-head/asian')
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    const videoPage = await ph.videos();
    const videos = videoPage.getVideos();

    const hasExpected = matching.findMatchingKeys(expected, videos);
    assert.ok(hasExpected);
  });

  it('should return an array of sidebar categories', async () => {
    const expected = { name: 'Popular With Women', count: 142, url: '/popularwithwomen' };
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/videos/incategories/red-head/asian')
      .get('/videos/incategories/red-head/asian')
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    const videoPage = await ph.videos();
    const categories = videoPage.getCategories();

    const hasExpected = matching.findMatchingKeys(expected, categories);
    assert.ok(hasExpected);
  });
});
