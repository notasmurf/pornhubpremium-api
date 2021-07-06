/* eslint-env mocha */
const assert = require('assert');
const nock = require('nock');
const ph = require('../../src');
const fixtures = require('../helpers/fixtures');
const matching = require('../helpers/matching');

describe('Video Page', () => {
  before(() => nock.disableNetConnect());
  after(() => nock.enableNetConnect());

  it('should use the provided cookie in the request', async () => {
    const cookie = 'tinycookie;';
    nock('https://www.pornhubpremium.com')
      .get('/view_video.php')
      .query({ viewkey: 'ph60c3b0ef87832' })
      .matchHeader('cookie', cookie)
      .reply(200, '');

    await ph.authenticate({ cookie });
    await ph.video('https://www.pornhubpremium.com/view_video.php?viewkey=ph60c3b0ef87832');
  });

  it('should return an array of models', async () => {
    const expected = [{
      name: 'Peter King',
      url: 'https://www.pornhubpremium.com/pornstar/peter-king',
    }];
    nock('https://www.pornhubpremium.com')
      .get('/view_video.php')
      .query({ viewkey: 'ph60c3b0ef87832' })
      .reply(200, fixtures.getFixture('validVideoResult.html'));

    const videoPage = await ph.video('https://www.pornhubpremium.com/view_video.php?viewkey=ph60c3b0ef87832');
    const models = videoPage.getModels();

    assert.deepEqual(models, expected);
  });

  it('should return a list of download links', async () => {
    const expected = {
      definition: 'HD 1440p',
      url: 'https://ed.phncdn.com/videos/202107/02/390581561/1440P_6000K_390581561.mp4?validfrom=1625571027&validto=1625578227&rate=50000k&burst=50000k&ip=71.241.248.52&ipa=71.241.248.52&hash=oW6FEmjz4V4d4Be0vNOj4ejT8Wk%3D',
    };
    nock('https://www.pornhubpremium.com')
      .get('/view_video.php')
      .query({ viewkey: 'ph60c3b0ef87832' })
      .reply(200, fixtures.getFixture('validVideoResult.html'));

    const videoPage = await ph.video('https://www.pornhubpremium.com/view_video.php?viewkey=ph60c3b0ef87832');
    const downloads = videoPage.getDownloads();
    const hasExpected = matching.findMatchingKeys(expected, downloads);

    assert.ok(hasExpected);
  });

  it('should return an array of categories associated to the video', async () => {
    const expected = { url: 'https://www.pornhubpremium.com/video?c=4', name: 'Big Ass' };
    nock('https://www.pornhubpremium.com')
      .get('/view_video.php')
      .query({ viewkey: 'ph60c3b0ef87832' })
      .reply(200, fixtures.getFixture('validVideoResult.html'));

    const videoPage = await ph.video('https://www.pornhubpremium.com/view_video.php?viewkey=ph60c3b0ef87832');
    const categories = videoPage.getCategories();
    const hasExpected = matching.findMatchingKeys(expected, categories);

    assert.ok(hasExpected);
  });
});
