/* eslint-env mocha */
const assert = require('assert');
const nock = require('nock');
const ph = require('../../src');
const fixtures = require('../helpers/fixtures');

describe('Models Page', () => {
  before(() => nock.disableNetConnect());
  after(() => nock.enableNetConnect());

  it('should use the provided cookie in the request', async () => {
    const cookie = 'tinycookie;';
    nock('https://www.pornhubpremium.com')
      .get('/pornstar/britney-amber')
      .matchHeader('cookie', cookie)
      .reply(200, '');

    await ph.authenticate({ cookie });
    await ph.model('https://www.pornhubpremium.com/pornstar/britney-amber');
  });

  it('should return model\'s details', async () => {
    const expected = {
      relationshipStatus: 'Single',
      interestedIn: 'Guys and Girls',
      cityAndCountry: 'Southern California, US',
      pornstarProfileViews: '35,568,683',
      careerStatus: 'Active',
      careerStartAndEnd: '2008 to Present',
      gender: 'Female',
      birthPlace: 'Banning, California, United States of America',
      starSign: 'Scorpio',
      measurements: '36D-24-34',
      height: '5 ft 5 in (165 cm)',
      weight: '115 lbs (52 kg)',
      ethnicity: 'White',
      hairColor: 'Blonde',
      fakeBoobs: 'Yes',
      tattoos: 'Yes',
      piercings: 'Yes',
      interestsAndHobbies: 'Archery and Bowhunting',
      hometown: 'Southern California',
      profileViews: '21,998,089',
      videosWatched: '51',
    };
    nock('https://www.pornhubpremium.com')
      .get('/pornstar/britney-amber')
      .reply(200, fixtures.getFixture('validModelResult.html'));

    const model = await ph.model('https://www.pornhubpremium.com/pornstar/britney-amber');
    const details = model.getDetailedInfo();

    assert.deepEqual(expected, details);
  });

  it('should return a URL for videos', async () => {
    const expected = 'https://www.pornhubpremium.com/pornstar/britney-amber/videos';
    nock('https://www.pornhubpremium.com')
      .get('/pornstar/britney-amber')
      .reply(200, fixtures.getFixture('validModelResult.html'));

    const model = await ph.model('https://www.pornhubpremium.com/pornstar/britney-amber');
    const url = model.getMoreVideosUrl();

    assert.equal(expected, url);
  });

  it('should return a URL for premium videos', async () => {
    const expected = 'https://www.pornhubpremium.com/pornstar/britney-amber/videos?premium=1';
    nock('https://www.pornhubpremium.com')
      .get('/pornstar/britney-amber')
      .reply(200, fixtures.getFixture('validModelResult.html'));

    const model = await ph.model('https://www.pornhubpremium.com/pornstar/britney-amber');
    const url = model.getMorePremiumVideosUrl();

    assert.equal(expected, url);
  });
});
