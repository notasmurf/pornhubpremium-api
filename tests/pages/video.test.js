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
      name: 'Britney Amber',
      url: 'https://www.pornhubpremium.com/pornstar/britney-amber',
    }];
    nock('https://www.pornhubpremium.com')
      .get('/view_video.php')
      .query({ viewkey: 'ph60c3b0ef87832' })
      .reply(200, fixtures.getFixture('validVideoResult.html'));

    const videoPage = await ph.video('https://www.pornhubpremium.com/view_video.php?viewkey=ph60c3b0ef87832');
    const models = videoPage.getModels();

    assert.deepEqual(models, expected);
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
