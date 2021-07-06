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
      .get('/video')
      .matchHeader('cookie', cookie)
      .reply(200, '');

    await ph.authenticate({ cookie });
    await ph.videos();
  });

  it('should correctly parameterize the page number', async () => {
    const expected = { page: '2' };
    nock('https://www.pornhubpremium.com')
      .get('/video')
      .query(expected)
      .reply(200, '');

    await ph.videos({ page: 2 });
  });

  it('should return a list of videos with no params', async () => {
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/video')
      .get('/video')
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    await ph.videos();
  });

  it('should return a single category as a param', async () => {
    const expected = { c: '42' };
    nock('https://www.pornhubpremium.com')
      .get('/video')
      .query(expected)
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    await ph.videos({ categories: ['Red Head'] });
  });

  it('should correctly parameterize the options', async () => {
    const expected = {
      download: '1',
      hd: '4',
      premium: '1',
      min_duration: '20',
      max_duration: '30',
      p: 'homemade',
      t: 't',
      o: 'mv',
    };
    nock('https://www.pornhubpremium.com')
      .get('/video')
      .query(expected)
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    await ph.videos({
      video: {
        premiumOnly: 1,
        downloadOnly: 1,
      },
      duration: {
        min: 20,
        max: 30,
      },
      quality: '4k',
      production: 'homemade',
      ranking: 'mostViewed',
      range: 'daily',
    });
  });

  it('should should not set the range for an invalid ranking', async () => {
    const expected = {
      o: 'lg',
    };
    nock('https://www.pornhubpremium.com')
      .get('/video')
      .query(expected)
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    await ph.videos({
      ranking: 'longest',
      range: 'daily',
    });
  });

  it('should return multiple categories as a new URL', async () => {
    nock('https://www.pornhubpremium.com')
      .get('/video/incategories/red-head/asian')
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    await ph.videos({
      categories: ['Red Head', 'Asian'],
    });
  });

  it('should return a single category as a query param', async () => {
    const expected = { c: '42' };
    nock('https://www.pornhubpremium.com')
      .get('/video')
      .query(expected)
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    await ph.videos({
      categories: ['Red Head'],
    });
  });

  it('should return all videos on the pages', async () => {
    const expected = {
      title: 'Eliza Ibarra Wants To Get Creampied Over And Over To Celebrate The 4th Of July!',
      url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph60dca43f969c6',
      duration: '26:34',
      username: 'Cum4K',
    };
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/video/incategories/red-head/asian')
      .get('/video/incategories/red-head/asian')
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    const videoPage = await ph.videos();
    const videos = videoPage.getVideos();

    const hasExpected = matching.findMatchingKeys(expected, videos);
    assert.ok(hasExpected);
  });

  it('should return a page number', async () => {
    nock('https://www.pornhubpremium.com')
      .get('/video')
      .query({ page: '2' })
      .reply(200, '');

    const videos = await ph.videos({ page: 2 });
    const pageNumber = videos.getPage();

    assert.equal(pageNumber, 2);
  });

  it('should default the page number to 1', async () => {
    nock('https://www.pornhubpremium.com')
      .get('/video')
      .reply(200, '');

    const videos = await ph.videos();
    const pageNumber = videos.getPage();

    assert.equal(pageNumber, 1);
  });

  it('should return whether the query returned matches', async () => {
    nock('https://www.pornhubpremium.com')
      .get('/video')
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    const videos = await ph.videos();
    const hasResults = videos.hasResults();

    assert.equal(hasResults, false);
  });

  it('should return an array of sidebar categories', async () => {
    const expected = { name: 'Popular With Women', count: 142, url: 'https://www.pornhubpremium.com/popularwithwomen' };
    nock('https://www.pornhubpremium.com')
      .filteringPath(() => '/video/incategories/red-head/asian')
      .get('/video/incategories/red-head/asian')
      .reply(200, fixtures.getFixture('validVideosResult.html'));

    const videoPage = await ph.videos();
    const categories = videoPage.getCategories();

    const hasExpected = matching.findMatchingKeys(expected, categories);
    assert.ok(hasExpected);
  });
});
