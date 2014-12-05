if (process.env.ENVIRONMENT === 'PROD' || process.env.ENVIRONMENT === 'CI') {
  var flickrKeys = {
    api_key: process.env.flickrApiKey,
    secret: process.env.flickrSecret
  };
  var instaKeys = { 
    instaClientID: process.env.instaClientID,
    instaClientKey: process.env.instaClientKey,
    instaToken: process.env.instaToken
  };
  var twitterKeys = {
    consumerKey : process.env.twitterConsumerKey,
    consumerSecret: process.env.twitterConsumerSecret,
    accessToken: process.env.twitterAccessToken,
    accessTokenSecret: process.env.twitterAccessTokenSecret
  };
} else {
  var flickrKeys = {
    api_key: '2960fd012df4bcc92af9841f04a913a4',
    secret: '96f64d0311c2e63c'
  };
  var instaKeys = {
    instaClientID: 'c46551123e2f42ef95d857356a7ff0b6',
    instaClientKey: 'cb6edb6450e4400b9984f09877824330',
    instaToken: '9690147.c465511.0f3d646533c4421882f13a908b5ff3d9'
  };
  var twitterKeys = {
    consumerKey: 'vZHMlJpiX1eGQBji8W4BjrjDM',
    consumerSecret: 'p13kuB2cKFSnWKLfxJStczU2NNqhkBRibcQVc1Fnf7tFZPTINX',
    accessToken: '20121734-GzoW2eeadl18CsMg10qJ734DuJECsnvnJETaFUPcc',
    accessTokenSecret: 'jcfF4GY56Fe3B6AX4uIHzGagbcKTDZeNsOOuHHVv3eH6y'
  };
}

module.exports = {
  flickr: flickrKeys,
  twitter: twitterKeys,
  instagram: instaKeys
};