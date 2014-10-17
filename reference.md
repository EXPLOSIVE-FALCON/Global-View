# Reference

## Client API 

### Google

```sh
GET /api/google
```

#### Query Parameters

| Name     | Type   | Description                           |
|----------|--------|---------------------------------------|
| Query    | String | Search Term for news.google.com       |
| Location | String | Filter by location on news.google.com |
| Amount   | Number | Amount of search results to return    |

#### Response

Status-Code: 200 OK

```sh
GET /api/google?query=ebola&location=tx&amount=2
```

```json
{
  "result" : "Request Received!",
  "data" : [
    {
      "title" : "Osterholm: Ebola focus should be on West Africa, not Dallas",
      "link" : "http://www.mprnews.org/story/2014/10/16/osterholm-ebola",
      "source" : "Minnesota Public Radio News‎",
      "description" : "Liberian Army soldiers work on the first of 17 new Ebola treatment center on Wednesday in Tubmanburg, Liberia. John Moore / Getty Images ...",
      "time" : "16 minutes ago"
    },
    { 
      "title" : "As Ebola surprises, Minnesota public health experts step up ...",
      "link" : "http://www.twincities.com/localnews/ci_26734512/twin-cities-public-health-professionals-prep-ebola",
      "source" : "TwinCities.com-Pioneer Press‎",
      "description" : "This undated file image made available by the Centers for Disease Control (CDC) shows the Ebola virus. (AP Photo/Centers for Disease ...",
      "time" : "8 hours ago"
    }
  ]
}
```

### Twitter

```sh
GET /api/twitter
```

#### Query Parameters

| Name  | Type | Description |
|-------|------|-------------|
| Param | null | Parameter   |
| Param | null | Parameter   |
| Param | null | Parameter   |

#### Response

Status-Code: 200 OK

```sh
GET /api/google?query=ebola&location=tx&amount=5
```

```json
{
  "result" : "Request Received!",
  "data" : [
    {
      
    }
  ]
}
```

### Instagram

```sh
GET /api/instagram
```

#### Query Parameters

| Name  | Type | Description |
|-------|------|-------------|
| Param | null | Parameter   |
| Param | null | Parameter   |
| Param | null | Parameter   |

#### Response

Status-Code: 200 OK

```sh
GET /api/google?query=ebola&location=tx&amount=5
```

```json
{
  "result" : "Request Received!",
  "data" : [
    {
    
    }
  ]
}
```

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
