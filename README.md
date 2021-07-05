# Pornhub Premium API (Alpha)
[![NotASmurf](https://circleci.com/gh/notasmurf/pornhubpremium-api.svg?style=svg)](https://github.com/notasmurf/pornhubpremium-api) [![Coverage Status](https://coveralls.io/repos/github/notasmurf/pornhubpremium-api/badge.svg?branch=main)](https://coveralls.io/github/notasmurf/pornhubpremium-api?branch=main)

Listen here you mankey lovin' _gits_ as this poop nugget of a Application Phappable Interface is the best you are going to get for scraping PornHub Premium (at least in a worthwhile language). So pay attention.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
    - [Authentication](#authentication) - Logging in.
    - [Videos](#videos) - Searching the videos page.
    - [Video](#video) - Visiting a particular video.
    - [Search](#search) - Performing video/model search.
- [Coming Soon](#coming-soon)
- [FAQs](#faqs)
    
<!-- tocstop -->
## Installation
```bash
npm i @notasmurf/pornhubpremium-api
```

## Usage

### Authentication
You'll first need to log in. For now, just physically log in and grab the cookie returned in the `/autenticate` call. It's along lasting token anyway. I am working to figure out regular auth.

Example
```js
const ph = require('@notasmurf/pornhubpremium-api');

await ph.authenticate({
    cookie: 'some-cookie',
});
```

### Videos
So you want to get all the links on the main videos page so you can add them to your spank bank. I got your back. But just your back.
```js
const pageVideos = await ph.videos({
    video: {
        premiumOnly: 1,
        downloadOnly: 1,
    },
    categories: ['Red Head', 'Verified Amateurs'],
});

console.log(videos.getVideos());
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


### Video
Now that you got your dirty list of naughtiables, let's get some download links going. Ol' `@notasmurf` has GOT you bro.
```js
const videos = await ph.videos({
    video: {
        premiumOnly: 1,
        downloadOnly: 1,
    },
    categories: ['Red Head', 'Verified Amateurs'],
});

const vids = videos.getVideos({ page: 1 }); // Options not required. Defaults to 1.

const video = await ph.video(vids[0].url);

// Get all downloadable video links (if present).
console.log(video.getDownloads());
/** Prints
[
 {
    definition: 'HD 1080p',
    url: 'https://ed.phprcdn.com/videos/202106/25/390180751/1080P_4000K_390180751.mp4?validfrom=1625441105&validto=1625448305&rate=50000k&burst=50000k&ip=71.241.248.52&ipa=71.241.248.52&hash=Z5O1%2B%2FQdGD4cvb5Ll3PByRg04bc%3D'
  }
]
 */

// Print the models associated with the video.
console.log(video.getModels());
/** Prints
[
 {
    name: 'Bethany Benz',
    url: 'https://www.pornhubpremium.com/pornstar/bethany-benz'
  }
]
 */
```


### Search
Okay, so now for the good stuff. You can search one of two ways currently. See below for the details.

**For Models:**
```js
const models = await ph.search('Abby', 'pornstars', { page: 1 }); // Options not required. Defaults to 1.

console.log(models.getModels());

/** Prints
[
 { rank: '8041', name: 'Abby Lane', videos: '12 Videos' },
 { rank: '9762', name: 'Abby Lexus', videos: '4 Videos' },
 { rank: '15018', name: "Abby O'Toole", videos: '3 Videos' },
 { rank: '14856', name: 'Abbie Jordyn', videos: '3 Videos' },
 { rank: '1697', name: 'Abby Cross', videos: '130 Videos' }
]
 */



```

## COMING SOON
* More search features
* Model page
* Favorites page

## FAQs:
**1) Is this thing stable currently?**

Fuck no. I wrote this whole thing in less than 5 hours.

**2) Will this thing eventually be production ready?**

Why...why the hell would you need that...

**3) How do I contribute?**

Make a PR and hope I get around to it. 

Please write some tests.

**4) This is PornHub. Can we hire you?**

Tell you what. If you have the balls to make a meaningful PR to this repo, I will fucking apply.
