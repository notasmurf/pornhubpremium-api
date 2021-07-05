# Pornhub Premium API (Alpha)
Listen here you mankey lovin' _gits_ as this poop nugget of a Application Phappable Interface is the best you are going to get for scraping PornHub Premium (at least in a worthwhile language). So pay attention.

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

const videos = videos.getVideos();

console.log(videos);
```

Gives you...
```js
[
  {
    title: 'Mofos - Scott Nails Teaches His Step Daughter Angelica Cruz How To Bend Over For Ass Fucking',
    url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph60d5d5a7a55fb',
    duration: '34:14',
    username: 'Lets Try Anal'
  },
  {
    title: 'BANGBROS - Jada Stevens Fucks Lucky Miami Residents On The Reverse Bang Bus',
    url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph60ba5b533d50d',
    duration: '44:59',
    username: 'Bang Bus'
  },
  {
    title: '1111Customs 4k - Ginger goddess Dani Jensen bounces on a huge dong',
    url: 'https://www.pornhubpremium.com/view_video.php?viewkey=ph5ea1c3116fe93',
    duration: '14:12',
    username: '1111 Customs'
  }
]
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

const vids = videos.getVideos();

const video = await ph.video(vids[0].url);
const downloads = video.getDownloads();

console.log(downloads);
```

Results in
```js
[
  {
    definition: 'HD 1080p',
    url: 'https://ed.phprcdn.com/videos/202106/25/390180751/1080P_4000K_390180751.mp4?validfrom=1625441105&validto=1625448305&rate=50000k&burst=50000k&ip=71.241.248.52&ipa=71.241.248.52&hash=Z5O1%2B%2FQdGD4cvb5Ll3PByRg04bc%3D'
  },
  {
    definition: 'HD 720p',
    url: 'https://ed.phprcdn.com/videos/202106/25/390180751/720P_4000K_390180751.mp4?validfrom=1625441105&validto=1625448305&rate=50000k&burst=50000k&ip=71.241.248.52&ipa=71.241.248.52&hash=jgI0ebrQHjSuVdr96ws5aFxeYVo%3D'
  },
  {
    definition: '480p',
    url: 'https://ed.phprcdn.com/videos/202106/25/390180751/480P_2000K_390180751.mp4?validfrom=1625441105&validto=1625448305&rate=50000k&burst=50000k&ip=71.241.248.52&ipa=71.241.248.52&hash=SMM3cquIsMuoeldvpYp0D%2F6fuAA%3D'
  },
  {
    definition: '240p',
    url: 'https://ed.phprcdn.com/videos/202106/25/390180751/240P_1000K_390180751.mp4?validfrom=1625441105&validto=1625448305&rate=50000k&burst=50000k&ip=71.241.248.52&ipa=71.241.248.52&hash=3%2B3Ruyo%2F8kEZJRYcaSsUvg2qfhc%3D'
  }
]
```

### COMING SOON
* Search page
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

**4) What do you do IRL?**

I'm a manager at a FAANG company. Yeah....

**5) This is PornHub. Can we hire you?**

Tell you what. If you have the balls to make a meaningful PR to this repo, I will fucking apply.
