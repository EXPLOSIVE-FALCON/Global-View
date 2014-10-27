<!-- Use http://www.tablesgenerator.com/markdown_tables to build tables  -->
# Client API 

## Google

```sh
GET /api/googlenews
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
GET /api/googlenews?query=ebola&location=MN&amount=2
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

## Twitter

```sh
GET /search/tweets.json
```

#### Query Parameters

| Name  | Type   | Description                          |
|-------|--------|--------------------------------------|
| query | String | (Required) Search Query 500 char max |

#### Response

Status-Code: 200 OK

```sh
GET /search/tweets.json?q=someTopic&count=1
```

```json
{
  status:200,
  result: 'Request Received!',
  data: [
    [
      {
        "metadata": {
          "iso_language_code":"es",
          "result_type":"recent"
        },
        "created_at":"Mon Oct 27 21:59:28 +0000 2014",
        "id":526855725210165250,
        "id_str":"526855725210165248",
        "text":"@NoraElgort pues que dijo que iba a responder preguntas que la mandaramos #asklauren y solo respondió a 2 porque dijo que tenía problemas+",
        "source":"<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
        "truncated":false,
        "in_reply_to_status_id":526854848315392000,
        "in_reply_to_status_id_str":"526854848315392001",
        "in_reply_to_user_id":1045005631,
        "in_reply_to_user_id_str":"1045005631",
        "in_reply_to_screen_name":"NoraElgort",
        "user":{
          "id":702923482,
          "id_str":"702923482",
          "name":"sledgehammer",
          "screen_name":"ddljaureguix",
          "location":"",
          "profile_location":null,
          "description":"i don't need friends or boyfriends, i need lauren jauregui",
          "url":null,
          "entities": {
            "description": {
              "urls":[]
            }
          },
          "protected":false,
          "followers_count":2024,
          "friends_count":2211,
          "listed_count":10,
          "created_at":"Sun Oct 06 13:24:51 +0000 2013",
          "favourites_count":2614,
          "utc_offset":7200,
          "time_zone":"Athens",
          "geo_enabled":true,
          "verified":false,
          "statuses_count":20431,
          "lang":"es",
          "contributors_enabled":false,
          "is_translator":false,
          "is_translation_enabled":false,
          "profile_background_color":"FAFDFF",
          "profile_background_image_url":"http://pbs.twimg.com/profile_background_images/378800000179487249/7bHVepj2.png",
          "profile_background_image_url_https":"https://pbs.twimg.com/profile_background_images/378800000179487249/7bHVepj2.png",
          "profile_background_tile":false,
          "profile_image_url":"http://pbs.twimg.com/profile_images/523580317777821697/fA5pKKII_normal.jpeg",
          "profile_image_url_https":"https://pbs.twimg.com/profile_images/523580317777821697/fA5pKKII_normal.jpeg",
          "profile_banner_url":"https://pbs.twimg.com/profile_banners/702923482/1413666232",
          "profile_link_color":"0A030A","profile_sidebar_border_color":"FFFFFF",
          "profile_sidebar_fill_color":"DDEEF6",
          "profile_text_color":"333333",
          "profile_use_background_image":true,
          "default_profile":false,
          "default_profile_image":false,
          "following":false,
          "follow_request_sent":false,
          "notifications":false
        },
        "geo":null,
        "coordinates":null,
        "place":null,
        "contributors":null,
        "retweet_count":0,
        "favorite_count":0,
        "entities": {
          "hashtags":[
            {
              "text":"asklauren",
              "indices":[74,84]
            }
          ],
          "symbols":[],
          "urls":[],
          "user_mentions":[
            {
              "screen_name":"NoraElgort",
              "name":"gublernation",
              "id":1045005631,
              "id_str":"1045005631",
              "indices":[0,11]
            }
          ]
        },
        "favorited":false,
        "retweeted":false,
        "lang":"es"
      }
    ]
  ]
}
```

## Instagram

```sh
GET /api/instagram
```

#### Query Parameters

| Name           | Type   | Description                                                                  |
|----------------|--------|------------------------------------------------------------------------------|
| lat            | Number | Latitude for Location *                                                      |
| lng            | Number | Longitude for Location *                                                     |
| min_timestamp  | Number | Unix Timestamp for beginning of requested Date/Time range *                  |
| max_timestamp  | Number | Unix Timestamp for ending of requested Date/Time range *                     |
| distance       | Number | Distance (in meters) from center of lat, lng inputs (default = 1000) *       |
| query          | String | Search Term for Instagram                                                    |
| amount         | Number | Number of Results                                                            |
| * = required                                                                                           |


#### Response

Status-Code: 200 OK

```sh
GET /api/instagram?lat=34&lng=-118&min_timestamp=1413747713000&max_timestamp=1413834152000&distance=1000
```

```
{
  "meta": { "code": 200 },
  "data": [
    {
      "link": < Link to profile page for image >,
      "created_time": < UNIX date >,
      "type": <"image" or "video">,
      "location": {
        "latitude": <Latitude Number of Photo>,
        "name": <Location Name (if any)>, 
        "longitude": <Longitude Number of Photo>,
        "id": <Location (if any)>
        },
      "images": {
        "low_resolution": {
          "url": <url of photo>,
          "width": 306,
          "height": 306
        },
        "thumbnail": {
          "url": <url of photo>,
          "width": 150,
          "height": 150
        },
        "standard_resolution": {
          "url": <url of photo>,
          "width": 640,
          "height": 640
        }
      },
      likes: {
        "count": <Number of likes>
        },
      "caption":  {
        "text": "Caption text (if any) of photo",
      }, 
      "tags": ["hashtag1", "hashtag2", "hashtagN"],
      "id": <user id of photo creator> 
    },
    {
      "link": < Link to profile page for image >,
      "created_time": < UNIX date >,
      "type": <"image" or "video">,
      "location": {
        "latitude": <Latitude Number of Photo>,
        "name": <Location Name (if any)>, 
        "longitude": <Longitude Number of Photo>,
        "id": <Location (if any)>
        },
      "images": {
        "low_resolution": {
          "url": <url of photo>,
          "width": 306,
          "height": 306
        },
        "thumbnail": {
          "url": <url of photo>,
          "width": 150,
          "height": 150
        },
        "standard_resolution": {
          "url": <url of photo>,
          "width": 640,
          "height": 640
        }
      },
      likes: {
        "count": <Number of likes>
        },
      "caption":  {
        "text": "Caption text (if any) of photo",
      }, 
      "tags": ["hashtag1", "hashtag2", "hashtagN"],
      "id": <user id of photo creator> 
    }
  ]
}
```

# Server API

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

### queryInstagram(lat, lng, minDate, maxDate, distance, callback)

Returns Photos from Instagram

```js
var queryInstagram = require('/apis/instagram');

queryInstagram(34, -118, 1413747713000, 1413834152000, 1000, function(err, photos) {

  // function returns an array of objects, each containing:
    //  "created_time" {number}: the time the photo was uploaded to Instagram
    //  "location" {object}: the latitude and longitude of where the photo was taken (also may contain a place ID and place name)
    //  "type" {string}: media type (image or video)
    //  "link" {string}: link to the dedicated Instagram page for this photo
    //  "images" {object}: URLs to images of different sizes (low-res, thumbnails, standard-res)
    //  "likes" {object}: count of likes for photo
    //  "caption" {object}: caption of photo
    //  "tags" {array}: hashtags attached to photo
    //  "user" {object}: user id associated with photo
    //  "distance" {number}: distance between lat/lng input by user and lat/lng of photo
   
});
```
