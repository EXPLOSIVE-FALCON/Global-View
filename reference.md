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

| Name      | Type   | Description                                                                           |
|-----------|--------|---------------------------------------------------------------------------------------|
| query     | String | (Required) Search Query 500 char max                                                  |
| latitude  | Number | (Optional) Latitude of location.                                                      |
| longitude | Number | (Optional) Longitude of location.                                                     |
| radius    | String | (Optional) radius used to complete geocode search for tweets. Example "1mi" or "1km". |
| date      | Date   | (Optional) Format of Date YYYY-MM-DD                                                  |
|           |        |                                                                                       |
|           |        |                                                                                       |                                                                          |


#### Response

Status-Code: 200 OK

```sh
GET /search/tweets.json?q=digitalDivide&count=5
```

```json
{
  "statuses": [
    {
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "created_at": "Mon Oct 20 04:33:34 +0000 2014",
      "id": 524055802009509900,
      "id_str": "524055802009509888",
      "text": "RT @TaiTechTrust: @lailaharre Some info on the #DigitalDivide for Tairāwhiti: http://t.co/qtZjftqzjn Hoping  #GigatownGis UFB helps close t…",
      "source": "<a href=\"http://twitter.com/#!/download/ipad\" rel=\"nofollow\">Twitter for iPad</a>",
      "truncated": false,
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 311632838,
        "id_str": "311632838",
        "name": "Franklin S Werren",
        "screen_name": "fswerren",
        "location": "Sherman NY, Ham N2JYG",
        "profile_location": null,
        "description": "This is my personal feed. Yes, I am a bit of a liberal rebel, but do have some conservitive views. http://t.co/5GTEyC8YB0 http://t.co/rZKm4ZgHO0",
        "url": "http://t.co/p7X2YidUGn",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "http://t.co/p7X2YidUGn",
                "expanded_url": "http://www.chautauqualake.net",
                "display_url": "chautauqualake.net",
                "indices": [
                  0,
                  22
                ]
              }
            ]
          },
          "description": {
            "urls": [
              {
                "url": "http://t.co/5GTEyC8YB0",
                "expanded_url": "http://www.werren.net",
                "display_url": "werren.net",
                "indices": [
                  99,
                  121
                ]
              },
              {
                "url": "http://t.co/rZKm4ZgHO0",
                "expanded_url": "http://computerlog.chautauqualake.net",
                "display_url": "computerlog.chautauqualake.net",
                "indices": [
                  122,
                  144
                ]
              }
            ]
          }
        },
        "protected": false,
        "followers_count": 198,
        "friends_count": 751,
        "listed_count": 3,
        "created_at": "Sun Jun 05 19:45:58 +0000 2011",
        "favourites_count": 16870,
        "utc_offset": -14400,
        "time_zone": "Eastern Time (US & Canada)",
        "geo_enabled": true,
        "verified": false,
        "statuses_count": 18703,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "C0DEED",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/264727382/background2.gif",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/264727382/background2.gif",
        "profile_background_tile": true,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1383229367/frank4b_normal.JPG",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1383229367/frank4b_normal.JPG",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/311632838/1348276581",
        "profile_link_color": "0084B4",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "default_profile": false,
        "default_profile_image": false,
        "following": null,
        "follow_request_sent": null,
        "notifications": null
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweeted_status": {
        "metadata": {
          "iso_language_code": "en",
          "result_type": "recent"
        },
        "created_at": "Sun Oct 19 07:40:22 +0000 2014",
        "id": 523740422451904500,
        "id_str": "523740422451904514",
        "text": "@lailaharre Some info on the #DigitalDivide for Tairāwhiti: http://t.co/qtZjftqzjn Hoping  #GigatownGis UFB helps close the growing chasm.",
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "truncated": false,
        "in_reply_to_status_id": 523526256084541440,
        "in_reply_to_status_id_str": "523526256084541440",
        "in_reply_to_user_id": 1277147870,
        "in_reply_to_user_id_str": "1277147870",
        "in_reply_to_screen_name": "lailaharre",
        "user": {
          "id": 2836134836,
          "id_str": "2836134836",
          "name": "TaiTech Trust",
          "screen_name": "TaiTechTrust",
          "location": "Gisborne, NZ",
          "profile_location": null,
          "description": "Tairāwhiti Technology Trust - closing the Digital Divide across Tairāwhiti",
          "url": "http://t.co/P8Q8bmJTkv",
          "entities": {
            "url": {
              "urls": [
                {
                  "url": "http://t.co/P8Q8bmJTkv",
                  "expanded_url": "http://taitech.co.nz",
                  "display_url": "taitech.co.nz",
                  "indices": [
                    0,
                    22
                  ]
                }
              ]
            },
            "description": {
              "urls": []
            }
          },
          "protected": false,
          "followers_count": 169,
          "friends_count": 526,
          "listed_count": 0,
          "created_at": "Wed Oct 01 04:25:11 +0000 2014",
          "favourites_count": 105,
          "utc_offset": null,
          "time_zone": null,
          "geo_enabled": false,
          "verified": false,
          "statuses_count": 1563,
          "lang": "en",
          "contributors_enabled": false,
          "is_translator": false,
          "is_translation_enabled": false,
          "profile_background_color": "022330",
          "profile_background_image_url": "http://abs.twimg.com/images/themes/theme15/bg.png",
          "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme15/bg.png",
          "profile_background_tile": false,
          "profile_image_url": "http://pbs.twimg.com/profile_images/523753172519514113/2hxhJXcl_normal.jpeg",
          "profile_image_url_https": "https://pbs.twimg.com/profile_images/523753172519514113/2hxhJXcl_normal.jpeg",
          "profile_banner_url": "https://pbs.twimg.com/profile_banners/2836134836/1412138691",
          "profile_link_color": "0084B4",
          "profile_sidebar_border_color": "A8C7F7",
          "profile_sidebar_fill_color": "C0DFEC",
          "profile_text_color": "333333",
          "profile_use_background_image": true,
          "default_profile": false,
          "default_profile_image": false,
          "following": null,
          "follow_request_sent": null,
          "notifications": null
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "retweet_count": 5,
        "favorite_count": 1,
        "entities": {
          "hashtags": [
            {
              "text": "DigitalDivide",
              "indices": [
                29,
                43
              ]
            },
            {
              "text": "GigatownGis",
              "indices": [
                91,
                103
              ]
            }
          ],
          "symbols": [],
          "urls": [
            {
              "url": "http://t.co/qtZjftqzjn",
              "expanded_url": "http://www.taitech.co.nz/myfiles/Tairawhiti_Digital_Divide_.pdf",
              "display_url": "taitech.co.nz/myfiles/Tairaw…",
              "indices": [
                60,
                82
              ]
            }
          ],
          "user_mentions": [
            {
              "screen_name": "lailaharre",
              "name": "Laila Harré ",
              "id": 1277147870,
              "id_str": "1277147870",
              "indices": [
                0,
                11
              ]
            }
          ]
        },
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "lang": "en"
      },
      "retweet_count": 5,
      "favorite_count": 0,
      "entities": {
        "hashtags": [
          {
            "text": "DigitalDivide",
            "indices": [
              47,
              61
            ]
          },
          {
            "text": "GigatownGis",
            "indices": [
              109,
              121
            ]
          }
        ],
        "symbols": [],
        "urls": [
          {
            "url": "http://t.co/qtZjftqzjn",
            "expanded_url": "http://www.taitech.co.nz/myfiles/Tairawhiti_Digital_Divide_.pdf",
            "display_url": "taitech.co.nz/myfiles/Tairaw…",
            "indices": [
              78,
              100
            ]
          }
        ],
        "user_mentions": [
          {
            "screen_name": "TaiTechTrust",
            "name": "TaiTech Trust",
            "id": 2836134836,
            "id_str": "2836134836",
            "indices": [
              3,
              16
            ]
          },
          {
            "screen_name": "lailaharre",
            "name": "Laila Harré ",
            "id": 1277147870,
            "id_str": "1277147870",
            "indices": [
              18,
              29
            ]
          }
        ]
      },
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    },
    {
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "created_at": "Mon Oct 20 02:10:35 +0000 2014",
      "id": 524019820472193000,
      "id_str": "524019820472193024",
      "text": "Latest #thesis - Universalising #electronicgovernment services: facing the #digitaldivide challenge http://t.co/ohBkxNECfB",
      "source": "<a href=\"https://dev.twitter.com/docs/tfw\" rel=\"nofollow\">Twitter for Websites</a>",
      "truncated": false,
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 1345801844,
        "id_str": "1345801844",
        "name": "Scholarly Commons",
        "screen_name": "AUT_SC",
        "location": "New Zealand",
        "profile_location": null,
        "description": "The official Twitter for Scholarly Commons, the open access institutional repository for Auckland University of Technology.",
        "url": "http://t.co/uEgvml0HdO",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "http://t.co/uEgvml0HdO",
                "expanded_url": "http://aut.researchgateway.ac.nz/",
                "display_url": "aut.researchgateway.ac.nz",
                "indices": [
                  0,
                  22
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 73,
        "friends_count": 72,
        "listed_count": 1,
        "created_at": "Fri Apr 12 02:34:50 +0000 2013",
        "favourites_count": 7,
        "utc_offset": 46800,
        "time_zone": "Wellington",
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 525,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "0099B9",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/484822346536988672/3g55O8jU.jpeg",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/484822346536988672/3g55O8jU.jpeg",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/488534511492165633/fvR-5rRL_normal.jpeg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/488534511492165633/fvR-5rRL_normal.jpeg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/1345801844/1413768466",
        "profile_link_color": "0099B9",
        "profile_sidebar_border_color": "FFFFFF",
        "profile_sidebar_fill_color": "F6F6F6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "default_profile": false,
        "default_profile_image": false,
        "following": null,
        "follow_request_sent": null,
        "notifications": null
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweet_count": 0,
      "favorite_count": 0,
      "entities": {
        "hashtags": [
          {
            "text": "thesis",
            "indices": [
              7,
              14
            ]
          },
          {
            "text": "electronicgovernment",
            "indices": [
              32,
              53
            ]
          },
          {
            "text": "digitaldivide",
            "indices": [
              75,
              89
            ]
          }
        ],
        "symbols": [],
        "urls": [
          {
            "url": "http://t.co/ohBkxNECfB",
            "expanded_url": "http://aut.researchgateway.ac.nz/handle/10292/7771#.VERvBOoTK8I.twitter",
            "display_url": "aut.researchgateway.ac.nz/handle/10292/7…",
            "indices": [
              100,
              122
            ]
          }
        ],
        "user_mentions": []
      },
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    },
    {
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "created_at": "Mon Oct 20 01:04:24 +0000 2014",
      "id": 524003163855015940,
      "id_str": "524003163855015936",
      "text": "Tackling the #DigitalDivide: Low-Income Students Weigh In http://t.co/jRlX5Srgy6 http://t.co/TtHRmfICzI @connectingkc @KCDigitalDrive",
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "truncated": false,
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 38942827,
        "id_str": "38942827",
        "name": "Leslie Scott",
        "screen_name": "lscott1967",
        "location": "Kansas City, MO",
        "profile_location": null,
        "description": "Hopeless bleeding heart liberal trying desperately to be the change I wish to see while juggling an endless stream of foster dogs.",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 1056,
        "friends_count": 2001,
        "listed_count": 26,
        "created_at": "Sat May 09 22:35:29 +0000 2009",
        "favourites_count": 7571,
        "utc_offset": -18000,
        "time_zone": "Central Time (US & Canada)",
        "geo_enabled": true,
        "verified": false,
        "statuses_count": 20495,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "C0DEED",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/758085045/479b0300f6efcb8dc46cd9eb72a01ac4.jpeg",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/758085045/479b0300f6efcb8dc46cd9eb72a01ac4.jpeg",
        "profile_background_tile": true,
        "profile_image_url": "http://pbs.twimg.com/profile_images/491931253147308032/3mP3dpWD_normal.jpeg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/491931253147308032/3mP3dpWD_normal.jpeg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/38942827/1357601829",
        "profile_link_color": "0084B4",
        "profile_sidebar_border_color": "FFFFFF",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "default_profile": false,
        "default_profile_image": false,
        "following": null,
        "follow_request_sent": null,
        "notifications": null
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweet_count": 0,
      "favorite_count": 0,
      "entities": {
        "hashtags": [
          {
            "text": "DigitalDivide",
            "indices": [
              13,
              27
            ]
          }
        ],
        "symbols": [],
        "urls": [
          {
            "url": "http://t.co/jRlX5Srgy6",
            "expanded_url": "http://ow.ly/CX4K1",
            "display_url": "ow.ly/CX4K1",
            "indices": [
              58,
              80
            ]
          }
        ],
        "user_mentions": [
          {
            "screen_name": "connectingkc",
            "name": "Connecting for Good",
            "id": 597370430,
            "id_str": "597370430",
            "indices": [
              104,
              117
            ]
          },
          {
            "screen_name": "KCDigitalDrive",
            "name": "KCDigitalDrive",
            "id": 399559841,
            "id_str": "399559841",
            "indices": [
              118,
              133
            ]
          }
        ],
        "media": [
          {
            "id": 524002271739523100,
            "id_str": "524002271739523072",
            "indices": [
              81,
              103
            ],
            "media_url": "http://pbs.twimg.com/media/B0WhSjSIMAAmBnN.jpg",
            "media_url_https": "https://pbs.twimg.com/media/B0WhSjSIMAAmBnN.jpg",
            "url": "http://t.co/TtHRmfICzI",
            "display_url": "pic.twitter.com/TtHRmfICzI",
            "expanded_url": "http://twitter.com/MindShiftKQED/status/524002271911501824/photo/1",
            "type": "photo",
            "sizes": {
              "medium": {
                "w": 600,
                "h": 345,
                "resize": "fit"
              },
              "thumb": {
                "w": 150,
                "h": 150,
                "resize": "crop"
              },
              "large": {
                "w": 640,
                "h": 369,
                "resize": "fit"
              },
              "small": {
                "w": 340,
                "h": 196,
                "resize": "fit"
              }
            },
            "source_status_id": 524002271911501800,
            "source_status_id_str": "524002271911501824"
          }
        ]
      },
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    },
    {
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "created_at": "Sun Oct 19 22:43:57 +0000 2014",
      "id": 523967818039951360,
      "id_str": "523967818039951360",
      "text": "Reminder for those motivated to make positive change to read the #GigatownGis #DigitalDivide UFB primer here: http://t.co/qtZjftqzjn",
      "source": "<a href=\"https://about.twitter.com/products/tweetdeck\" rel=\"nofollow\">TweetDeck</a>",
      "truncated": false,
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 2836134836,
        "id_str": "2836134836",
        "name": "TaiTech Trust",
        "screen_name": "TaiTechTrust",
        "location": "Gisborne, NZ",
        "profile_location": null,
        "description": "Tairāwhiti Technology Trust - closing the Digital Divide across Tairāwhiti",
        "url": "http://t.co/P8Q8bmJTkv",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "http://t.co/P8Q8bmJTkv",
                "expanded_url": "http://taitech.co.nz",
                "display_url": "taitech.co.nz",
                "indices": [
                  0,
                  22
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 169,
        "friends_count": 526,
        "listed_count": 0,
        "created_at": "Wed Oct 01 04:25:11 +0000 2014",
        "favourites_count": 105,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 1563,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "022330",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme15/bg.png",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme15/bg.png",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/523753172519514113/2hxhJXcl_normal.jpeg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/523753172519514113/2hxhJXcl_normal.jpeg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/2836134836/1412138691",
        "profile_link_color": "0084B4",
        "profile_sidebar_border_color": "A8C7F7",
        "profile_sidebar_fill_color": "C0DFEC",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "default_profile": false,
        "default_profile_image": false,
        "following": null,
        "follow_request_sent": null,
        "notifications": null
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweet_count": 0,
      "favorite_count": 0,
      "entities": {
        "hashtags": [
          {
            "text": "GigatownGis",
            "indices": [
              65,
              77
            ]
          },
          {
            "text": "DigitalDivide",
            "indices": [
              78,
              92
            ]
          }
        ],
        "symbols": [],
        "urls": [
          {
            "url": "http://t.co/qtZjftqzjn",
            "expanded_url": "http://www.taitech.co.nz/myfiles/Tairawhiti_Digital_Divide_.pdf",
            "display_url": "taitech.co.nz/myfiles/Tairaw…",
            "indices": [
              110,
              132
            ]
          }
        ],
        "user_mentions": []
      },
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    },
    {
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "created_at": "Sun Oct 19 21:59:38 +0000 2014",
      "id": 523956667692511200,
      "id_str": "523956667692511232",
      "text": "RT @TaiTechTrust: @lailaharre Some info on the #DigitalDivide for Tairāwhiti: http://t.co/qtZjftqzjn Hoping  #GigatownGis UFB helps close t…",
      "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
      "truncated": false,
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 1277147870,
        "id_str": "1277147870",
        "name": "Laila Harré ",
        "screen_name": "lailaharre",
        "location": "",
        "profile_location": null,
        "description": "NZ's newest, most awesome political leader / Authorised by Anna Sutherland, 46-50 Bloomfield Terrace, Lower Hutt 5010",
        "url": "http://t.co/L3lNbcoaPb",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "http://t.co/L3lNbcoaPb",
                "expanded_url": "http://internet.org.nz",
                "display_url": "internet.org.nz",
                "indices": [
                  0,
                  22
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 6305,
        "friends_count": 1758,
        "listed_count": 77,
        "created_at": "Mon Mar 18 08:14:28 +0000 2013",
        "favourites_count": 1680,
        "utc_offset": 46800,
        "time_zone": "Auckland",
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 2013,
        "lang": "en-gb",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "9266CC",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme10/bg.gif",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme10/bg.gif",
        "profile_background_tile": true,
        "profile_image_url": "http://pbs.twimg.com/profile_images/471821190214848513/RzDH_OoG_normal.jpeg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/471821190214848513/RzDH_OoG_normal.jpeg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/1277147870/1401329707",
        "profile_link_color": "9266CC",
        "profile_sidebar_border_color": "FFFFFF",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": false,
        "default_profile": false,
        "default_profile_image": false,
        "following": null,
        "follow_request_sent": null,
        "notifications": null
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweeted_status": {
        "metadata": {
          "iso_language_code": "en",
          "result_type": "recent"
        },
        "created_at": "Sun Oct 19 07:40:22 +0000 2014",
        "id": 523740422451904500,
        "id_str": "523740422451904514",
        "text": "@lailaharre Some info on the #DigitalDivide for Tairāwhiti: http://t.co/qtZjftqzjn Hoping  #GigatownGis UFB helps close the growing chasm.",
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "truncated": false,
        "in_reply_to_status_id": 523526256084541440,
        "in_reply_to_status_id_str": "523526256084541440",
        "in_reply_to_user_id": 1277147870,
        "in_reply_to_user_id_str": "1277147870",
        "in_reply_to_screen_name": "lailaharre",
        "user": {
          "id": 2836134836,
          "id_str": "2836134836",
          "name": "TaiTech Trust",
          "screen_name": "TaiTechTrust",
          "location": "Gisborne, NZ",
          "profile_location": null,
          "description": "Tairāwhiti Technology Trust - closing the Digital Divide across Tairāwhiti",
          "url": "http://t.co/P8Q8bmJTkv",
          "entities": {
            "url": {
              "urls": [
                {
                  "url": "http://t.co/P8Q8bmJTkv",
                  "expanded_url": "http://taitech.co.nz",
                  "display_url": "taitech.co.nz",
                  "indices": [
                    0,
                    22
                  ]
                }
              ]
            },
            "description": {
              "urls": []
            }
          },
          "protected": false,
          "followers_count": 169,
          "friends_count": 526,
          "listed_count": 0,
          "created_at": "Wed Oct 01 04:25:11 +0000 2014",
          "favourites_count": 105,
          "utc_offset": null,
          "time_zone": null,
          "geo_enabled": false,
          "verified": false,
          "statuses_count": 1563,
          "lang": "en",
          "contributors_enabled": false,
          "is_translator": false,
          "is_translation_enabled": false,
          "profile_background_color": "022330",
          "profile_background_image_url": "http://abs.twimg.com/images/themes/theme15/bg.png",
          "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme15/bg.png",
          "profile_background_tile": false,
          "profile_image_url": "http://pbs.twimg.com/profile_images/523753172519514113/2hxhJXcl_normal.jpeg",
          "profile_image_url_https": "https://pbs.twimg.com/profile_images/523753172519514113/2hxhJXcl_normal.jpeg",
          "profile_banner_url": "https://pbs.twimg.com/profile_banners/2836134836/1412138691",
          "profile_link_color": "0084B4",
          "profile_sidebar_border_color": "A8C7F7",
          "profile_sidebar_fill_color": "C0DFEC",
          "profile_text_color": "333333",
          "profile_use_background_image": true,
          "default_profile": false,
          "default_profile_image": false,
          "following": null,
          "follow_request_sent": null,
          "notifications": null
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "retweet_count": 5,
        "favorite_count": 1,
        "entities": {
          "hashtags": [
            {
              "text": "DigitalDivide",
              "indices": [
                29,
                43
              ]
            },
            {
              "text": "GigatownGis",
              "indices": [
                91,
                103
              ]
            }
          ],
          "symbols": [],
          "urls": [
            {
              "url": "http://t.co/qtZjftqzjn",
              "expanded_url": "http://www.taitech.co.nz/myfiles/Tairawhiti_Digital_Divide_.pdf",
              "display_url": "taitech.co.nz/myfiles/Tairaw…",
              "indices": [
                60,
                82
              ]
            }
          ],
          "user_mentions": [
            {
              "screen_name": "lailaharre",
              "name": "Laila Harré ",
              "id": 1277147870,
              "id_str": "1277147870",
              "indices": [
                0,
                11
              ]
            }
          ]
        },
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "lang": "en"
      },
      "retweet_count": 5,
      "favorite_count": 0,
      "entities": {
        "hashtags": [
          {
            "text": "DigitalDivide",
            "indices": [
              47,
              61
            ]
          },
          {
            "text": "GigatownGis",
            "indices": [
              109,
              121
            ]
          }
        ],
        "symbols": [],
        "urls": [
          {
            "url": "http://t.co/qtZjftqzjn",
            "expanded_url": "http://www.taitech.co.nz/myfiles/Tairawhiti_Digital_Divide_.pdf",
            "display_url": "taitech.co.nz/myfiles/Tairaw…",
            "indices": [
              78,
              100
            ]
          }
        ],
        "user_mentions": [
          {
            "screen_name": "TaiTechTrust",
            "name": "TaiTech Trust",
            "id": 2836134836,
            "id_str": "2836134836",
            "indices": [
              3,
              16
            ]
          },
          {
            "screen_name": "lailaharre",
            "name": "Laila Harré ",
            "id": 1277147870,
            "id_str": "1277147870",
            "indices": [
              18,
              29
            ]
          }
        ]
      },
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    }
  ],
  "search_metadata": {
    "completed_in": 0.019,
    "max_id": 524055802009509900,
    "max_id_str": "524055802009509888",
    "next_results": "?max_id=523956667692511231&q=digitaldivide&count=5&include_entities=1",
    "query": "digitaldivide",
    "refresh_url": "?since_id=524055802009509888&q=digitaldivide&include_entities=1",
    "count": 5,
    "since_id": 0,
    "since_id_str": "0"
  }
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
