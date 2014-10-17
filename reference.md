# Reference

## Server API

### queryGoogle(query, queryAmount, callback)

Returns news story results from google news
```js
var queryGoogle = require('/apis/google');

queryGoogle('ebola', 5, function(err, results) {
  results.forEach(function(story, index) {
    // story returns an object with title, link, source
    // description, and time 
  });
});
```

### queryTwitter(query, queryAmount, callback)

Returns Tweets from Twitter

```js
var queryTwitter = require('/apis/twitter');

queryTwitter('ebola', 5, function(err, results) {
  results.forEach(function(story, index) {
    // 
    //
  });
});
```

### queryInstagram(query, queryAmount, callback)

Returns Pictures from Instagram

```js
var queryInstagram = require('/apis/instagram');

queryInstagram('ebola', 5, function(err, results) {
  results.forEach(function(story, index) {
    //
    //
  });
});
```
