/* eslint-env mocha */
const assert = require('assert');
const nock = require('nock');
const ph = require('../../src');
const fixtures = require('../helpers/fixtures');

describe('Page', () => {
  before(() => nock.disableNetConnect());
  after(() => nock.enableNetConnect());

  it('should error if a login page appears for a video request', async () => {
    nock('https://www.pornhubpremium.com')
      .get('/view_video.php')
      .query({ viewkey: 'ph60c3b0ef87832' })
      .reply(200, fixtures.getFixture('loginPage.html'));

    const getPage = async () => ph.video('https://www.pornhubpremium.com/view_video.php?viewkey=ph60c3b0ef87832');

    assert.rejects(getPage, Error);
  });

  it('should error if the page was not found', async () => {
    nock('https://www.pornhubpremium.com')
      .get('/view_video.php')
      .query({ viewkey: 'ph60c3b0ef87832' })
      .reply(200, fixtures.getFixture('notFoundPage.html'));

    const getPage = async () => ph.video('https://www.pornhubpremium.com/view_video.php?viewkey=ph60c3b0ef87832');

    assert.rejects(getPage, Error);
  });
});
