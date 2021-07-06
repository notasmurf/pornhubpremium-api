# Pornhub Premium API (Alpha)
[![NotASmurf](https://circleci.com/gh/notasmurf/pornhubpremium-api.svg?style=svg)](https://github.com/notasmurf/pornhubpremium-api) [![Coverage Status](https://coveralls.io/repos/github/notasmurf/pornhubpremium-api/badge.svg?branch=main)](https://coveralls.io/github/notasmurf/pornhubpremium-api?branch=main)

Listen here you mankey lovin' _gits_ as this poop nugget of an Application Phappable Interface is the best you are going to get for scraping PornHub Premium (at least in a worthwhile language). So pay attention.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
    - [Authentication](#authentication) - Logging in.
    - [Videos](#videos) - Searching the videos page.
    - [Video](#video) - Visiting a particular video.
    - [Search](#search) - Performing video/model search.
    - [Model](#model) - For searching specific models.
    - [Model Videos](#model-videos) - View collection of model's videos.
- [Coming Soon](#coming-soon)
- [FAQs](#faqs)
    
<!-- tocstop -->
## Installation
```bash
npm i @notasmurf/pornhubpremium-api
```

## Usage

### Authentication
You'll first need to log in. For now, just physically log in and grab the cookie returned in the one of the subsequent page load calls. It's a long lasting token anyway. I am working to figure out regular auth.

Example
```js
const ph = require('@notasmurf/pornhubpremium-api');

await ph.authenticate({
    cookie: 'some-cookie',
});
```

### Videos
I bet you want to get all the links on the main videos page so you can add them to your spank bank. I got your back, bea. But just your back.
```js
const pageVideos = await ph.videos({
  video: {
    premiumOnly: 1,
    downloadOnly: 1,
  },
  duration: {
    min: 0,
    max: 30,
  },
  raking: 'mostViewed',
  range: 'weekly',
  quality: '4k',
  categories: ['Red Head', 'Verified Amateurs'],
  page: 1,
});

console.log(videos.hasResults()); // Returns true if query returned results.
console.log(videos.getVideos()); // Returns ALL videos on page.
/** Print
[
 {
    title: 'Mofos - Scott Nails Teaches His Step Daughter Angelica Cruz How To Bend Over For Ass Fucking',
    url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph60d5d5a7a55fb',
    duration: '34:14',
    username: 'Lets Try Anal'
  }
]
 */

// Handy function for returning all the spank bank categories on the sidebar menu.
conole.log(videos.getCategories());
/**
[
 {
    url: 'https://www.pornhubpremium.com/categories/babe',
    name: 'Babe'
  }
]
 */
```

<details>
  <summary><b>Here are the supported arguments for the `.videos` function.</b> (click to expand)</summary>

| argument | type | description | default | options | 
| :--- | :--- | :--- | :--- | :--- |
| `video` | object | enables premium or download only options | both false by default | `premiumOnly` and `downloadOnly`, passed as 0 or 1 |
| `duration` | object | sets the specified min and max duration option | widest range by default | `min_duration` and `max_duration` as ints in units of 10 |
| `quality` | string | sets the min resolution | widest range by default | `4k`, `1440p`, `1080p`, `all`
| `category` | array | sets the categories for which to search | all categories | all categories on pornhub in camel case |
| `production` | string | sets the production type of the search results | both types | `homemade`, `professional` |
| `ranking` | string | sets the ranking of the search results | defaults to featured videos | `mostViewed`,  `topRated`, `hottest`, `longest`, `newest` |
| `range` | string | sets the upload time range for the video result (for `mostViewed` and `topRated` only) | defaults to `weekly` | `daily`, `weekly`, `monthly`, `yearly`, `allTime` | 
| `page` | number | sets the pagination number | defaults to first page | any whole numbers >= 1 |
</details>


### Video
Now that you got your dirty list of naughtiables, let's get some download links going. Ol' `@notasmurf` has GOT you covered.
```js
const video = await ph.video('https://www.pornhubpremium.com/view_video.php?viewkey=ph60b9e26695e28');

// Get all downloadable video links (if present).
console.log(video.getDownloads());
/** Example
[
 {
    definition: 'HD 1080p',
    url: 'https://ed.phprcdn.com/videos/202106/25/390180751/1080P_4000K_390180751.mp4?validfrom=1625441105&validto=1625448305&rate=50000k&burst=50000k&ip=71.241.248.52&ipa=71.241.248.52&hash=Z5O1%2B%2FQdGD4cvb5Ll3PByRg04bc%3D'
  }
]
 */

// Print the models associated with the video.
console.log(video.getModels());
/** Example
[
 {
    name: 'Bethany Benz',
    url: 'https://www.pornhubpremium.com/pornstar/bethany-benz'
  }
]
 */
```


### Search
Okay, so now for the good stuff. You can do some plaintext searches as well, for both models and videos. See below for the details.

#### For Models:
```js
const models = await ph.search('Abby', 'pornstars', { page: 1 }); // Options not required. Defaults to 1.

console.log(models.getModels());

/** Example
[
 { rank: '8041', name: 'Abby Lane', videos: '12 Videos' },
 { rank: '9762', name: 'Abby Lexus', videos: '4 Videos' },
 { rank: '15018', name: "Abby O'Toole", videos: '3 Videos' },
 { rank: '14856', name: 'Abbie Jordyn', videos: '3 Videos' },
 { rank: '1697', name: 'Abby Cross', videos: '130 Videos' }
]
 */
```

#### For Videos:
```js
const models = await ph.search('Redhead', 'video', { page: 1 }); // Options not required. Defaults to 1.

console.log(models.getModels());

/** Example
[
 {
    title: 'HOT REDHEAD STEPDAUGHTER LACY LENNON SQUIRTS OUT MY ACCIDENTAL CREAMPIE',
    url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph5c0c89e719f50',
    duration: '44:26',
    username: 'Spank Monster'
  }
]
 */
```


### Model
So now that you've just used my tool for the sole purpose of scraping PornHub for asian pornstars with big tits, let's use this tool to scrape your oriental honey's personal page.

```js
const model = await ph.model('https://www.pornhubpremium.com/pornstar/britney-amber');
const details = model.getDetailedInfo();

console.log(details);
/** Example:
 {
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
}
 */

const videos = model.getVideos(); // ONLY shows videos on the immediate page.
/** Example
[
 {
    title: 'Big Booty Teen Slut Abby Gets Fucked By Her Perverted Stepdad',
    url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph5dc77449561a1',
    duration: '24:35',
    username: 'Exposed Whores'
  }
]
 */
```

### Model Videos
Not enough videos for you on your model's personal page? Christ, man. You're a fucking addict. But I got you covered, baby bird. Here's all you need.

```js
const model = await ph.model('https://www.pornhubpremium.com/pornstar/britney-amber');

// Use the following to get a complete list of 
const moreVideosUrl = model.getMoreVideosUrl();
console.log(moreVideosUrl);
// Example: https://www.pornhubpremium.com/pornstar/britney-amber/videos

const morePremiumVideosUrl = model.getMorePremiumVideosUrl();
console.log(morePremiumVideosUrl);
// Example: https://www.pornhubpremium.com/pornstar/britney-amber/videos?premium=1

const modelVideos = await ph.modelVieos(morePremiumVideosUrl, { page: 1 }); // Options not required. Defaults to 1.
console.log(modelVideos);
/** Example:
[
 {
    title: 'MileHigh - Two Horny Lesbians Britney Amber And Ivy Lebelle Love Anal Play',
    url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph5eaac125892e4',
    duration: '29:27',
    username: 'Sweetheart Video'
  }
]
 */
```

## COMING SOON
* More search features
* Favorites page
* A better readme
* If you want more, make a request on the Issues page.

## FAQs:
**1) When will this package be ready?**

I'll move it out of alpha once I have finished enough of the core features. I don't expect to make any major breaking changes though, although there will of course be bugs, so go ahead and give it a whirl.

**2) Will this thing be production ready after alpha?**

Why...why the hell would you need that...

**3) How do I contribute?**

Make a PR. Why is this always a FAQ question? Git has one purpose. 

**4) This is PornHub. Can we hire you?**

Tell you what. If you have the balls to make a meaningful PR to this repo, I will abso-fucking-lutely apply.
